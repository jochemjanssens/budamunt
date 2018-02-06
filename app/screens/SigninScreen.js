import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';

import Navbar from './Navbar';

export default class SigninScreen extends React.Component {
  signIn = params => {
    AsyncStorage.getItem("myToken").then((token) => {
      AsyncStorage.getItem("user").then(user => {
        const body = new FormData();
        body.append(`volunteerId`, params._id);
        body.append(`userId`, JSON.parse(user)._id);

        const headers = new Headers({
          Authorization: `Bearer ${token}`
        });

        fetch('http://192.168.1.49:3000/api/applications', {
            method: 'POST',
            body,
            headers
          })
          .then(r => {
            const message = new FormData();
            message.append(`sendId`, params._id);
            message.append(`receiveId`, JSON.parse(user)._id);
            message.append(`content`, 'start');
            fetch('http://192.168.1.49:3000/api/messages', {
                method: 'POST',
                body: message,
                headers
              })
              .then(r => {
                this.props.navigation.navigate('VolunteerPersonalScreen');
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
        }).done();
    }).done();
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
