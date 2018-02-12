import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight } from 'react-native';

import Navbar from './Navbar';

export default class TransactionsScreen extends React.Component {
  state = {
    token: null,
    user: null,
    transactions: null
  };

  async componentWillMount() {
    AsyncStorage.getItem("myToken").then((token) => {
      this.setState({'token': token});

      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });

      fetch(`http://192.168.1.16:3000/api/transactions?isActive=false`, {headers})
        .then(r => {
          this.setState({'transactions': JSON.parse(r._bodyText).transactions});
        })
        .catch(err => console.error(err));
    });

    AsyncStorage.getItem("user").then(user => {
      this.setState({'user': JSON.parse(user)});
    });
  }


  render() {
    const { transactions, user } = this.state;
    const { navigate } = this.props.navigation;

    if(transactions){
      if(transactions.length !== 0){
        const ownTransactions = [];
        transactions.forEach(transaction=>{
          var date = new Date(Date.parse(transaction.created));
          var formattedTime = date.toLocaleDateString();

          if(transaction.payingId === user._id){
            ownTransactions.push({
              _id: transaction._id,
              role: 'pay',
              munten: transaction.munten,
              person: transaction.receivingName,
              time: formattedTime,
            });
          }
          if(transaction.receivingId === user._id){
            ownTransactions.push({
              _id: transaction._id,
              role: 'receive',
              munten: transaction.munten,
              person: transaction.payingName,
              time: formattedTime,
            });
          }
        });

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
                <Text style={styles.maintitle}>TRANSACTIES</Text>
              </View>
              <Image
                source={require('../assets/home/bigBorder.png')}
                style={{
                  width: '100%',
                  height: 12,
                }}
              />
            </View>
            {
              ownTransactions.map(
                transaction => (
                  <View key={transaction._id} style={styles.transaction}>
                    <View style={styles.start}>
                      <Text style={styles.person}>{transaction.person.toUpperCase()}</Text>
                      <Text>{transaction.time}</Text>
                    </View>
                    <Text style={styles.carpels}>{(transaction.role === 'receive') ? '+' : '-'} {transaction.munten} CARPELS</Text>
                    <Image
                      source={require('../assets/home/borderMid.png')}
                      style={{
                        width: 317,
                        height: 15,
                        marginTop: 10,
                      }}
                    />
                  </View>
                )
              )
            }
            <Navbar navigate={this.props.navigation}/>
          </View>
        );
      }else{
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
                <Text style={styles.maintitle}>TRANSACTIES</Text>
              </View>
              <Image
                source={require('../assets/home/bigBorder.png')}
                style={{
                  width: '100%',
                  height: 12,
                }}
              />
            </View>
            <Text style={styles.notransactions}>Er zijn nog geen transacties</Text>
            <Navbar navigate={this.props.navigation}/>

          </View>
        );
      }
    }else {
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
              <Text style={styles.maintitle}>TRANSACTIES</Text>
            </View>
            <Image
              source={require('../assets/home/bigBorder.png')}
              style={{
                width: '100%',
                height: 12,
              }}
            />
          </View>
          <Text style={styles.notransactions}>Er zijn nog geen transacties</Text>
          <Navbar navigate={this.props.navigation}/>

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
  person:{
    fontWeight: '700',
    fontSize: 15,
  },
  start:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  carpels: {
    fontWeight: '700',
    fontSize: 20,
    color: "#5A60FB",
  },
  transaction: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notransactions: {
    textAlign: 'center',
    paddingTop: 200,
    fontSize: 20,
    color: "#5A60FB",
  }
});
