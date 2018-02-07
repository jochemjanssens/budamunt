import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class SupportScreen extends React.Component {

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
});
