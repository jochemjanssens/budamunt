import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import PayScreen from './PayScreen';
import ReceiveScreen from './ReceiveScreen';
import QRScreen from './QRScreen';

class PaymentScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Button
          onPress={() => navigate('PayScreen')}
          title="Betaal"
        />
        <Button
          onPress={() => navigate('ReceiveScreen')}
          title="Ontvang"
        />
      </View>
    );
  }
}

export default class App extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Betalingen',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return <ListNavigation />;
  }
}

export const ListNavigation = StackNavigator({
  PaymentScreen: { screen: PaymentScreen },
  PayScreen: { screen: PayScreen },
  ReceiveScreen: { screen: ReceiveScreen },
  QRScreen: { screen: QRScreen },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
});
