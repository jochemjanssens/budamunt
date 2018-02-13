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

      fetch(`http://192.168.1.40:3000/api/messages`, {headers})
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
                  <Text style={styles.maintitle}>BERICHTEN</Text>
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
              {
                messagesArray.map(
                  message => {
                    return(
                      <TouchableHighlight key={message.content._id} style={styles.message} onPress={() => navigate(`MessageDetail`, { ...message })}>
                        <View style={styles.messageelement}>
                          <View style={styles.textelement}>
                            <Text style={styles.person}>{(message.type === 'receive') ? `${message.content.sendId.toUpperCase()}` : `${message.content.receiveId.toUpperCase()}`} </Text>
                            <Text>{message.content.content}</Text>
                          </View>
                          <Image
                            source={require('../assets/volunteer/next.png')}
                            style={styles.nextButton}
                          />
                        </View>
                      </TouchableHighlight>
                    );
                  }
                )
              }
              </View>
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
                  <Text style={styles.maintitle}>BERICHTEN</Text>
                </View>
                <Image
                  source={require('../assets/home/bigBorder.png')}
                  style={{
                    width: '100%',
                    height: 12,
                  }}
                />
              </View>
              <Text style={styles.noberichten}>Nog geen berichten</Text>
              <Navbar navigate={this.props.navigation}/>
            </View>
          );
        }
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
                <Text style={styles.maintitle}>BERICHTEN</Text>
              </View>
              <Image
                source={require('../assets/home/bigBorder.png')}
                style={{
                  width: '100%',
                  height: 12,
                }}
              />
            </View>
            <Text style={styles.noberichten}>Nog geen berichten</Text>
            <Navbar navigate={this.props.navigation}/>
          </View>
        );
      }
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
          <Text>Nog geen berichten</Text>
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
  content: {
    padding: 20,
  },
  message: {
    borderColor: '#5A60FB',
    borderWidth: 1,
    marginBottom: 20,
  },
  messageelement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  person: {
    fontWeight: '700',
    marginBottom: 4,
  },
  textelement: {
    width: '94     %',
  },
  nextButton: {
    width: 14,
    height: 23,
    alignSelf: 'center',
    marginRight: 5,
  },
  noberichten: {
    textAlign: 'center',
    paddingTop: 200,
    fontSize: 20,
    color: "#5A60FB",
  }
});
