import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';
import QRCode from 'react-native-qrcode';

export default class QRScreen extends React.Component {

  checkPayments() {
    AsyncStorage.getItem("myToken").then(token => {
      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });

      fetch('http://192.168.0.233:3000/api/transactions', {
        method: 'GET',
        headers
      })
      .then(r => {
        console.log("loaded");
        console.log(r._bodyText);
      })
      .catch(err => console.error(err));
    });
  }

  render() {
    const { params } = this.props.navigation.state;

    setInterval(this.checkPayments, 1000);


    const data =
    `
      {
        "type": "Budamunt",
        "data": {
          "munten": "${params.munten}",
          "receiveId": "${params.user}"
        }
      }
    `;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Scan deze code</Text>
        <QRCode
         value={data}
         size={220}
       />
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
  title: {
    paddingBottom: 30,
  },
});
