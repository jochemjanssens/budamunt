import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';
import QRCode from 'react-native-qrcode';

export default class QRScreen extends React.Component {

  state = {
    complete: null
  };

  async componentWillMount() {
    this.setState({'complete': false});
  }

  checkPayments = () => {
    console.log("check");
    AsyncStorage.getItem("myToken").then(token => {
      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });

      fetch('http://192.168.1.40:3000/api/transactions', {
        method: 'GET',
        headers
      })
      .then(r => {
        AsyncStorage.getItem("user").then(user => {
          const userId = JSON.parse(user)._id;
          JSON.parse(r._bodyText).transactions.forEach( transaction => {
            if(userId === transaction.receivingId){
              handlePayment(headers, transaction, userId);
              this.setState({'complete': true});
              clearInterval(this.interval);
            }
          });
        });
      })
      .catch(err => console.error(err));
    });
  }

  interval = setInterval(this.checkPayments, 1000);

  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;

    const { complete } = this.state;

    const data =
    `
      {
        "type": "Budamunt",
        "data": {
          "munten": "${params.munten}",
          "receiveId": "${params.user._id}",
          "receiveName": "${params.user.firstname}"
        }
      }
    `;

    console.log("complete:");
    console.log(complete);

    if(complete === true){
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Scanned</Text>
          <Button
            title='Go home'
            onPress={() => navigate('Home')}
          />
        </View>
      );
    }else{
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
            fetch(`http://192.168.1.40:3000/api/balances/${muntenId}`, {
                method: "DELETE",
                headers
            })
            .then(d => {
              AsyncStorage.getItem("munten").then(munten => {
                const newMunten = parseInt(munten) + parseInt(transaction.munten);
                const balance = new FormData();
                balance.append(`userId`, userId);
                balance.append(`munten`, newMunten);
                fetch(`http://192.168.1.40:3000/api/balances`, {
                  method: "POST",
                  body: balance,
                  headers
                })
                .then(r => {
                  fetch(`http://192.168.1.40:3000/api/transactions/${transaction._id}`, {
                      method: "DELETE",
                      headers
                  })
                  .then(d => {
                    const balance = new FormData();
                    balance.append(`payingId`, transaction.payingId);
                    balance.append(`receivingId`, transaction.receivingId);
                    balance.append(`munten`, transaction.munten);
                    fetch(`http://192.168.1.40:3000/api/balances`, {
                      method: "POST",
                      body: balance,
                      headers
                    })
                    .then(d => {
                      console.log('Scan - succes');
                    })
                    .catch(err => console.error(err));
                  })
                  .catch(err => console.error(err));
                })
                .catch(err => console.error(err));
              })
            })
            .catch(err => console.error(err));
          })
        })
  });
}
