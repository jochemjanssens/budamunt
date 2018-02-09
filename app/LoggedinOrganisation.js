import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './organisatie/HomeScreen';
import MapScreen from './organisatie/MapScreen';
import MapdetailScreen from './organisatie/MapdetailScreen';

import SupportScreen from './organisatie/SupportScreen';

import WinkelScreen from './organisatie/WinkelScreen';
import WinkelEditScreen from './organisatie/WinkelEditScreen';

import CommunityScreen from './organisatie/CommunityScreen';
import CommunityDetailScreen from './organisatie/CommunityDetailScreen';
import MessagesScreen from './organisatie/MessagesScreen';
import MessageDetailScreen from './organisatie/MessageDetailScreen';

import PayScreen from './organisatie/PayScreen';
import ReceiveScreen from './organisatie/ReceiveScreen';
import TransactionsScreen from './organisatie/TransactionsScreen';
import QRScreen from './organisatie/QRScreen';
import AfterpayScreen from './organisatie/AfterpayScreen';
import ErrorScreen from './organisatie/ErrorScreen';

import VolunteerScreen from './organisatie/VolunteerScreen';
import VolunteerPersonalScreen from './organisatie/VolunteerPersonalScreen';
import VolunteerDetailScreen from './organisatie/VolunteerDetailScreen';
import ownVolunteerDetailScreen from './organisatie/ownVolunteerDetailScreen';
import NewVolunteer from './organisatie/NewVolunteer';
import EditVolunteer from './organisatie/EditVolunteer';
import SigninScreen from './organisatie/SigninScreen';

import EventScreen from './organisatie/EventScreen';
import EventDetailScreen from './organisatie/EventDetailScreen';
import ownEventDetailScreen from './organisatie/ownEventDetailScreen';
import NewEvent from './organisatie/NewEvent';
import EditEvent from './organisatie/EditEvent';

export default class LoggedinOrganisation extends React.Component {
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
