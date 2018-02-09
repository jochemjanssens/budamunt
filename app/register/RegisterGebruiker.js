import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, KeyboardAvoidingView, TouchableHighlight, Image } from 'react-native';
import { Constants } from 'expo';
import LoggedIn from '../LoggedIn';

import t from 'tcomb-form-native';
const Form = t.form.Form;
const Register = t.struct({
  voornaam: t.String,
  achternaam: t.String,
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
    login: false
  };

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value);
    if(value){
      const body = new FormData();
      body.append(`firstname`, value.voornaam);
      body.append(`name`, value.achternaam);
      body.append(`email`, value.emailadres);
      body.append(`password`, value.paswoord);
      body.append(`scope`, 'USER');

      fetch('http://192.168.0.233:3000/api/users', {
        method: 'POST',
        body: body
      })
      .then(u => {
        const login = new FormData();
        login.append(`login`, value.emailadres);
        login.append(`password`, value.paswoord);
        login.append(`audience`, `tweets-frontend`);

        fetch('http://192.168.0.233:3000/api/auth', {
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

          fetch('http://192.168.0.233:3000/api/balances', {
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

  render() {
    const { login } = this.state;
    const { navigate } = this.props.navigation;

    if(login === true){
      return <LoggedIn />
    }else{
      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >

          <View style={styles.progress}>
            <Image
              source={require('../assets/register/prevButton.png')}
              style={{
                width: 14,
                height: 22,
              }}
            />
            <Image
              source={require('../assets/register/progress.png')}
              style={{
                width: 78,
                height: 28,
              }}
            />
            <Image
              source={require('../assets/register/nextButton.png')}
              style={{
                width: 35,
                height: 35,
              }}
            />
          </View>
          <Text>Persoonlijke gegevens</Text>
          <Form
             type={Register}
             ref={c => this._form = c}
             options={options}
           />

          <TouchableHighlight onPress={this.handleSubmit}>
            <Text style={styles.button}>Registreren</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.button}>Ik heb al een account</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingVertical: Constants.statusBarHeight,
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
});
