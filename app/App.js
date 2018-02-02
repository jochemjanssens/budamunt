import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './register/Login';
import Register from './register/Register';
import RegisterGebruiker from './register/RegisterGebruiker';
import RegisterKeuze from './register/RegisterKeuze';
import RegisterHandel from './register/RegisterHandel';
import RegisterOrganisatie from './register/RegisterOrganisatie';

export default class App extends React.Component {
  render() {
    return <Navigation />
  }
}

export const Navigation = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  RegisterGebruiker: { screen: RegisterGebruiker },
  RegisterKeuze: { screen: RegisterKeuze },
  RegisterHandel: { screen: RegisterHandel },
  RegisterOrganisatie: { screen: RegisterOrganisatie },
}, {
    // see next line
    headerMode: 'none',
});
