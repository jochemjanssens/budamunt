import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight } from 'react-native';

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

        fetch('http://172.20.66.6:3000/api/applications', {
            method: 'POST',
            body,
            headers
          })
          .then(r => {
            fetch(`http://172.20.66.6:3000/api/messages`, {headers})
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


              fetch('http://172.20.66.6:3000/api/messages', {
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
        <View>
          <View style={styles.header}>
            <TouchableHighlight
              onPress={() => this.props.navigation.goBack()}
              style={styles.backButton}
              underlayColor="white"
            >
              <Image
                source={require('../assets/general/back.png')}
                style={{
                  width: 15,
                  height: 23,
                }}
              />
            </TouchableHighlight>
            <Text style={styles.maintitle}>VRIJWILLIGERS</Text>
          </View>
          <Image
            source={require('../assets/home/bigBorder.png')}
            style={{
              width: '100%',
              height: 12,
            }}
          />
        </View>
        <View style={styles.content}>
          <Image
            source={require('../assets/pay/succes.png')}
            style={{
              width: 143,
              height: 108,
              alignSelf: 'center',
              marginVertical: 20,
            }}
          />
          <Image
            source={require('../assets/register/aanvraagTitle.png')}
            style={{
              width: 228,
              height: 43,
              marginVertical: 20,
              alignSelf: 'center',
            }}
          />
          <Text style={styles.text}>
            Bedankt voor je registratie.
            De verantwoordelijk zal zo snel mogelijk
            contact met je opnemen
          </Text>
          <TouchableHighlight underlayColor="white" onPress={() => navigate('Home')}>
            <Text style={styles.button}>TERUG NAAR HOME</Text>
          </TouchableHighlight>
        </View>

        <Navbar navigate={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: "100%",
  },
  maintitle: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 20,
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 52,
    left: 30,
  },
  text: {
    textAlign: 'center',
  },
  button: {
    color: 'white',
    backgroundColor: '#5A60FB',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginTop: 50,
    textAlign: 'center',
    alignSelf: 'center',
  },
  content: {
    padding: 20,
  }
});
