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
            underlayColor="white"
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
            <Image
              source={require('../assets/map/openingsuren.png')}
              style={{
                width: 136,
                height: 25,
                marginBottom: 12,
              }}
            />
            <View style={styles.openingsurenelement}>
              <Text style={styles.text}>MA:</Text>
              <Text style={styles.text}>14:00 - 18:00</Text>
            </View>
            <View style={styles.openingsurenelement}>
              <Text style={styles.text}>DI:</Text>
              <Text style={styles.text}>12:00 - 18:00</Text>
            </View>

            <View style={styles.openingsurenelement}>
              <Text style={styles.text}>WO:</Text>
              <Text style={styles.text}>09:00 - 18:00</Text>
            </View>

            <View style={styles.openingsurenelement}>
              <Text style={styles.boldtext}>DO:</Text>
              <Text style={styles.boldtext}>14:00 - 18:00</Text>
            </View>

            <View style={styles.openingsurenelement}>
              <Text style={styles.text}>VR:</Text>
              <Text style={styles.text}>10:00 - 18:00</Text>
            </View>

            <View style={styles.openingsurenelement}>
              <Text style={styles.text}>ZA:</Text>
              <Text style={styles.text}>gesloten</Text>
            </View>

            <View style={styles.openingsurenelement}>
              <Text style={styles.text}>Z0:</Text>
              <Text style={styles.text}>10:00 - 12:00</Text>
            </View>
          </View>

          <View style={styles.contact}>
            <Image
              source={require('../assets/map/adres.png')}
              style={{
                width: 71,
                height: 24,
                marginBottom: 12,
              }}
            />
            <View style={styles.contacttext}>
              <Text style={styles.text}>{params.street}</Text>
              <Text style={styles.text}>8500 {params.city}</Text>
              <Text style={styles.boldtext}>056 / 31 62 33</Text>
            </View>
          </View>
        </View>

        <View style={styles.acties}>
          <Image
            source={require('../assets/map/acties.png')}
            style={{
              width: 83,
              height: 24,
              alignSelf: 'center',
              marginBottom: 12,
            }}
          />
          <View style={styles.contacttext}>
            <Text style={styles.text}>5 Carpels - 10% korting</Text>
            <Text style={styles.text}>25 Carpels - 1 + 1 Gratis</Text>
          </View>
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
    padding: 40,
  },
  openingsurenelement:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
    paddingLeft: 10,
  },
  acties: {
    padding: 40,
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
  contact:{
    paddingRight: 10,
  },
  contacttext: {
    paddingLeft: 10,
  }
});
