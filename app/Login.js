import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TabNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import PaymentScreen from './screens/PaymentScreen';
import VolunteerScreen from './screens/VolunteerScreen';
import EventScreen from './screens/EventScreen';

export default class Login extends React.Component {
  render() {
    return <Navigation />
  }
}

export const Navigation = TabNavigator({
  Home: { screen: HomeScreen },
  Kaart: { screen: MapScreen },
  Betalen: { screen: PaymentScreen },
  Vrijwilligerswerk: { screen: VolunteerScreen },
  Evenementen: { screen: EventScreen }
},{
  tabBarPosition: 'bottom',
}

);
