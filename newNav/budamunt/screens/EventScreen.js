import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import EventDetailScreen from './EventDetailScreen';


class EventScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Button
          onPress={() => navigate('EventDetail', { user: 'Feest' })}
          title="Feest"
        />
        <Button
          onPress={() => navigate('EventDetail', { user: 'Nog meer feest' })}
          title="Nog meer feest"
        />
        <Button
          onPress={() => navigate('EventDetail', { user: 'AZ Feest' })}
          title="AZ Feest"
        />
      </View>
    );
  }
}

export default class App extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Evenementen',
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
  EventList: { screen: EventScreen },
  EventDetail: { screen: EventDetailScreen },
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
