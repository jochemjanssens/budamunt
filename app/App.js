import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './Login';
import Register from './Register';
import RegisterGebruiker from './RegisterGebruiker';
import RegisterKeuze from './RegisterKeuze';
import RegisterHandel from './RegisterHandel';
import RegisterOrganisatie from './RegisterOrganisatie';

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
