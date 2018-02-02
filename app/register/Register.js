import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

export default class Login extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Maak een account</Text>

        <Button
          title="Gebruiker"
          onPress={() => navigate('RegisterGebruiker')}
        />
        <Text>IK HEB EEN WINKEL, VZW OF ORGANISATIE</Text>

        <Button
          title="Handelaar / Organisatie"
          onPress={() => navigate('RegisterKeuze')}
        />
        <Button
          title="Ik heb al een account"
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
