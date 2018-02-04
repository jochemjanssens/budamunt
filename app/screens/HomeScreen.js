import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight} from 'react-native';

import App from '../App';
import Navbar from './Navbar';

export default class HomeScreen extends React.Component {

  state = {
    token: null,
    logout: false
  };

  async componentWillMount() {
    AsyncStorage.getItem("myToken").then((token) => {
          this.setState({'token': token});
          const headers = new Headers({
            Authorization: `Bearer ${token}`
          });
          fetch(`http://10.17.7.3:3000/api/me?isActive=true`, {headers})
            .then(user => {
              const userContent = user._bodyText;
              AsyncStorage.setItem("user", userContent);
              fetch(`http://192.168.0.233:3000/api/balances`, {headers})
                .then(r => {
                  const balances = JSON.parse(r._bodyText).balances;
                  balances.forEach(balance => {
                    if(balance.isActive){
                      if(JSON.parse(userContent)._id === balance.userId){
                        this.setState({ munten: balance.munten});
                        AsyncStorage.setItem("muntenId", balance._id);
                        AsyncStorage.setItem("munten", balance.munten);
                      }
                    }
                  });
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }).done();
  }

  handleLogout = () => {
    console.log('logout');
    AsyncStorage.setItem("myToken", '');
    this.setState({ logout: true });
  }

  render() {
    const { logout, munten } = this.state;
    const { navigate } = this.props.navigation;

    if(logout){
      return (
        <App />
      )
    }

    return (
      <View style={styles.container}>
        <Text>HOME</Text>

        <Text>Munten: {munten}</Text>

        <Button
          title='Transacties'
          onPress={() => navigate('Transactions')}
        />
        <Button
          title='Betalen'
          onPress={() => navigate('Pay')}
        />
        <Button
          title='Ontvangen'
          onPress={() => navigate('Receive')}
        />
        <Button
          title='MELD AF'
          onPress={this.handleLogout}
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
    justifyContent: 'center',
    alignItems: 'center',
  }
});
