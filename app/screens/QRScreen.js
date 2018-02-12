import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight } from 'react-native';
import QRCode from 'react-native-qrcode';

export default class QRScreen extends React.Component {

  state = {
    complete: null
  };

  async componentWillMount() {
    this.setState({'complete': false});
  }

  checkPayments = () => {
    AsyncStorage.getItem("myToken").then(token => {
      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });

      fetch('http://192.168.1.16:3000/api/transactions?isActive=true', {
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
          "receiveName": "${params.user.firstname} ${params.user.name}"
        }
      }
    `;

    if(complete === true){
      return (
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <TouchableHighlight
                onPress={() => this.props.navigation.goBack()}
                style={styles.backButton}
              >
                <Image
                  source={require('../assets/general/back.png')}
                  style={{
                    width: 15,
                    height: 23,
                  }}
                />
              </TouchableHighlight>
              <Text style={styles.maintitle}>ONTVANGEN</Text>
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
              }}
            />

            <View style={styles.textelement}>
              <Text style={styles.maintext}>SUCCES</Text>
              <Text style={styles.text}>De betaling is voltooid</Text>
            </View>

            <TouchableHighlight onPress={() => navigate('Home')}>
              <Text style={styles.button}>NAAR HOME</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }else{
      return (
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <Text style={styles.maintitle}>ONTVANGEN</Text>
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
              source={require('../assets/pay/scanTitle.png')}
              style={styles.title}
            />
            <QRCode
             value={data}
             size={220}
             bgColor='#5A60FB'
             style={styles.qrcode}
           />
          </View>
        </View>
      );
    }
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
  button: {
    color: 'white',
    backgroundColor: '#5A60FB',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 14,
    paddingHorizontal: 50,
    textAlign: 'center',
  },
  textelement: {
    paddingVertical: 100,
  },
  maintext: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  title: {
    width: 170,
    height: 40,
    marginBottom: 40,
  },
  qrcode: {
    marginBottom: 40,
  }
});

const handlePayment = (headers, transaction, userId) => {
  AsyncStorage.getItem("user").then(user => {
    const userId = JSON.parse(user)._id;
    AsyncStorage.getItem("myToken").then(token => {
          const headers = new Headers({
            Authorization: `Bearer ${token}`
          });
          AsyncStorage.getItem("muntenId").then(muntenId => {
            fetch(`http://192.168.1.16:3000/api/balances/${muntenId}`, {
                method: "DELETE",
                headers
            })
            .then(d => {
              AsyncStorage.getItem("munten").then(munten => {
                const newMunten = parseInt(munten) + parseInt(transaction.munten);
                const balance = new FormData();
                balance.append(`userId`, userId);
                balance.append(`munten`, newMunten);
                fetch(`http://192.168.1.16:3000/api/balances`, {
                  method: "POST",
                  body: balance,
                  headers
                })
                .then(r => {
                  fetch(`http://192.168.1.16:3000/api/transactions/${transaction._id}`, {
                      method: "DELETE",
                      headers
                  })
                  .then(d => {
                    const balance = new FormData();
                    balance.append(`payingId`, transaction.payingId);
                    balance.append(`receivingId`, transaction.receivingId);
                    balance.append(`munten`, transaction.munten);
                    fetch(`http://192.168.1.16:3000/api/balances`, {
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
