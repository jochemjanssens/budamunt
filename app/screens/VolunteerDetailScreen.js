import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class VolunteerDetailScreen extends React.Component {
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
        <Text>Naam:  {params.name}</Text>
        <Text>Waar:  {params.location}</Text>
        <Text>Wanneer:  {params.date}</Text>
        <Text>Wat: {params.description}</Text>
        <Text>Munten: {params.munten}</Text>
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
