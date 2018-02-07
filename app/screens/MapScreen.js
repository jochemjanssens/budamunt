import React from 'react';
import { StyleSheet, Text, View, Button, Image, Platform, AsyncStorage } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

import Navbar from './MapNavbar';

export default class MapScreen extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    stores: null
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

    AsyncStorage.getItem("myToken").then((token) => {
      this.setState({'token': token});

      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });

      fetch(`http://192.168.1.59:3000/api/stores`, {headers})
        .then(r => {
          this.setState({'stores': JSON.parse(r._bodyText).stores});
        })
        .catch(err => console.error(err));
    });
  }

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       errorMessage: 'Permission to access location was denied',
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ location });
 };



  render() {
    const { navigate } = this.props.navigation;
    const { stores } = this.state;

    let text = 'GPS nog niet beschikbaar';
    let data = 'empty';

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      data = this.state.location.coords;
      text = '';
    }

    //Standaard aan BK6
    let currentLatitude = 50.830668;
    let currentLongitude = 3.266142;

    if(data !== 'empty'){
      //check aanwezig op buda
      if(data.latitude > 50.829535 && data.latitude < 50.830430 && data.longitude > 3.264559 && data.longitude < 3.265707){
        currentLatitude = data.latitude;
        currentLongitude = data.longitude;
      }
    }

    if(stores){

      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Button
              onPress={() => this.props.navigation.goBack()}
              title="Terug"
              color="#841584"
            />
            <Text>Kaart</Text>
          </View>
          <MapView
            style={styles.map}
            region={{
              latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004,
            }}
          >

            {stores.map(store => (
              <Marker
                key={store._id}
                coordinate = {{
                  latitude: JSON.parse(store.location)[0].latitude,
                  longitude: JSON.parse(store.location)[0].longitude,
                  latitudeDelta: 0.004,
                  longitudeDelta: 0.004,
                }}
                title={store.store}
                description={store.street}
                onPress={() => {
                  navigate(`MapDetail`, { ...store });
                }}
              />
            ))}

          </MapView>
          <Text style={styles.paragraph}>{text}</Text>
          <Navbar navigate={this.props.navigation}/>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Button
              onPress={() => this.props.navigation.goBack()}
              title="Terug"
              color="#841584"
            />
            <Text>Kaart</Text>
          </View>
          <MapView
            style={styles.map}
            region={{
              latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004,
            }}
          >

          </MapView>
          <Text style={styles.paragraph}>{text}</Text>
          <Navbar navigate={this.props.navigation}/>
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    zIndex: 3,
    backgroundColor: '#fff',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
