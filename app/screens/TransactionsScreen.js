import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';

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

      fetch(`http://192.168.1.45:3000/api/transactions?isActive=false`, {headers})
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
      const ownTransactions = [];
      transactions.forEach(transaction=>{
        if(transaction.payingId === user._id){
          ownTransactions.push({
            _id: transaction._id,
            role: 'pay',
            munten: transaction.munten,
            person: transaction.receivingName
          });
        }
        if(transaction.receivingId === user._id){
          ownTransactions.push({
            _id: transaction._id,
            role: 'receive',
            munten: transaction.munten,
            person: transaction.payingName
          });
        }
      });

      return (
        <View style={styles.container}>
          {
            ownTransactions.map(
              transaction => (
                <View key={transaction._id}>
                  <Text>Je {(transaction.role === 'receive') ? 'ontving' : 'betaalde'} {transaction.munten} munten {(transaction.role === 'receive') ? 'van' : 'aan'} {transaction.person}</Text>
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
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Terug"
            color="#841584"
          />
          <Text>TransactionsScreen</Text>
          <Navbar navigate={this.props.navigation}/>

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
});
