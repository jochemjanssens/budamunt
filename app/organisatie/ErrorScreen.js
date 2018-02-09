import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class Errorscreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text>Niet genoeg munten</Text>

        <Button
          title='Go home'
          onPress={() => navigate('Home')}
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
  title: {
    paddingBottom: 30,
  },
});
