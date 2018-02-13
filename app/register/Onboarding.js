import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, Image, TouchableHighlight } from 'react-native';

import t from 'tcomb-form-native';
const Form = t.form.Form;

const User = t.struct({
  emailadres: t.String,
  wachtwoord: t.String
});

var options = {
  fields: {
    wachtwoord: {
      password: true,
      secureTextEntry: true
    }
  }
};

export default class Onboarding extends React.Component {

  state = {
    login: false,
    page: 1,
  };

  async componentWillMount() {
    AsyncStorage.getItem("myToken").then((token) => {
      if(token){
        AsyncStorage.getItem("user").then((user) => {
          if(JSON.parse(user).scope === 'HANDELAAR'){
            this.setState({ login: 'handelaar' });
          } else if (JSON.parse(user).scope === 'ORGANISATIE'){
            this.setState({ login: 'organisatie' });
          } else{
            this.setState({ login: true });
          }
        });
      }
    });
  }

  handleNext = () => {
    const newProgress = this.state.page + 1;
    this.setState({page: newProgress});
  }

  skipOnboarding = () => {
    this.setState({page: 5});
  }

  render() {
    const { login, page } = this.state;
    const { navigate } = this.props.navigation;

    if(login === 'handelaar'){
      return (
        navigate('LoggedInHandelaar')
      );
    }else if (login === 'organisatie'){
      return (
        navigate('LoggedinOrganisation')
      );
    }else if (login === true){
      return (
        navigate('LoggedIn')
      );
    }else{
      if(page === 1){
        return (
          <View style={styles.container}>
            <Image
              source={require('../assets/login/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.text}>
              De gemeenschapsmunt van
              die mensen dichter bij
              elkaar brengt
            </Text>
            <Image
              source={require('../assets/onboarding/onboarding1.png')}
              style={{
                width: 182,
                height: 182,
              }}
            />
            <Image
              source={require('../assets/onboarding/dots1.png')}
              style={{
                width: 35,
                height: 6,
              }}
            />
            <TouchableHighlight onPress={this.handleNext}>
              <Text style={styles.button}>VOLGENDE</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.skipOnboarding}>
              <Text style={styles.smallButton}>OVERSLAAN</Text>
            </TouchableHighlight>
            <Image
              source={require('../assets/onboarding/bottomItem.png')}
              style={styles.bottomItem}
            />
          </View>
        );
      } else if(page === 2){
        return (
          <View style={styles.container}>
            <Image
              source={require('../assets/onboarding/onboardingtitle2.png')}
              style={{
                width: 241,
                height: 105,
              }}
            />
            <Text style={styles.text}>
              Verzamel Carpels en krijg voordelen in winkels en cafés
            </Text>
            <Image
              source={require('../assets/onboarding/onboarding2.png')}
              style={{
                width: 141,
                height: 178,
              }}
            />
            <Image
              source={require('../assets/onboarding/dots2.png')}
              style={{
                width: 35,
                height: 6,
              }}
            />
            <TouchableHighlight onPress={this.handleNext}>
              <Text style={styles.button}>VOLGENDE</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.skipOnboarding}>
              <Text style={styles.smallButton}>OVERSLAAN</Text>
            </TouchableHighlight>
            <Image
              source={require('../assets/onboarding/bottomItem.png')}
              style={styles.bottomItem}
            />
          </View>
        );
      } else if(page === 3){
        return (
          <View style={styles.container}>
            <Image
              source={require('../assets/onboarding/onboardingtitle3.png')}
              style={{
                width: 306,
                height: 105,
              }}
            />
            <Text style={styles.text}>
              Doe vrijwilligerswerk en wordt beloond met carpels
            </Text>
            <Image
              source={require('../assets/onboarding/onboarding3.png')}
              style={{
                width: 165,
                height: 134,
              }}
            />
            <Image
              source={require('../assets/onboarding/dots3.png')}
              style={{
                width: 35,
                height: 6,
              }}
            />
            <TouchableHighlight onPress={this.handleNext}>
              <Text style={styles.button}>VOLGENDE</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.skipOnboarding}>
              <Text style={styles.smallButton}>OVERSLAAN</Text>
            </TouchableHighlight>
            <Image
              source={require('../assets/onboarding/bottomItem.png')}
              style={styles.bottomItem}
            />
          </View>
        );
      } else if(page === 4){
        return (
          <View style={styles.container}>
            <Image
              source={require('../assets/onboarding/onboardingtitle4.png')}
              style={{
                width: 207,
                height: 105,
              }}
            />
            <Text style={styles.text}>
              Wordt vrijwilliger en draag een steentje bij aan de community in buda !
            </Text>
            <Image
              source={require('../assets/onboarding/onboarding4.png')}
              style={{
                width: 238,
                height: 132,
              }}
            />
            <Image
              source={require('../assets/onboarding/dots4.png')}
              style={{
                width: 35,
                height: 6,
              }}
            />
            <TouchableHighlight onPress={this.handleNext}>
              <Text style={styles.button}>REGISTREER</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.skipOnboarding}>
              <Text style={styles.smallButton}>OVERSLAAN</Text>
            </TouchableHighlight>
            <Image
              source={require('../assets/onboarding/bottomItem.png')}
              style={styles.bottomItem}
            />
          </View>
        );
      } else {
        return (
          navigate('Login')
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 50,
  },
  logo: {
    width: 193,
    height: 111,
    alignSelf: 'center'
  },
  text: {
    fontWeight: '700',
    color: '#5A60FB',
    fontSize: 16,
    textAlign: 'center',
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
  smallButton: {
    textAlign: 'center',
  },
  bottomItem: {
    width: 67,
    height: 66,
    position: 'absolute',
    bottom: 0,
    right: 0,
  }
});
