import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import Navbar from './Navbar';

export default class WinkelScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Terug"
            color="#841584"
          />
          <Text>Mijn Winkel</Text>
        </View>

        <Text>WINKEL INFO IS MOMENTEEL NOG NIET BESCHIKBAAR</Text>

        <Button
          title='Wijzig'
          onPress={() => navigate('EditWinkel')}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    alignItems: 'center',
    top: 50,
    width: 300
  },
  title: {
    paddingBottom: 30,
  },
});
