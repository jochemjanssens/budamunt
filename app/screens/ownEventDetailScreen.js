import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';

import EventScreen from './EventScreen';

export default class ownEventDetailScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Event ${navigation.state.params.name}`,
  });

  deleteEvent = () => {
    const { params } = this.props.navigation.state;

    AsyncStorage.getItem("myToken").then(token => {
      const method = `DELETE`;
      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });
      const url = 'http://172.20.66.12:3000/api/events/' + params._id;
      console.log(url);
      fetch(url, {method, headers})
        .then(r => {
          this.props.navigation.goBack()
        })
        .catch(err => console.error(err));
    });
  }

  changeEvent = () => {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    navigate('EditEvent', { data: params })
  }

  render() {
    const { navigate } = this.props.navigation;

    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Terug"
          color="#841584"
        />
        <Text>OWNER</Text>

        <Text>Naam:  {params.name}</Text>
        <Text>Waar:  {params.location}</Text>
        <Text>Wanneer:  {params.date}</Text>
        <Text>Wat: {params.description}</Text>

        <Button
          onPress={this.changeEvent}
          title="Wijzig event"
          color="#134D57"
        />

        <Button
          onPress={this.deleteEvent}
          title="Verwijder event"
          color="#841584"
        />
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
});
