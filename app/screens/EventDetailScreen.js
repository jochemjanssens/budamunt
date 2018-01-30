import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class EventDetailScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Event ${navigation.state.params.name}`,
  });

  render() {
    const { navigate } = this.props.navigation;

    const { params } = this.props.navigation.state;
    console.log(params);
    return (
      <View>
        <Text>Naam:  {params.name}</Text>
        <Text>Waar:  {params.location}</Text>
        <Text>Wanneer:  {params.date}</Text>
        <Text>Wat: {params.description}</Text>
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
