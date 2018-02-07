import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';

import t from 'tcomb-form-native';
const Form = t.form.Form;

const Question = t.struct({
  vraag: t.String
});

export default class SupportScreen extends React.Component {

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value);
    if(value){
    AsyncStorage.getItem("myToken").then((token) => {
      if(token){
          const body = new FormData();
          body.append(`question`, value.vraag);

          const headers = new Headers({
            Authorization: `Bearer ${token}`
          });

          fetch('http://192.168.1.59:3000/api/FAQS', {
              method: 'POST',
              body,
              headers
            })
            .then(r => {
              console.log(r);
              this.props.navigation.navigate('Home')
            })
            .catch(err => console.error(err));
        }
      });
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Terug"
            color="#841584"
          />
          <Text>Help</Text>
        </View>
        <View style={styles.questionelement}>
          <Text style={styles.question}>Waar kan ik met de Carpel betalen?</Text>
          <Text style={styles.answer}>Elke winkel die partner is van de Xarpel heeft en sticker op zijn raam, hiernaast kan je ook nog altijd
          de kaart raadplegen om te kijken welke winkels er allemaal partner zijn.</Text>
        </View>
        <View style={styles.questionelement}>
          <Text style={styles.question}>Kan ik de Carpel inwisselen voor echt geld?</Text>
          <Text style={styles.answer}>Nee, dit is niet mogelijk</Text>
        </View>
        <View style={styles.questionelement}>
          <Text style={styles.question}>Hoe betaal ik met de Carpel:</Text>
          <Text style={styles.answer}>Door met js GSM de code bij de andere persoon te scannen.</Text>
        </View>
        <View style={styles.questionelement}>
          <Text style={styles.question}>Hoe ontvang ik de Carpel:</Text>
          <Text style={styles.answer}>Door de code op je GSM te laten scannen door een andere persoon.</Text>
        </View>
        <View style={styles.form}>
          <Form
             type={Question}
             ref={c => this._form = c}
           />
           <Button
             title="Stel vraag"
             style={styles.button}
             onPress={this.handleSubmit}
           />
          </View>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    alignItems: 'center',
    top: 50,
    width: 300
  },
  questionelement: {
    padding: 5,
  },
  title: {
    paddingBottom: 30,
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
  },
});
