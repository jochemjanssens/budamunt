import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class EventDetailScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Event ${navigation.state.params.user}`,
  });

  render() {
    const { navigate } = this.props.navigation;

    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Event {params.user}</Text>
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
