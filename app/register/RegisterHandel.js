import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, Picker, TouchableHighlight, Image } from 'react-native';

import { Constants, Location, Permissions } from 'expo';

import LoggedIn from '../LoggedInHandelaar';

import t from 'tcomb-form-native';
const Form = t.form.Form;
const FirstFrom = t.struct({
  naam: t.String,
});

const SecondFrom = t.struct({
  straat: t.String,
});

const ThirdFrom = t.struct({
  voornaam: t.String,
  naam: t.String,
});

const FourthFrom = t.struct({
  emailadres: t.String,
  paswoord: t.String,
});

var options = {
  fields: {
    paswoord: {
      password: true,
      secureTextEntry: true
    }
  }
};

export default class RegisterHandel extends React.Component {
  state = {
    categorie: "cafe",
    data: null,
    progress: 1,
    login:  false,
    location: null
  };

  handleNextOne = () => {
    const value = this._form.getValue(); // use that ref to get the form value);
    if(value){
      this.state.data = {
        name: value.naam,
        categorie: this.state.categorie
      }
      const newProgress = this.state.progress + 1;
      this.setState({progress: newProgress});
    }
  }

  handleNextTwo = () => {
    const value = this._form.getValue(); // use that ref to get the form value);
    if(value){
      this.state.data = {
        name: this.state.data.name,
        categorie: this.state.data.categorie,
        straat: value.straat,
        stad: 'Kortrijk'
      }
      const adres = `${value.straat}, Kortrijk;`
      this._getLocationAsync(adres);
      const newProgress = this.state.progress + 1;
      this.setState({progress: newProgress});
    }
  }

