import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight } from 'react-native';

import Navbar from './Navbar';

export default class CommunityScreen extends React.Component {

  state = {
    token: null,
    artist: null,
    question: null
  };

  async componentWillMount() {
    AsyncStorage.getItem("myToken").then((token) => {
      AsyncStorage.getItem("user").then(user => {
          this.setState({'token': token});
          const headers = new Headers({
            Authorization: `Bearer ${token}`
          });
          fetch(`http://192.168.1.16:3000/api/artists`, {headers})
          .then(r => {
            const artists = JSON.parse(r._bodyText).artists;
            this.setState({'artist': artists[artists.length-1]});
            fetch(`http://192.168.1.16:3000/api/questions`, {headers})
            .then(r => {
              const questions = JSON.parse(r._bodyText).questions;
              console.log(questions);
              fetch(`http://192.168.1.16:3000/api/answers`, {headers})
              .then(r => {
                const answers = JSON.parse(r._bodyText).answers;
                if(answers.length !== 0){
                  answers.forEach(answer => {
                    if(JSON.parse(user)._id !== answer.userId){
                      this.setState({'question': questions[questions.length-1]});
                    }
                  });
                } else {
                  this.setState({'question': questions[questions.length-1]});
                }
              })
              .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
        }).done();
    }).done();
  }


  render() {
    const { artist, question } = this.state;
    const { navigate } = this.props.navigation;
    console.log(question);
    if(question !== null){
      if(artist && question){
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
            <View style={styles.stemming}>
              <Text style={styles.title}>COMMUNITYSTEMMING</Text>
              <Text style={styles.text}>{question.name}</Text>
              <Text style={styles.text}>{question.description}</Text>
              <TouchableHighlight onPress={() => navigate('CommunityDetail', { ...question })}>
                <Text style={styles.button}>BEVESTIG</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.kunstenaar}>
              <Image
                 style={{width: '100%', height: 120}}
                 source={{uri: artist.image}}
              />
              <Text style={styles.titleBottom}>KUNSTENAAR VAN DE MAAND: {artist.name}</Text>
              <Text style={styles.description}>{artist.description}</Text>
            </View>
            <Navbar navigate={this.props.navigation}/>
          </View>
        );
      }else{
        return (
          <View style={styles.container}>
            <Navbar navigate={this.props.navigation}/>
          </View>
        );
      }
    } else {
      if(artist){
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
            <View style={styles.kunstenaar}>
              <Text>Communitystemming</Text>
              <Text>Al ingevuld</Text>
            </View>
            <View style={styles.kunstenaar}>
              <Image
                 style={{width: '100%', height: 120}}
                 source={{uri: artist.image}}
              />
              <Text style={styles.titleBottom}>KUNSTENAAR VAN DE MAAND: {artist.name}</Text>
              <Text style={styles.description}>{artist.description}</Text>
            </View>
            <Navbar navigate={this.props.navigation}/>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <Navbar navigate={this.props.navigation}/>
          </View>
        );
      }
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
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  titleBottom: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  button: {
    color: 'white',
    backgroundColor: '#5A60FB',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 20,
    textAlign: 'center',
  },
  stemming: {
    borderWidth: 1,
    borderColor: '#5A60FB',
    marginHorizontal: 30,
    marginVertical: 10,
    padding: 10,
  },
  text: {
    textAlign: 'center',
  },
  kunstenaar: {
    borderWidth: 1,
    borderColor: '#5A60FB',
    marginHorizontal: 30,
  },
  description: {
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
  }
});
