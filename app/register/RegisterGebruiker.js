import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableHighlight, Image } from 'react-native';
import { Constants } from 'expo';
import LoggedIn from '../LoggedIn';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import t from 'tcomb-form-native';
const Form = t.form.Form;

const Register1 = t.struct({
  voornaam: t.String,
  achternaam: t.String
});

const Register2 = t.struct({
  emailadres: t.String,
  paswoord: t.String
});

var options = {
  fields: {
    paswoord: {
      password: true,
      secureTextEntry: true
    }
  }
};

export default class RegisterGebruiker extends React.Component {

  state = {
    login: false,
    data: null,
    progress: 1,
  };

  handleNext = () => {
    const value = this._form.getValue(); // use that ref to get the form value);
    if(value){
      this.state.data = {
        firstname: value.voornaam,
        name: value.achternaam
      }
      const newProgress = this.state.progress + 1;
      this.setState({progress: newProgress});
    }
  }

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value);
    if(value){
      const body = new FormData();
      body.append(`firstname`, this.state.data.firstname);
      body.append(`name`, this.state.data.name);
      body.append(`email`, value.emailadres);
      body.append(`password`, value.paswoord);
      body.append(`scope`, 'USER');
      fetch('http://172.20.66.6:3000/api/users', {
        method: 'POST',
        body: body
      })
      .then(u => {
        const login = new FormData();
        login.append(`login`, value.emailadres);
        login.append(`password`, value.paswoord);
        login.append(`audience`, `tweets-frontend`);

        fetch('http://172.20.66.6:3000/api/auth', {
          method: 'POST',
          body: login
        })
        .then(r => {

          token = JSON.parse(r._bodyText).token;
          AsyncStorage.setItem("myToken", token);
          const balance = new FormData();
          balance.append(`userId`, JSON.parse(u._bodyText)._id);
          balance.append(`munten`, "0");

          const headers = new Headers({
            Authorization: `Bearer ${token}`
          });

          fetch('http://172.20.66.6:3000/api/balances', {
            method: 'POST',
            body: balance,
            headers
          })
          .then(r => {
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
    }
  }

  handleBack = () => {
    const newProgress = this.state.progress - 1;
    this.setState({progress: newProgress});
  }

  render() {
    const { progress, login } = this.state;
    const { navigate } = this.props.navigation;

    if(login === true){
      return <LoggedIn />
    }else{
      if(progress === 1){
        return (
          <View
            style={styles.container}
          >
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
                source={require('../assets/register/progress.png')}
                style={{
                  width: 79,
                  height: 28,
                }}
              />
              <TouchableHighlight onPress={this.handleNext}>
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
               type={Register1}
               ref={c => this._form = c}
             />
             <View style={{height: 200}}></View>
          </View>
        );
      } else {
        return (
          <View  style={styles.container}>
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
                source={require('../assets/register/progress2.png')}
                style={{
                  width: 79,
                  height: 28,
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
            <Text style={styles.bigTitle}>ACCOUNT GEGEVENS</Text>
            <Form
               type={Register2}
               ref={c => this._form = c}
               options={options}
             />
             <View style={{height: 50}}></View>
             <KeyboardSpacer/>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  button: {
    color: 'white',
    backgroundColor: '#5A60FB',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 14,
    paddingHorizontal: 50,
    textAlign: 'center',
  },
  bigTitle: {
    color: '#5A60FB',
    fontWeight: '900',
  }
});
