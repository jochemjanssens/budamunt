import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

export default class RegisterGebruiker extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    //TODO:
    //Input velden
    //Registreer knop


    return (
      <View style={styles.container}>
        <Text>Maak een account</Text>


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
