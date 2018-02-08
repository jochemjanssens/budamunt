import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight } from 'react-native';

import Navbar from './Navbar';

export default class MessagesScreen extends React.Component {

  state = {
    messages: null
  };

  async componentWillMount() {
    AsyncStorage.getItem("myToken").then((token) => {
      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });

      fetch(`http://192.168.0.233:3000/api/messages`, {headers})
        .then(r => {
          this.setState({'messages': JSON.parse(r._bodyText).messages});
        })
        .catch(err => console.error(err));
    });

    AsyncStorage.getItem("user").then(user => {
      this.setState({'user': JSON.parse(user)});
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { messages, user } = this.state;

    if(messages){
      if(messages.length !== 0){
        const messagesArray = [];
        messages.map(message => {
          if(message.conversation === 'first'){
            if(user.email === message.receiveId){
              messagesArray.push({
                type: 'receive',
                content: message
              });
            }
            if(user.email === message.sendId){
              messagesArray.push({
                type: 'send',
                content: message
              });
            }
          }
        });

        if(messagesArray.length !== 0){
          return (
            <View style={styles.container}>
              <View style={styles.header}>
                <Button
                  onPress={() => this.props.navigation.goBack()}
                  title="Terug"
                  color="#841584"
                />
                <Text>Berichten</Text>
              </View>
              {
                messagesArray.map(
                  message => {
                    console.log(message.content);
                    return(
                      <TouchableHighlight key={message.content._id} style={styles.message} onPress={() => navigate(`MessageDetail`, { ...message })}>
                        <View>
                          <Text>{(message.type === 'receive') ? `van ${message.content.sendId}` : `aan ${message.content.receiveId}`} </Text>
                          <Text>{message.content.content}</Text>
                        </View>
                      </TouchableHighlight>
                    );
                  }
                )
              }
              <Navbar navigate={this.props.navigation}/>
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
              <View style={styles.header}>
                <Button
                  onPress={() => this.props.navigation.goBack()}
                  title="Terug"
                  color="#841584"
                />
                <Text>Berichten</Text>
              </View>
              <Text>Nog geen berichten</Text>
              <Navbar navigate={this.props.navigation}/>
            </View>
          );
        }
      } else {
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Button
                onPress={() => this.props.navigation.goBack()}
                title="Terug"
                color="#841584"
              />
              <Text>Berichten</Text>
            </View>
            <Text>Nog geen berichten</Text>
            <Navbar navigate={this.props.navigation}/>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Button
              onPress={() => this.props.navigation.goBack()}
              title="Terug"
              color="#841584"
            />
            <Text>Berichten</Text>
          </View>
          <Text>Nog geen berichten</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    width: 300,
  },
  message: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
  },
  title: {
    paddingBottom: 30,
  },
});
