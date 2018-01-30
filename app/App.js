import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

import t from 'tcomb-form-native';

import Login from './Login';


const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String
});

export default class App extends React.Component {
  state = {
    login: false
  };

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value

    const body = new FormData();
      body.append(`login`, value.email);
      body.append(`password`, value.password);
      body.append(`audience`, `tweets-frontend`);

    fetch('http://172.20.66.20:3000/api/auth', {
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
  }

  render() {
    const { login } = this.state;
    console.log(login);

    if(login === true){
      return <Login />
    }else{
      return (
        <View style={styles.container}>
          <Form
             type={User}
             ref={c => this._form = c}
           />
          <Button
            title="meld aan"
            onPress={this.handleSubmit}
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
