import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import CommunityScreen from './screens/CommunityScreen';
import CommunityDetailScreen from './screens/CommunityDetailScreen';

import PayScreen from './screens/PayScreen';
import ReceiveScreen from './screens/ReceiveScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import QRScreen from './screens/QRScreen';
import AfterpayScreen from './screens/AfterpayScreen';
import ErrorScreen from './screens/ErrorScreen';

import VolunteerScreen from './screens/VolunteerScreen';
import VolunteerPersonalScreen from './screens/VolunteerPersonalScreen';
import VolunteerDetailScreen from './screens/VolunteerDetailScreen';
import ownVolunteerDetailScreen from './screens/ownVolunteerDetailScreen';
import NewVolunteer from './screens/NewVolunteer';
import EditVolunteer from './screens/EditVolunteer';

import EventScreen from './screens/EventScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import ownEventDetailScreen from './screens/ownEventDetailScreen';
import NewEvent from './screens/NewEvent';
import EditEvent from './screens/EditEvent';

export default class LoggedIn extends React.Component {
  render() {
    return <Navigation />
  }
}

export const Navigation = StackNavigator({
  Home: { screen: HomeScreen },
  Kaart: { screen: MapScreen },

  Pay: { screen: PayScreen },
  Receive: { screen: ReceiveScreen },
  Transactions: { screen: TransactionsScreen },
  QRScreen: { screen: QRScreen },
  AfterpayScreen: { screen: AfterpayScreen },
  ErrorScreen: { screen: ErrorScreen },

  Vrijwilligerswerk: { screen: VolunteerScreen },
  VolunteerPersonalScreen: { screen: VolunteerPersonalScreen },
  VolunteerDetail: { screen: VolunteerDetailScreen },
  EditVolunteer: { screen: EditVolunteer },
  ownVolunteerDetail: { screen: ownVolunteerDetailScreen },
  newVolunteer: { screen: NewVolunteer },

  Community: { screen: CommunityScreen },
  CommunityDetail: { screen: CommunityDetailScreen },

  Evenementen: { screen: EventScreen },
  EventDetail: { screen: EventDetailScreen },
  ownEventDetail: { screen: ownEventDetailScreen },
  newEvent: { screen: NewEvent },
  EditEvent: { screen: EditEvent },
}, {
    // see next line
    headerMode: 'none',
});
