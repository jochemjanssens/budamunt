import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import Navbar from './Navbar';

export default class WinkelScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text>WinkelScreen</Text>

        <Button
          title='Go home'
          onPress={() => navigate('Home')}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingBottom: 30,
  },
});
