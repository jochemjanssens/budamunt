import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';

import t from 'tcomb-form-native';
const Form = t.form.Form;

import Navbar from './Navbar';

const Answer = t.struct({
  motivatie: t.String,
});

export default class CommunityDetailScreen extends React.Component {
  state = {
    answer: null,
  };


  handleJa = () => {
    this.setState({'answer': true});
  }

  handleNee = () => {
    const { params } = this.props.navigation.state;

    const value = this._form.getValue();
    console.log(value);
    AsyncStorage.getItem("myToken").then((token) => {
      AsyncStorage.getItem("user").then(user => {
        const body = new FormData();
        body.append(`userId`, user._id);
        body.append(`questionId`, params._id);
        body.append(`answer`, "nee");
        body.append(`motivation`, ' ');
        const headers = new Headers({
          Authorization: `Bearer ${token}`
        });

        fetch('http://192.168.1.59:3000/api/answers', {
            method: 'POST',
            body,
            headers
          })
          .then(r => {
            this.props.navigation.goBack();
          })
          .catch(err => console.error(err));
        }).done();
    }).done();
  }

  handleSubmit = () => {
    const { params } = this.props.navigation.state;

    const value = this._form.getValue();
    AsyncStorage.getItem("myToken").then((token) => {
      AsyncStorage.getItem("user").then(user => {
        const body = new FormData();
        body.append(`userId`, JSON.parse(user)._id);
        body.append(`questionId`, params._id);
        body.append(`answer`, "ja");
        body.append(`motivation`, value.motivatie);

        const headers = new Headers({
          Authorization: `Bearer ${token}`
        });

        fetch('http://192.168.1.59:3000/api/answers', {
            method: 'POST',
            body,
            headers
          })
          .then(r => {
            this.props.navigation.goBack();
          })
          .catch(err => console.error(err));
        }).done();
    }).done();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { answer } = this.state;

    if(answer){
      return (
        <View style={styles.container}>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Terug"
            color="#841584"
          />
          <Image
             style={{width: 200, height: 200}}
             source={{uri: params.image}}
          />
          <Text>{params.name}</Text>
          <Text>{params.description}</Text>

          <Text>Motiveer je antwoord</Text>
          <Form
             type={Answer}
             ref={c => this._form = c}
           />

          <Button
            title="Verzend"
            onPress={this.handleSubmit}
          />

          <Navbar navigate={this.props.navigation}/>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Terug"
            color="#841584"
          />
          <Image
             style={{width: 200, height: 200}}
             source={{uri: params.image}}
          />
          <Text>{params.name}</Text>
          <Text>{params.description}</Text>

          <Button
            title="Ja"
            onPress={this.handleJa}
          />

          <Button
            title="Nee"
            onPress={this.handleNee}
          />

          <Navbar navigate={this.props.navigation}/>
        </View>
      );
    }
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
