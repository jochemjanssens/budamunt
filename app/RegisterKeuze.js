import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

import LoggedIn from './LoggedIn';

export default class Login extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>WAT IS VOOR JOUW VAN TOEPASSING</Text>

        <Button
          title="Lokale Handelszaak"
          onPress={() => navigate('RegisterHandel')}
        />

        <Button
          title="Organisatie"
          onPress={() => navigate('RegisterOrganisatie')}
        />
        <Button
          title="terug"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
