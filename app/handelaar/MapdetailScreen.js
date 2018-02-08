import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class MapdetailScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    console.log(params);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Terug"
            color="#841584"
          />
          <Text>{params.store}</Text>
        </View>
        <Text>{params.street} {params.city}</Text>

        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Terug"
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
  title: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    width: 300
  }
});
