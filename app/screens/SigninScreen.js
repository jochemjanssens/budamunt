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

        fetch('http://192.168.1.4:3000/api/applications', {
            method: 'POST',
            body,
            headers
          })
          .then(r => {
            fetch(`http://192.168.1.4:3000/api/messages`, {headers})
            .then(r => {
              let match = false;
              const messages = JSON.parse(r._bodyText).messages;
              messages.forEach(message=>{
                if(message.receiveId === params.user || message.sendId === params.user){
                  if(message.receiveId === JSON.parse(user).email || message.sendId === JSON.parse(user).email){
                    match = message._id;
                  }
                }
              });

              const message = new FormData();
              if(match !== false){
                message.append(`sendId`, params.user);
                message.append(`receiveId`, JSON.parse(user).email);
                message.append(`content`, 'Bedankt voor je registraties. De verantwoordelijke zal contact met jou opnemen');
                message.append(`conversation`, match);
              }else{
                message.append(`sendId`, params.user);
                message.append(`receiveId`, JSON.parse(user).email);
                message.append(`content`, 'Bedankt voor je registraties. De verantwoordelijke zal contact met jou opnemen');
                message.append(`conversation`, 'first');
              }


              fetch('http://192.168.1.4:3000/api/messages', {
                method: 'POST',
                body: message,
                headers
              })
              .then(r => {
              })
              .catch(err => console.error(err));
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
