import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight } from 'react-native';

export default class Navbar extends React.Component {
  constructor(navigate){
    super();
    console.log("body");
    this.navigate = navigate;
  }

  render() {
    return (
      <View style={styles.navbar}>
        <TouchableHighlight onPress={() => this.navigate.navigate('Home')}>
          <Image
            style={styles.button}
            source={require('../assets/icons/home.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate.navigate('Community')}>
          <Image
            style={styles.button}
            source={require('../assets/icons/community.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate.navigate('Vrijwilligerswerk')}>
          <Image
            style={styles.button}
            source={require('../assets/icons/volunteer.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate.navigate('Evenementen')}>
          <Image
            style={styles.button}
            source={require('../assets/icons/events.png')}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: 300
  },
});
