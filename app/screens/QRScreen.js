import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';
import QRCode from 'react-native-qrcode';

export default class QRScreen extends React.Component {

  checkPayments() {
    AsyncStorage.getItem("myToken").then(token => {
      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });

      fetch('http://192.168.0.233:3000/api/opentransactions', {
        method: 'GET',
        headers
      })
      .then(r => {
        AsyncStorage.getItem("user").then(user => {
          const userId = JSON.parse(user)._id;
          JSON.parse(r._bodyText).opentransactions.forEach( transaction => {
            if(userId === transaction.receivingId){
              const status = handlePayment(headers, transaction, userId);
              if(status === 'succes'){
                this.props.navigation.navigate("AfterpayScreen");
              }
            }
          });
        });
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
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Terug"
          color="#841584"
        />

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

const handlePayment = (headers, transaction, userId) => {
  AsyncStorage.getItem("user").then(user => {
    const userId = JSON.parse(user)._id;
    AsyncStorage.getItem("myToken").then(token => {
          const headers = new Headers({
            Authorization: `Bearer ${token}`
          });
          AsyncStorage.getItem("muntenId").then(muntenId => {
            fetch(`http://192.168.0.233:3000/api/balances/${muntenId}`, {
                method: "DELETE",
                headers
            })
            .then(d => {
              AsyncStorage.getItem("munten").then(munten => {
                const newMunten = parseInt(munten) + parseInt(transaction.munten);
                const balance = new FormData();
                balance.append(`userId`, userId);
                balance.append(`munten`, newMunten);
                fetch(`http://192.168.0.233:3000/api/balances`, {
                  method: "POST",
                  body: balance,
                  headers
                })
                .then(r => {
                  fetch(`http://192.168.0.233:3000/api/opentransactions/${transaction._id}`, {
                      method: "DELETE",
                      headers
                  })
                  .then(d => {
                    const balance = new FormData();
                    balance.append(`payingId`, transaction.payingId);
                    balance.append(`receivingId`, transaction.receivingId);
                    balance.append(`munten`, transaction.munten);
                    fetch(`http://192.168.0.233:3000/api/balances`, {
                      method: "POST",
                      body: balance,
                      headers
                    })
                    .then(d => {
                      return 'succes';
                    })
                  })
                })
              })
            })
          })
        })
  });
}
