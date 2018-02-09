import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, Image, TouchableHighlight } from 'react-native';

import t from 'tcomb-form-native';

import LoggedIn from '../LoggedIn';
import LoggedInHandelaar from '../LoggedInHandelaar';
import LoggedinOrganisation from '../LoggedinOrganisation';

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

export default class Login extends React.Component {

  state = {
    login: false
  };

  async componentWillMount() {
    AsyncStorage.getItem("myToken").then((token) => {
      if(token){
        AsyncStorage.getItem("user").then((user) => {
          console.log(user);
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

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value);
    if(value){
      const body = new FormData();
      body.append(`login`, value.emailadres);
      body.append(`password`, value.wachtwoord);
      body.append(`audience`, `tweets-frontend`);
      fetch('http://192.168.0.233:3000/api/auth', {
        method: 'POST',
        body: body
      })
      .then(r => {
        console.log(r);
        token = JSON.parse(r._bodyText).token;
        AsyncStorage.setItem("myToken", token);
        AsyncStorage.getItem("user").then((user) => {
          if(JSON.parse(user).scope === 'HANDELAAR'){
            this.setState({ login: 'handelaar' });
          } else if (JSON.parse(user).scope === 'ORGANISATIE'){
            this.setState({ login: 'organisatie' });
          } else{
            this.setState({ login: true });
          }
        });
      })
      .catch(
        err => console.error(err)
      );
    }
  }

  render() {
    const { login } = this.state;
    const { navigate } = this.props.navigation;

    if(login === 'handelaar'){
      return <LoggedInHandelaar />
    }else if (login === 'organisatie'){
      return <LoggedinOrganisation />
    }else if (login === true){
      return <LoggedIn />
    }else{
      return (
        <View style={styles.container}>
          <Image
            source={require('../assets/login/logo.png')}
            style={styles.logo}
          />
          <Form
             type={User}
             ref={c => this._form = c}
             options={options}
             style={styles.form}
           />
          <TouchableHighlight onPress={this.handleSubmit}>
            <Text style={styles.button}>AANMELDEN</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => navigate('Register')}>
            <Text style={styles.smallButton}>REGISTREREN</Text>
          </TouchableHighlight>
          <Image
            source={require('../assets/login/login-detail.png')}
            style={styles.detail}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 50,
  },
  logo: {
    width: 193,
    height: 111,
    alignSelf: 'center'
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
  detail: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: -1,
  }
});


t.form.Form.stylesheet.controlLabel.normal.color = '#5A60FB';
t.form.Form.stylesheet.controlLabel.normal.fontWeight = 'normal';
t.form.Form.stylesheet.textbox.normal.borderRadius = 0;
t.form.Form.stylesheet.textbox.normal.borderColor = '#5A60FB';
