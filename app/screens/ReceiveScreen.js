import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';

import t from 'tcomb-form-native';
const Form = t.form.Form;
const Munten = t.struct({
  munten: t.Number
});

export default class ReceiveScreen extends React.Component {

  state = {
    user: null
  };

  async componentWillMount() {
    AsyncStorage.getItem("user").then(user => {
      this.setState({'user': JSON.parse(user)});
    });
  }

  handleClick = () => {
    const value = this._form.getValue();
    if(value){
      this.props.navigation.navigate('QRScreen', {
        munten: value.munten,
        user: this.state.user
      })
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Terug"
          color="#841584"
        />
        <Form
           type={Munten}
           ref={c => this._form = c}
         />
        <Button
          title="Ontvang"
          onPress={this.handleClick}
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
