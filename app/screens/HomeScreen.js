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
          fetch(`http://172.20.66.17:3000/api/me?isActive=true`, {headers})
            .then(user => {
              const userContent = user._bodyText;
              AsyncStorage.setItem("user", userContent);
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
    const { token, logout } = this.state;

    const { navigate } = this.props.navigation;

    console.log(logout);
    if(logout){
      return (
        <App />
      )
    }

    return (
      <View style={styles.container}>
        <Text>
            token: {token}
        </Text>
        <Text>HOME</Text>
        <Button
          title='MELD AF'
          onPress={this.handleLogout}
        />
        <Navbar navigate={navigate}/>
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
  },
});
