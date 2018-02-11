import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight } from 'react-native';

export default class MapdetailScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    console.log(params);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight
            onPress={() => this.props.navigation.goBack()}
            style={styles.backButton}
          >
            <Image
              source={require('../assets/general/back.png')}
              style={{
                width: 15,
                height: 23,
              }}
            />
          </TouchableHighlight>
          <Text style={styles.maintitle}>{params.store.toUpperCase()}</Text>
        </View>
        <Image
          source={require('../assets/home/bigBorder.png')}
          style={{
            width: '100%',
            height: 12,
          }}
        />

        <View style={styles.topItem}>
          <View style={styles.openingsuren}>
            <Text style={styles.text}>MA: 14:00 - 18:00</Text>
            <Text style={styles.text}>DI: 12:00 - 18:00</Text>
            <Text style={styles.text}>WO: 09:00 - 18:00</Text>
            <Text style={styles.boldtext}>DO: 14:00 - 18:00</Text>
            <Text style={styles.text}>VR: 10:00 - 18:00</Text>
            <Text style={styles.text}>ZA: gesloten</Text>
            <Text style={styles.text}>Z0: 10:00 - 12:00</Text>
          </View>

          <View style={styles.contact}>
            <Text style={styles.text}>{params.street}</Text>
            <Text style={styles.text}>8500 {params.city}</Text>
            <Text style={styles.boldtext}>056 / 31 62 33</Text>
          </View>
        </View>

        <View style={styles.acties}>
          <Image
            source={require('../assets/map/actiesTitle.png')}
            style={{
              width: 83,
              height: 24,
              alignSelf: 'center',
              marginBottom: 12,
            }}
          />
          <Text style={styles.text}>5 Carpels - 10% korting</Text>
          <Text style={styles.text}>25 Carpels - 1 + 1 Gratis</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: "100%",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 10,
  },
  maintitle: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 20,
  },
  backButton: {
    position: 'absolute',
    top: 52,
    left: 30,
  },
  title: {
    paddingBottom: 30,
  },
  topItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
  acties: {
    padding: 30,
  },
  text: {
    color: '#5A60FB',
    fontSize: 16,
  },
  boldtext: {
    color: '#5A60FB',
    fontSize: 16,
    fontWeight: '700',
  },
});
