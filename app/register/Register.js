import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, TouchableHighlight, Image } from 'react-native';

export default class Login extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/register/registerTitle.png')}
          style={styles.title}

        />
        <TouchableHighlight onPress={() => navigate('RegisterGebruiker')}>
          <View style={styles.bigButton}>
            <Image
              source={require('../assets/register/accountIcon.png')}
              style={styles.icon}
            />
            <Text style={styles.text}>Je bent iemand die graag gebruik zou willen maken van onze munt !</Text>
            <Text style={styles.button}>GEBRUIKER</Text>
          </View>
        </TouchableHighlight>

        <Image
          source={require('../assets/register/grid.png')}
          style={styles.grid}
        />

        <View>
          <Text style={styles.text}>IK HEB EEN WINKEL, VZW OF ORGANISATIE</Text>

          <TouchableHighlight onPress={() => navigate('RegisterKeuze')}>
            <Text style={styles.button}>Handelaar / Organisatie</Text>
          </TouchableHighlight>
        </View>

        <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.smallButton}>IK HEB AL EEN ACCOUNT</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 50,
  },
  title:{
    width: 166,
    height: 44,
  },
  text: {
    color: '#5A60FB',
    textAlign: 'center',
    padding: 10,
  },
  bigButton: {
    borderWidth: 2,
    borderColor: '#5A60FB',
    backgroundColor: 'white',
    paddingTop: 30,
  },
  icon: {
    marginLeft: "38%",
    width: 42,
    height: 54,
  },
  button: {
    color: 'white',
    backgroundColor: '#5A60FB',
    fontSize: 13,
    fontWeight: 'bold',
    paddingVertical: 14,
    paddingHorizontal: 50,
    textAlign: 'center',
  },
  smallButton: {
    textAlign: 'center',
  },
  grid: {
    position: 'absolute',
    zIndex: -1,
    right: 30,
    top: 130,
  }
});
