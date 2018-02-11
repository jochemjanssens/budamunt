import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight, } from 'react-native';

import t from 'tcomb-form-native';
const Form = t.form.Form;

const Question = t.struct({
  vraag: t.String
});

var options = {
  auto: 'none',
};

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

          fetch('http://192.168.1.7:3000/api/FAQS', {
              method: 'POST',
              body,
              headers
            })
            .then(r => {
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
          <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../assets/general/back.png')}
              style={{
                width: 15,
                height: 23,
              }}
            />
          </TouchableHighlight>
          <Text style={styles.maintitle}>ONDERSTEUNING</Text>
          <TouchableHighlight onPress={this.handleSubmit}>
            <Text style={styles.submitButton}>BEVESTIG</Text>
          </TouchableHighlight>
        </View>
        <Image
          source={require('../assets/home/bigBorder.png')}
          style={{
            width: '100%',
            height: 12,
          }}
        />
        <View style={styles.questionContainer}>
          <View style={styles.form}>
            <Text style={styles.formquestion}>STEL ZELF JOUW VRAAG</Text>
            <Form
               type={Question}
               options={options}
               ref={c => this._form = c}
               style={styles.formelement}
             />
           </View>
          <View style={styles.questionelement}>
            <Text style={styles.question}>WAAR KAN IK MET DE CARPEL BETALEN?</Text>
            <Text style={styles.answer}>Elke winkel die partner is van de Xarpel heeft en sticker op zijn raam, hiernaast kan je ook nog altijd de kaart raadplegen om te kijken welke winkels er allemaal partner zijn.</Text>
          </View>
          <View style={styles.questionelement}>
            <Text style={styles.question}>KAN IK DE CARPEL INWISSELEN VOOR ECHT GELD?</Text>
            <Text style={styles.answer}>Nee, dit is niet mogelijk</Text>
          </View>
          <View style={styles.questionelement}>
            <Text style={styles.question}>HOE BETAAL IK MET DE CARPEL:</Text>
            <Text style={styles.answer}>Door met js GSM de code bij de andere persoon te scannen.</Text>
          </View>
          <View style={styles.questionelement}>
            <Text style={styles.question}>HOE ONTVANG IK DE CARPEL:</Text>
            <Text style={styles.answer}>Door de code op je GSM te laten scannen door een andere persoon.</Text>
          </View>

      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: "100%",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 10,
  },
  questionContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  questionelement: {
    paddingVertical: 10,
  },
  question: {
    color: '#5A60FB',
    fontWeight: '700'
  },
  formquestion: {
    color: '#5A60FB',
    fontWeight: '700',
    paddingVertical: 5,
  },
  title: {
    paddingBottom: 30,
  },
  maintitle: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 20,
  },
  submitButton: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 10,
  }
});
