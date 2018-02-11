import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight } from 'react-native';

export default class ReceiveScreen extends React.Component {

  state = {
    user: null,
    amount: 10,
  };

  async componentWillMount() {
    AsyncStorage.getItem("user").then(user => {
      this.setState({'user': JSON.parse(user)});
    });
    this.setState({'amount': 10});
  }

  handleClick = () => {
    const value = this.state.amount;
    if(value){
      this.props.navigation.navigate('QRScreen', {
        munten: value,
        user: this.state.user
      })
    }
  }

  handleLess = () => {
    this.setState({amount: this.state.amount-1});
  }

  handleMore = () => {
    this.setState({amount: this.state.amount+1});
  }

  handleMore5 = () => {
    this.setState({amount: 5});
  }

  handleMore10 = () => {
    this.setState({amount: 10});
  }

  handleMore20 = () => {
    this.setState({amount:20});
  }

  render() {
    const { navigate } = this.props.navigation;
    const { amount } = this.state;


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
            <Text style={styles.maintitle}>BETALEN</Text>
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
           <Text style={styles.contentTitle}>KIES JE TE ONTVANGEN BEDRAG</Text>
           <View style={styles.currentAmount}>
             <TouchableHighlight onPress={this.handleLess} underlayColor="white">
               <Image
                 source={require('../assets/pay/less.png')}
                 style={{
                   width: 46,
                   height: 46,
                 }}
               />
             </TouchableHighlight>
             <Text style={styles.amount}>
               {amount}
             </Text>
             <TouchableHighlight onPress={this.handleMore} underlayColor="white">
               <Image
                 source={require('../assets/pay/more.png')}
                 style={{
                   width: 46,
                   height: 46,
                 }}
               />
             </TouchableHighlight>
           </View>
            <View style={styles.buttons}>
             <TouchableHighlight onPress={this.handleMore5} underlayColor="white">
               <Image
                 source={require('../assets/pay/button5.png')}
                 style={{
                   width: 86,
                   height: 87,
                 }}
               />
             </TouchableHighlight>
             <TouchableHighlight onPress={this.handleMore10} underlayColor="white">
               <Image
                 source={require('../assets/pay/button10.png')}
                 style={{
                   width: 75,
                   height: 89,
                 }}
               />
             </TouchableHighlight>
             <TouchableHighlight onPress={this.handleMore20} underlayColor="white">
               <Image
                 source={require('../assets/pay/button20.png')}
                 style={{
                   width: 88,
                   height: 87,
                 }}
               />
             </TouchableHighlight>
          </View>
          <TouchableHighlight onPress={this.handleClick}>
            <Text style={styles.button}>BEVESTIG</Text>
          </TouchableHighlight>
        </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  contentTitle: {
    color: '#5A60FB',
    fontSize: 13,
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
  amount: {
    fontWeight: '700',
    color: '#5A60FB',
    fontSize: 90,
  },
  currentAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-between'
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-between'
  },
});
