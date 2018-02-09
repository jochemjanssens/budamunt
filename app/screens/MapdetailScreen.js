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
        <Text>056 / 31 62 33</Text>

        <View style={styles.openingsuren}>
          <Text>Openingsuren</Text>
          <Text>MA: 14:00 - 18:00</Text>
          <Text>DI: 12:00 - 18:00</Text>
          <Text>WO: 09:00 - 18:00</Text>
          <Text>DO: 14:00 - 18:00</Text>
          <Text>VR: 10:00 - 18:00</Text>
          <Text>ZA: gesloten</Text>
          <Text>Z0: 14:00 - 18:00</Text>
        </View>

        <Text>Acties</Text>
        <Text>5 Carpels - 10% korting</Text>
        <Text>25 Carpels - 1 + 1 Gratis</Text>

        <Text>www.oxfamsol.be/shops</Text>

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
  openingsuren: {
    padding: 10,
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
