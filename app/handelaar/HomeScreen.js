import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight, Platform} from 'react-native';
import { Constants, Location, Permissions } from 'expo';

import App from '../App';
import Navbar from './Navbar';

export default class HomeScreen extends React.Component {

  state = {
    token: null,
    logout: false,
    user: null
  };

  async componentWillMount() {
    AsyncStorage.getItem("myToken").then((token) => {
          this.setState({'token': token});
          const headers = new Headers({
            Authorization: `Bearer ${token}`
          });
          fetch(`http://192.168.1.59:3000/api/me?isActive=true`, {headers})
            .then(user => {
              const userContent = user._bodyText;
              AsyncStorage.setItem("user", userContent);
              this.setState({user: userContent});
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
    const { logout, user } = this.state;
    const { navigate } = this.props.navigation;

    if(logout){
      return (
        <App />
      )
    }

    if(user){
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>{JSON.parse(user).firstname} {JSON.parse(user).name}</Text>
            <Button
              title='MELD AF'
              onPress={this.handleLogout}
            />
            <Button
              title='HELP'
              onPress={() => navigate('Support')}
            />
            <Button
              title='Kaart'
              onPress={() => navigate('Kaart')}
            />
          </View>
          <Button
            title='Betalen'
            onPress={() => navigate('Pay')}
          />
          <Button
            title='Ontvangen'
            onPress={() => navigate('Receive')}
          />
          <Navbar navigate={this.props.navigation}/>
        </View>
      );
    } else {
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Button
                title='MELD AF'
                onPress={this.handleLogout}
              />
              <Button
                title='HELP'
                onPress={() => navigate('Support')}
              />
              <Button
                title='Kaart'
                onPress={() => navigate('Kaart')}
              />
            </View>
            <Button
              title='Betalen'
              onPress={() => navigate('Pay')}
            />
            <Button
              title='Ontvangen'
              onPress={() => navigate('Receive')}
            />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    width: 300
  }
});
