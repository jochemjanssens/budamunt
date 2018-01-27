import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class QRScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `QR-code`,
  });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>toonQR</Text>
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
});
