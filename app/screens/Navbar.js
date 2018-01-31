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
            source={require('../assets/navicon.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate.navigate('Community')}>
          <Image
            style={styles.button}
            source={require('../assets/navicon.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate.navigate('Vrijwilligerswerk')}>
          <Image
            style={styles.button}
            source={require('../assets/navicon.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate.navigate('Evenementen')}>
          <Image
            style={styles.button}
            source={require('../assets/navicon.png')}
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
    width: 300
  },
});
