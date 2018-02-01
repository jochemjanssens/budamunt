import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import PaymentScreen from './screens/PaymentScreen';
import CommunityScreen from './screens/CommunityScreen';

import VolunteerScreen from './screens/VolunteerScreen';
import VolunteerDetailScreen from './screens/VolunteerDetailScreen';
import ownVolunteerDetailScreen from './screens/ownVolunteerDetailScreen';
import NewVolunteer from './screens/NewVolunteer';

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
  Betalen: { screen: PaymentScreen },
  Vrijwilligerswerk: { screen: VolunteerScreen },
  VolunteerDetail: { screen: VolunteerDetailScreen },
  ownVolunteerDetail: { screen: ownVolunteerDetailScreen },
  newVolunteer: { screen: NewVolunteer },
  Community: { screen: CommunityScreen },
  Evenementen: { screen: EventScreen },
  EventDetail: { screen: EventDetailScreen },
  ownEventDetail: { screen: ownEventDetailScreen },
  newEvent: { screen: NewEvent },
  EditEvent: { screen: EditEvent },
}, {
    // see next line
    headerMode: 'none',
});
