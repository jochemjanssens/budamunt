import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './handelaar/HomeScreen';
import MapScreen from './handelaar/MapScreen';
import MapdetailScreen from './handelaar/MapdetailScreen';

import SupportScreen from './handelaar/SupportScreen';

import WinkelScreen from './handelaar/WinkelScreen';
import WinkelEditScreen from './handelaar/WinkelEditScreen';

import CommunityScreen from './handelaar/CommunityScreen';
import CommunityDetailScreen from './handelaar/CommunityDetailScreen';
import MessagesScreen from './handelaar/MessagesScreen';
import MessageDetailScreen from './handelaar/MessageDetailScreen';

import PayScreen from './handelaar/PayScreen';
import ReceiveScreen from './handelaar/ReceiveScreen';
import TransactionsScreen from './handelaar/TransactionsScreen';
import QRScreen from './handelaar/QRScreen';
import AfterpayScreen from './handelaar/AfterpayScreen';
import ErrorScreen from './handelaar/ErrorScreen';

import VolunteerScreen from './handelaar/VolunteerScreen';
import VolunteerPersonalScreen from './handelaar/VolunteerPersonalScreen';
import VolunteerDetailScreen from './handelaar/VolunteerDetailScreen';
import ownVolunteerDetailScreen from './handelaar/ownVolunteerDetailScreen';
import NewVolunteer from './handelaar/NewVolunteer';
import EditVolunteer from './handelaar/EditVolunteer';
import SigninScreen from './handelaar/SigninScreen';

import EventScreen from './handelaar/EventScreen';
import EventDetailScreen from './handelaar/EventDetailScreen';
import ownEventDetailScreen from './handelaar/ownEventDetailScreen';
import NewEvent from './handelaar/NewEvent';
import EditEvent from './handelaar/EditEvent';

export default class LoggedInHandelaar extends React.Component {
  render() {
    return <Navigation />
  }
}

export const Navigation = StackNavigator({
  Home: { screen: HomeScreen },
  Kaart: { screen: MapScreen },
  MapDetail: { screen: MapdetailScreen },

  Support: { screen: SupportScreen },

  Winkel: { screen: WinkelScreen },
  EditWinkel: { screen: WinkelEditScreen },

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
  Inschrijven: { screen: SigninScreen },

  Community: { screen: CommunityScreen },
  CommunityDetail: { screen: CommunityDetailScreen },
  Messages: { screen: MessagesScreen },
  MessageDetail: { screen: MessageDetailScreen },

  Evenementen: { screen: EventScreen },
  EventDetail: { screen: EventDetailScreen },
  ownEventDetail: { screen: ownEventDetailScreen },
  newEvent: { screen: NewEvent },
  EditEvent: { screen: EditEvent },
}, {
    // see next line
    headerMode: 'none',
});
