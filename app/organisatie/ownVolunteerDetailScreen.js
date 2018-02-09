import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';

import Navbar from './Navbar';

export default class ownVolunteerDetailScreen extends React.Component {

  deleteVolunteer = () => {
    const { params } = this.props.navigation.state;

    AsyncStorage.getItem("myToken").then(token => {
      const method = `DELETE`;
      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });
      const url = 'http://192.168.1.59:3000/api/volunteers/' + params._id;
      fetch(url, {method, headers})
        .then(r => {
          this.props.navigation.goBack()
        })
        .catch(err => console.error(err));
    });
  }

  changeVolunteer = () => {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    navigate('EditVolunteer', { data: params })
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
        <Text>Munten: {params.munten}</Text>

        <Button
          onPress={this.changeVolunteer}
          title="Wijzig vrijwilligerswerk"
          color="#134D57"
        />

        <Button
          onPress={this.deleteVolunteer}
          title="Verwijder vrijwilligerswerk"
          color="#841584"
        />

        <Navbar navigate={this.props.navigation}/>
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
