import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class NewEvent extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Nieuw event`,
  });

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text>Naam</Text>
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
