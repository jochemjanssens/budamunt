import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import t from 'tcomb-form-native';
const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String
});

export default class NewEvent extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Nieuw event`,
  });

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Terug"
          color="#841584"
        />
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
