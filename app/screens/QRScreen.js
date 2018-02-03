import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import QRCode from 'react-native-qrcode';

export default class QRScreen extends React.Component {

  render() {
    const { params } = this.props.navigation.state;

    const data =
    `
      {
        "type": "Budamunt",
        "data": {
          "munten": "${params.munten}",
          "receiveId": "${params.user}"
        }
      }
    `;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Scan deze code</Text>
        <QRCode
         value={data}
         size={220}
       />
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
