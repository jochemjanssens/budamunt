import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Onboarding from './register/Onboarding';

import Login from './register/Login';
import Register from './register/Register';
import RegisterGebruiker from './register/RegisterGebruiker';
import RegisterKeuze from './register/RegisterKeuze';
import RegisterHandel from './register/RegisterHandel';
import RegisterOrganisatie from './register/RegisterOrganisatie';

import LoggedIn from './LoggedIn';
import LoggedInHandelaar from './LoggedInHandelaar';
import LoggedinOrganisation from './LoggedinOrganisation';


export default class App extends React.Component {
  render() {
    return <Navigation />
  }
}

export const Navigation = StackNavigator({
  Onboarding: { screen: Onboarding },
  Login: { screen: Login },
  Register: { screen: Register },
  RegisterGebruiker: { screen: RegisterGebruiker },
  RegisterKeuze: { screen: RegisterKeuze },
  RegisterHandel: { screen: RegisterHandel },
  RegisterOrganisatie: { screen: RegisterOrganisatie },
  LoggedIn: { screen: LoggedIn },
  LoggedInHandelaar: { screen: LoggedInHandelaar },
  LoggedinOrganisation: { screen: LoggedinOrganisation },
}, {
    // see next line
    headerMode: 'none',
});
