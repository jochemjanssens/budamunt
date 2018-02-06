import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import Navbar from './Navbar';

export default class SigninScreen extends React.Component {
  signIn = params => {
    console.log('SIGNIN CODE');
    console.log(params);
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    this.signIn(params);

    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Terug"
          color="#841584"
        />
        <Text>VRIJWILLIGERS</Text>
        <Text>INSCHRIJVING VOLTOOID</Text>
        <Text>
          Bedankt voor je registratie.
          De verantwoordelijk zal zo snel mogelijk
          contact met je opnemen
        </Text>
        <Button
          title='Terug naar Home'
          onPress={() => navigate('Home')}
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
});
