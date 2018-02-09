import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TouchableNativeFeedback, TouchableHighlight, Image } from 'react-native';

export default class Login extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Maak een account</Text>

        <TouchableNativeFeedback onPress={() => navigate('RegisterHandel')}>
          <View style={styles.bigButton}>
            <Image
              source={require('../assets/register/handelIcon.png')}
              style={styles.icon1}
            />
            <Text style={styles.text}>Je hebt een onderneming bv. één of meerdere bakkerijen</Text>
            <Text style={styles.button}>LOKALE HANDELSZAAK</Text>
          </View>
        </TouchableNativeFeedback>
        <Image
          source={require('../assets/register/grid2.png')}
          style={styles.grid1}
        />

        <TouchableNativeFeedback onPress={() => navigate('RegisterOrganisatie')}>
          <View style={styles.bigButton}>
            <Image
              source={require('../assets/register/organisatieIcon.png')}
              style={styles.icon2}
            />
            <Text style={styles.text}>Een organisatie zoals bv. het heilig-hart die gebruik maakt van vrijwilligers</Text>
            <Text style={styles.button}>ORGANISATIE</Text>
          </View>
        </TouchableNativeFeedback>
        <Image
          source={require('../assets/register/grid3.png')}
          style={styles.grid2}
        />

        <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.smallButton}>TERUG</Text>
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
  icon1: {
    marginLeft: "32%",
    width: 101,
    height: 58,
  },
  icon2: {
    marginLeft: "36%",
    width: 67,
    height: 65,
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
  grid1: {
    position: 'absolute',
    zIndex: -1,
    right: 30,
    top: 70,
    width: 95,
    height: 95,
  },
  grid2: {
    position: 'absolute',
    zIndex: -1,
    left: 30,
    top: 284,
    width: 95,
    height: 95,
  }
});
