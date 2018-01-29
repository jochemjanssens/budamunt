import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

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
    console.log('value: ', value);

  const body = new FormData();
    body.append(`login`, value.email);
    body.append(`password`, value.password);
    body.append(`audience`, `tweets-frontend`);

    fetch('http://192.168.1.60:3000/api/auth', {
      method: 'POST',
      body: body
    })
    .then(r => {
      console.log(r._bodyText);
      token = JSON.parse(r._bodyText).token;
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
        <View>
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
