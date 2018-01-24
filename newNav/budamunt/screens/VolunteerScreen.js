import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import VolunteerDetailScreen from './VolunteerDetailScreen';


class VolunteerScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Button
          onPress={() => navigate('VolunteerDetail', { user: 'H. Hart' })}
          title="H. Hart"
        />
        <Button
          onPress={() => navigate('VolunteerDetail', { user: 'Budascoop' })}
          title="Budascoop"
        />
        <Button
          onPress={() => navigate('VolunteerDetail', { user: 'AZ Groeninghe' })}
          title="AZ Groeninghe"
        />
      </View>
    );
  }
}

export default class App extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Vrijwilligerswerk',
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
  VolunteerList: { screen: VolunteerScreen },
  VolunteerDetail: { screen: VolunteerDetailScreen },
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
