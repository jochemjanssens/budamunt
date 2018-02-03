import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

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
      .then(r => {
        const login = new FormData();
        login.append(`login`, value.emailadres);
        login.append(`password`, value.paswoord);
        login.append(`audience`, `tweets-frontend`);
        fetch('http://192.168.0.233:3000/api/auth', {
          method: 'POST',
          body: body
        })
        .then(r => {
          token = JSON.parse(r._bodyText).token;
          AsyncStorage.setItem("myToken", token);
          this.setState({ login: true });
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
        <View style={styles.container}>
          <Text>Maak een account</Text>
          <Form
             type={Register}
             ref={c => this._form = c}
             options={options}
           />
          <Button
            title="Registreren"
            onPress={this.handleSubmit}
          />

          <Button
            title="Ik heb al een account"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
