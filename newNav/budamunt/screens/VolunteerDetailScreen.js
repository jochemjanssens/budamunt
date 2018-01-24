import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class VolunteerDetailScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Vrijwilligerswerk ${navigation.state.params.user}`,
  });

  render() {
    const { navigate } = this.props.navigation;

    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Vrijwilligerswerk {params.user}</Text>
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
