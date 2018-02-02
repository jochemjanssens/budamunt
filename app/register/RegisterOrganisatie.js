import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';

export default class RegisterOrganisatie extends React.Component {
  state = {
    progress: 1,
  };

  handleBack() {
    //Progress--;
  }

  render() {
    const { navigate } = this.props.navigation;
    const { progress } = this.state;

    if(progress === 1){
      return (
        <View style={styles.container}>
          <Text>Maak een account</Text>
          <Text>1/4</Text>

          <Button
            title="Terug"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      );
    }else if (progress === 2){
      return (
        <View style={styles.container}>
          <Text>Maak een account</Text>
          <Text>2/4</Text>



          <Button
            title="Terug"
            onPress={() => this.handleBack()}
          />
        </View>
      );
    }else if (progress === 3){
      return (
        <View style={styles.container}>
          <Text>Maak een account</Text>
          <Text>3/4</Text>



          <Button
            title="Terug"
            onPress={() => this.handleBack()}
          />
        </View>
      );
    }else{
      return (
        <View style={styles.container}>
          <Text>Maak een account</Text>
          <Text>4/4</Text>

          <Text>
            Bedankt voor je registratie
            Onze verantwoordelijke kijkt je regestratie na
            en dan kan je beginnen met vrijwilligerswerk aan te bieden.
          </Text>

          <Button
            title="Terug"
            onPress={() => this.handleBack()}
          />
        </View>
      );
    }
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
