import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class ReceiveScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Ontvang`,
  });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>ik wil 1 munt ontvangen</Text>

        <Button
          onPress={() => navigate('QRScreen')}
          title="oke"
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
});
