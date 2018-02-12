import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';

import Navbar from './Navbar';


import t from 'tcomb-form-native';

const Form = t.form.Form;

const Answer = t.struct({
  message: t.String,
});

export default class MessageDetailScreen extends React.Component {
  state = {
    messages: null
  };

  async componentWillMount() {
    AsyncStorage.getItem("myToken").then((token) => {
      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });

      fetch(`http://192.168.1.22:3000/api/messages`, {headers})
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

            fetch('http://192.168.1.22:3000/api/messages', {
                method: 'POST',
                body,
                headers
              })
              .then(r => {
                fetch(`http://192.168.1.22:3000/api/messages`, {headers})
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
          <View style={styles.header}>
            <Button
              onPress={() => this.props.navigation.goBack()}
              title="Terug"
              color="#841584"
            />
            <Text>{(params.type === 'receive') ? `${params.content.sendId}` : `${params.content.receiveId}`}</Text>
          </View>

          {
            ownMessages.map(
              message => {
                  return(
                    <Text key={message.content._id} style={(message.type === 'receive') ? styles.receive : styles.send}>
                      {message.content.sendId} - {message.content.content}
                    </Text>
                  );
              })
            }
          <View style={styles.form}>
            <Form
               type={Answer}
               ref={c => this._form = c}
             />
             <Button
               title="Stuur je bericht"
               onPress={() => this.handleSubmit(ownMessages[0])}
             />
          </View>

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
            <Text>{(params.type === 'receive') ? `${params.content.sendId}` : `${params.content.receiveId}`}</Text>
          </View>

          <View style={styles.form}>
            <Form
               type={Answer}
               ref={c => this._form = c}
             />
             <Button
               title="Stuur je bericht"
               onPress={this.handleSubmit}
             />
          </View>

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
  receive: {
    backgroundColor: "#ff0"
  },
  send: {
    backgroundColor: "#f0f"
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
  },
});
