import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight } from 'react-native';

export default class AfterpayScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text style={styles.maintitle}>BETALEN</Text>
          </View>
          <Image
            source={require('../assets/home/bigBorder.png')}
            style={{
              width: '100%',
              height: 12,
            }}
          />
        </View>
        <View style={styles.content}>
          <Image
            source={require('../assets/pay/succes.png')}
            style={{
              width: 143,
              height: 108,
            }}
          />

          <View style={styles.textelement}>
            <Text style={styles.maintext}>SUCCES</Text>
            <Text style={styles.text}>De betaling is voltooid</Text>
          </View>

          <TouchableHighlight onPress={() => navigate('Home')}>
            <Text style={styles.button}>NAAR HOME</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      height: "100%",
    },
    maintitle: {
      color: '#5A60FB',
      fontWeight: '700',
      fontSize: 20,
    },
    header: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingTop: 50,
      paddingBottom: 10,
    },
    backButton: {
      position: 'absolute',
      top: 52,
      left: 30,
    },
    button: {
      color: 'white',
      backgroundColor: '#5A60FB',
      fontSize: 16,
      fontWeight: 'bold',
      paddingVertical: 14,
      paddingHorizontal: 50,
      textAlign: 'center',
    },
    textelement: {
      paddingVertical: 100,
    },
    maintext: {
      color: '#5A60FB',
      fontWeight: '700',
      fontSize: 18,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      textAlign: 'center',
    }
});
