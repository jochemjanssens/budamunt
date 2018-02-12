import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight } from 'react-native';

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

        fetch('http://192.168.1.16:3000/api/answers', {
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

        fetch('http://192.168.1.16:3000/api/answers', {
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
          <View>
            <View style={styles.header}>
              <TouchableHighlight
                onPress={() => this.props.navigation.goBack()}
                style={styles.backButton}
              >
                <Image
                  source={require('../assets/general/back.png')}
                  style={{
                    width: 15,
                    height: 23,
                  }}
                />
              </TouchableHighlight>
              <Text style={styles.maintitle}>TRANSACTIES</Text>
            </View>
            <Image
              source={require('../assets/home/bigBorder.png')}
              style={{
                width: '100%',
                height: 12,
              }}
            />
          </View>
          <Text style={styles.title}>{params.name.toUpperCase()}</Text>
          <Text style={styles.text}>{params.description}</Text>

          <Text>Motiveer je antwoord</Text>
          <Form
             type={Answer}
             ref={c => this._form = c}
           />

          <TouchableHighlight
            onPress={this.handleSubmit}
          >
            <Text style={styles.button}>Verzend</Text>
          </TouchableHighlight>

          <Navbar navigate={this.props.navigation}/>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <TouchableHighlight
                onPress={() => this.props.navigation.goBack()}
                style={styles.backButton}
              >
                <Image
                  source={require('../assets/general/back.png')}
                  style={{
                    width: 15,
                    height: 23,
                  }}
                />
              </TouchableHighlight>
              <Text style={styles.maintitle}>TRANSACTIES</Text>
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
               style={{
                 width: 200,
                 height: 200,
                 alignSelf: 'center',
               }}
               source={{uri: params.image}}
            />
            <Text style={styles.title}>{params.name.toUpperCase()}</Text>
            <Text style={styles.text}>{params.description}</Text>

            <View style={styles.buttons}>
              <TouchableHighlight
                onPress={this.handleJa}
              >
                <Text style={styles.button}>JA</Text>
              </TouchableHighlight>

              <TouchableHighlight
                onPress={this.handleNee}
              >
                <Text style={styles.button}>NEE</Text>
              </TouchableHighlight>
            </View>
          </View>

          <Navbar navigate={this.props.navigation}/>
        </View>
      );
    }
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
    textAlign: 'center',
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
  title: {
    fontSize: 14,
    color: '#5A60FB',
    fontWeight: '700',
    paddingVertical: 20,
  },
  text: {
    fontSize: 13,
    paddingBottom: 20,
  },
  button: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#5A60FB',
    paddingHorizontal: 50,
    paddingVertical: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    padding: 20,
  }
});
