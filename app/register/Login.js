import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

import t from 'tcomb-form-native';

import LoggedIn from '../LoggedIn';


const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String
});

var options = {
  fields: {
    password: {
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
        this.setState({ login: true });
      }
    });
  }

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value);
    const body = new FormData();
      body.append(`login`, value.email);
      body.append(`password`, value.password);
      body.append(`audience`, `tweets-frontend`);
    fetch('http://192.168.0.233:3000/api/auth', {
      method: 'POST',
      body: body
    })
    .then(r => {
      console.log(r);
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
    const { navigate } = this.props.navigation;

    if(login === true){
      return <LoggedIn />
    }else{
      return (
        <View style={styles.container}>
          <Text>Login</Text>
          <Form
             type={User}
             ref={c => this._form = c}
             options={options}
           />
          <Button
            title="meld aan"
            onPress={this.handleSubmit}
          />

          <Button
            title='Nog geen account'
            onPress={() => navigate('Register')}
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
