import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import Navbar from './Navbar';

export default class CommunityScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Community</Text>
        <Navbar navigate={navigate} style={styles.navbar}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbar: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
