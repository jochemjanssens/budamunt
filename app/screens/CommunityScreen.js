import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';

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
          fetch(`http://192.168.1.59:3000/api/artists`, {headers})
          .then(r => {
            const artists = JSON.parse(r._bodyText).artists;
            this.setState({'artist': artists[artists.length-1]});
            fetch(`http://192.168.1.59:3000/api/questions`, {headers})
            .then(r => {
              const questions = JSON.parse(r._bodyText).questions;
              fetch(`http://192.168.1.59:3000/api/answers`, {headers})
              .then(r => {
                const answers = JSON.parse(r._bodyText).answers;
                answers.forEach(answer => {
                  if(JSON.parse(user)._id !== answer.userId){
                    this.setState({'question': questions[questions.length-1]});
                  }
                });
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
    if(question !== null){
      if(artist && question){
        return (
          <View style={styles.container}>
            <Text>Community</Text>
            <View style={styles.kunstenaar}>
              <Text>Communitystemming</Text>
              <Text>{question.name}</Text>
              <Text>{question.description}</Text>
              <Button
                title='Bevestig'
                onPress={() => navigate('CommunityDetail', { ...question })}
              />
            </View>
            <View style={styles.kunstenaar}>
              <Image
                 style={{width: 200, height: 200}}
                 source={{uri: artist.image}}
              />
              <Text>Kunstenaar van de maand: {artist.name}</Text>
              <Text>{artist.description}</Text>
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
      if(artist && question){
        return (
          <View style={styles.container}>
            <Text>Community</Text>
            <View style={styles.kunstenaar}>
              <Text>Communitystemming</Text>
              <Text>Al ingevuld</Text>
            </View>
            <View style={styles.kunstenaar}>
              <Image
                 style={{width: 200, height: 200}}
                 source={{uri: artist.image}}
              />
              <Text>Kunstenaar van de maand: {artist.name}</Text>
              <Text>{artist.description}</Text>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