  _getLocationAsync = async (adress) => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       errorMessage: 'Permission to access location was denied',
     });
   }

   let location = await Location.geocodeAsync(adress);
   this.setState({ location });
 };


  handleNextThree = () => {
    const value = this._form.getValue(); // use that ref to get the form value);
    if(value){
      this.state.data = {
        name: this.state.data.name,
        categorie: this.state.data.categorie,
        straat: this.state.data.straat,
        stad: this.state.data.stad,
        voornaam: value.voornaam,
        naam: value.naam
      }
      const newProgress = this.state.progress + 1;
      this.setState({progress: newProgress});
    }
  }

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value);
    if(value){
      const body = new FormData();

      body.append(`firstname`, this.state.data.voornaam);
      body.append(`name`, this.state.data.naam);
      body.append(`email`, value.emailadres);
      body.append(`password`, value.paswoord);
      body.append(`scope`, 'HANDELAAR');

      fetch('http://192.168.1.16:3000/api/users', {
        method: 'POST',
        body: body
      })
      .then(u => {
        const login = new FormData();
        login.append(`login`, value.emailadres);
        login.append(`password`, value.paswoord);
        login.append(`audience`, `tweets-frontend`);

        fetch('http://192.168.1.16:3000/api/auth', {
          method: 'POST',
          body: login
        })
        .then(r => {
          token = JSON.parse(r._bodyText).token;
          AsyncStorage.setItem("myToken", token);

          const headers = new Headers({
            Authorization: `Bearer ${token}`
          });

          const shopData = new FormData();
          shopData.append(`userId`, JSON.parse(u._bodyText)._id);
          shopData.append(`store`, this.state.data.name);
          shopData.append(`type`, this.state.data.categorie);
          shopData.append(`street`, this.state.data.straat);
          shopData.append(`city`, this.state.data.stad);
          shopData.append(`location`, JSON.stringify(this.state.location));

          console.log(shopData);

          fetch('http://192.168.1.16:3000/api/stores', {
            method: 'POST',
            body: shopData,
            headers
          })
          .then(r => {
            console.log(r);
            const balance = new FormData();
            balance.append(`userId`, JSON.parse(u._bodyText)._id);
            balance.append(`munten`, "0");
            fetch('http://192.168.1.16:3000/api/balances', {
              method: 'POST',
              body: balance,
              headers
            })
            .then(r => {
              console.log('complete');
              this.setState({ login: true });
            })
            .catch(
              err => console.error(err)
            );
          })
          .catch(
            err => console.error(err)
          );
        })
        .catch(
          err => console.error(err)
        );
      })
      .catch(
        err => console.error(err)
      );
    }
  }

  handleBack = () => {
    const newProgress = this.state.progress - 1;
    this.setState({progress: newProgress});
  }

  render() {
    const { navigate } = this.props.navigation;
    const { progress, login } = this.state;

    if(login === true){
      return <LoggedIn />
    }else{
      if(progress === 1){
        return (
          <View style={styles.container}>
            <Image
              source={require('../assets/register/accountTitle.png')}
              style={styles.title}
            />
            <View style={styles.progress}>
              <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('../assets/register/prevButton.png')}
                  style={{
                    width: 14,
                    height: 22,
                  }}
                />
              </TouchableHighlight>
              <Image
                source={require('../assets/register/progress14.png')}
                style={{
                  width: 158,
                  height: 25,
                }}
              />
              <TouchableHighlight onPress={this.handleNextOne}>
                <Image
                  source={require('../assets/register/nextButton.png')}
                  style={{
                    width: 35,
                    height: 35,
                  }}
                />
              </TouchableHighlight>
            </View>
            <Text style={styles.bigTitle}>HANDELSZAAK GEGEVENS</Text>

            <Text style={styles.text}>Categorie handelszaak</Text>
            <View style={styles.pickerparent}>
              <Picker
                selectedValue={this.state.categorie}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.setState({categorie: itemValue})}>
                <Picker.Item label="Café" value="cafe" />
                <Picker.Item label="Restaurant" value="restaurant" />
                <Picker.Item label="Winkel" value="winkel" />
                <Picker.Item label="Overige" value="overige" />
              </Picker>
            </View>

            <Form
               type={FirstFrom}
               ref={c => this._form = c}
             />
             <View style={{height: 150}}></View>
          </View>
        );
      } else if (progress === 2){
        return (
          <View style={styles.container}>
            <Image
              source={require('../assets/register/accountTitle.png')}
              style={styles.title}
            />
            <View style={styles.progress}>
              <TouchableHighlight onPress={this.handleBack}>
                <Image
                  source={require('../assets/register/prevButton.png')}
                  style={{
                    width: 14,
                    height: 22,
                  }}
                />
              </TouchableHighlight>
              <Image
                source={require('../assets/register/progress24.png')}
                style={{
                  width: 158,
                  height: 25,
                }}
              />
              <TouchableHighlight onPress={this.handleNextTwo}>
                <Image
                  source={require('../assets/register/nextButton.png')}
                  style={{
                    width: 35,
                    height: 35,
                  }}
                />
              </TouchableHighlight>
            </View>
            <Text style={styles.bigTitle}>HANDELSZAAK GEGEVENS</Text>

            <Form
               type={SecondFrom}
               ref={c => this._form = c}
             />
             <Text style={styles.twocity}>Kortrijk</Text>
             <View style={{height: 150}}></View>
          </View>
        );
      } else if (progress === 3){
        return (
          <View style={styles.container}>
            <Image
              source={require('../assets/register/accountTitle.png')}
              style={styles.title}
            />
            <View style={styles.progress}>
              <TouchableHighlight onPress={this.handleBack}>
                <Image
                  source={require('../assets/register/prevButton.png')}
                  style={{
                    width: 14,
                    height: 22,
                  }}
                />
              </TouchableHighlight>
              <Image
                source={require('../assets/register/progress34.png')}
                style={{
                  width: 158,
                  height: 25,
                }}
              />
              <TouchableHighlight onPress={this.handleNextThree}>
                <Image
                  source={require('../assets/register/nextButton.png')}
                  style={{
                    width: 35,
                    height: 35,
                  }}
                />
              </TouchableHighlight>
            </View>
            <Text style={styles.bigTitle}>PERSOONLIJKE GEGEVENS</Text>
            <Form
               type={ThirdFrom}
               ref={c => this._form = c}
             />
             <View style={{height: 150}}></View>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <Image
              source={require('../assets/register/accountTitle.png')}
              style={styles.title}
            />
            <View style={styles.progress}>
              <TouchableHighlight onPress={this.handleBack}>
                <Image
                  source={require('../assets/register/prevButton.png')}
                  style={{
                    width: 14,
                    height: 22,
                  }}
                />
              </TouchableHighlight>
              <Image
                source={require('../assets/register/progress44.png')}
                style={{
                  width: 158,
                  height: 25,
                }}
              />
              <TouchableHighlight onPress={this.handleSubmit}>
                <Image
                  source={require('../assets/register/nextButton.png')}
                  style={{
                    width: 35,
                    height: 35,
                  }}
                />
              </TouchableHighlight>
            </View>
            <Text style={styles.bigTitle}>PERSOONLIJKE GEGEVENS</Text>
            <Form
               type={FourthFrom}
               ref={c => this._form = c}
               options={options}
             />
             <View style={{height: 150}}></View>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50,
  },
  title:{
    width: 166,
    height: 44,
    alignSelf: 'center'
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  picker: {
    color: '#5A60FB',
  },
  pickerparent: {
    borderColor: '#5A60FB',
    borderWidth: 1,
    marginBottom: 20,
  },
  bigTitle: {
    color: '#5A60FB',
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 20,
  },
  text: {
    color: '#5A60FB',
    fontSize: 16,
    paddingVertical: 10,
  },
  twocity: {
    borderColor: '#5A60FB',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
  },
});
