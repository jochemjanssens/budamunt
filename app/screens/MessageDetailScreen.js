import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight, ScrollView } from 'react-native';

import Navbar from './Navbar';


import t from 'tcomb-form-native';

const Form = t.form.Form;

const Answer = t.struct({
  message: t.String,
});

var options = {
  auto: 'placeholders',
  fields: {
   message: {
     placeholder: 'Stuur jouw bericht….'
   }
 }
};

export default class MessageDetailScreen extends React.Component {
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

  handleSubmit = conversation => {
    const value = this._form.getValue(); // use that ref to get the form value);
    if(value){
      AsyncStorage.getItem("myToken").then((token) => {
        if(token){
            const body = new FormData();
            body.append(`sendId`, this.state.user.email);
            if(this.state.user.email === conversation.content.sendId){
              body.append(`receiveId`, conversation.content.receiveId);
            }else{
              body.append(`receiveId`, conversation.content.sendId);
            }
            body.append(`content`, value.message);
            body.append(`conversation`, conversation.content._id);

            const headers = new Headers({
              Authorization: `Bearer ${token}`
            });

            fetch('http://192.168.1.40:3000/api/messages', {
                method: 'POST',
                body,
                headers
              })
              .then(r => {
                fetch(`http://192.168.1.40:3000/api/messages`, {headers})
                  .then(r => {
                    this.setState({'messages': JSON.parse(r._bodyText).messages});
                  })
                  .catch(err => console.error(err));
              })
              .catch(err => console.error(err));
          }
        });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    const { messages, user } = this.state;

    const ownMessages = [];
    if(messages){
      messages.forEach(message=>{
        if(message.receiveId === params.content.receiveId || message.sendId === params.content.receiveId){
          if(message.receiveId === params.content.sendId || message.sendId === params.content.sendId){
            if(user.email === message.receiveId){
              ownMessages.push({
                type: 'receive',
                content: message
              });
            }
            if(user.email === message.sendId){
              ownMessages.push({
                type: 'send',
                content: message
              });
            }
          }
        }
      });
    }

    if(ownMessages.length !== 0){
      return (
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <TouchableHighlight
                onPress={() => this.props.navigation.goBack()}
                style={styles.backButton}
                underlayColor="white"
              >
                <Image
                  source={require('../assets/general/back.png')}
                  style={{
                    width: 15,
                    height: 23,
                  }}
                />
              </TouchableHighlight>
              <Text style={styles.maintitle}>{(params.type === 'receive') ? `${params.content.sendId}` : `${params.content.receiveId}`}</Text>
            </View>
            <Image
              source={require('../assets/home/bigBorder.png')}
              style={{
                width: '100%',
                height: 12,
              }}
            />
          </View>
          <ScrollView style={styles.content}>
            {
              ownMessages.map(
                message => {
                    return(
                      <Text key={message.content._id} style={(message.type === 'receive') ? styles.receive : styles.send}>
                        {message.content.content}
                      </Text>
                    );
                })
              }
            <View style={styles.newItem}>
              <Form
                 type={Answer}
                 ref={c => this._form = c}
                 options={options}
                 style={styles.form}
               />
               <TouchableHighlight
                 underlayColor="white"
                 onPress={() => this.handleSubmit(ownMessages[0])}
               >
                 <Text style={styles.button}>Stuur je bericht</Text>
               </TouchableHighlight>
            </View>
            <View style={{height: 300}}></View>
          </ScrollView>

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
                underlayColor="white"
              >
                <Image
                  source={require('../assets/general/back.png')}
                  style={{
                    width: 15,
                    height: 23,
                  }}
                />
              </TouchableHighlight>
              <Text style={styles.maintitle}>{(params.type === 'receive') ? `${params.content.sendId}` : `${params.content.receiveId}`}</Text>
            </View>
            <Image
              source={require('../assets/home/bigBorder.png')}
              style={{
                width: '100%',
                height: 12,
              }}
            />
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.newItem}>
              <Form
                 type={Answer}
                 ref={c => this._form = c}
                 options={options}
                 style={styles.form}
               />
               <TouchableHighlight
                 onPress={() => this.handleSubmit(ownMessages[0])}
                 underlayColor="white"
               >
                 <Text style={styles.button}>Stuur je bericht</Text>
               </TouchableHighlight>
            </View>
            <View style={{height: 300}}></View>
          </ScrollView>


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
  receive: {
    backgroundColor: "#5A60FB",
    color: "#FFF",
    padding: 10,
    width: '80%',
    marginVertical: 10,
  },
  send: {
    borderColor: "#5A60FB",
    borderWidth: 1,
    padding: 10,
    width: '80%',
    marginLeft: '20%',
    marginVertical: 10,
  },
  form: {
    width: '100%',
  },
  newItem:{
    paddingTop: 30,
  },
  content: {
    padding: 20,
  },
  button: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#5A60FB',
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginRight: '50%',
    textAlign: 'center',
  },
});
