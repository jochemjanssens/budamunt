import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import VolunteerDetailScreen from './VolunteerDetailScreen';
import Navbar from './Navbar';


export default class VolunteerScreen extends React.Component {

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
        <Navbar navigate={this.props.navigation}/>
      </View>
    );
  }
}

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
