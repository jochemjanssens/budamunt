import React from 'react';
import { StyleSheet, Text, View, Button, Image, Platform, AsyncStorage, ScrollView } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

import geolib from 'geolib';

import Navbar from './MapNavbar';

export default class MapScreen extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    stores: null,
    previewCount: 2
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

      fetch(`http://192.168.0.233:3000/api/stores`, {headers})
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

   showMore = () => {
     if(this.state.previewCount === 2){
       this.setState({previewCount: 5});
     } else {
       this.setState({previewCount: 2});
     }
  };



  render() {
    const { navigate } = this.props.navigation;
    const { stores, previewCount } = this.state;

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

    let ownLatitude = false;
    let ownLongitude = false;

    const storesArray = [];
    let nearbyStores;

    if(data !== 'empty'){
      //check aanwezig op buda
      if(data.latitude > 50.829535 && data.latitude < 50.830430 && data.longitude > 3.26454 && data.longitude < 3.265707){
        currentLatitude = data.latitude;
        currentLongitude = data.longitude;
      }
      ownLatitude = data.latitude;
      ownLongitude = data.longitude;

      if(stores){
        stores.map(store => {
          let added = false;
          storesArray.forEach((newStore, key) => {
            const storeDistance = geolib.getDistanceSimple(
              {latitude: JSON.parse(store.location)[0].latitude, longitude: JSON.parse(store.location)[0].longitude},
              {latitude: ownLatitude, longitude: ownLongitude}
            );
            const newstoreDistance = geolib.getDistanceSimple(
              {latitude: JSON.parse(newStore.location)[0].latitude, longitude: JSON.parse(newStore.location)[0].longitude},
              {latitude: ownLatitude, longitude: ownLongitude}
            );
            if (storeDistance < newstoreDistance) {
              if (added === false) {
                storesArray.splice(key, 0, store);
              }
              added = true;
            }
          });
          if (added === false) {
            storesArray.push(store);
          }
        });
        nearbyStores = storesArray.slice(0, previewCount);
      }
    }

    if(storesArray.length !== 0 && nearbyStores.length !== 0){
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
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            {storesArray.map(store => (
              <Marker
                key={store._id}
                coordinate = {{
                  latitude: JSON.parse(store.location)[0].latitude,
                  longitude: JSON.parse(store.location)[0].longitude,
                }}
                title={store.store}
                description={store.street}
              />
            ))}

          </MapView>

          <Text style={styles.paragraph}>{text}</Text>
          <View style={styles.bottom}>
            <Button
              style={styles.newEvent}
              title='Pijltje boven'
              onPress={() => this.showMore()}
            />
            <View style={styles.list}>
              {nearbyStores.map(store => (
                <Text
                  key={store._id}
                  style={styles.listItem}
                  onPress={() => {
                    navigate(`MapDetail`, { ...store });
                  }}
                >
                  {store.store} - {
                      geolib.getDistanceSimple(
                        {latitude: JSON.parse(store.location)[0].latitude, longitude: JSON.parse(store.location)[0].longitude},
                        {latitude: ownLatitude, longitude: ownLongitude}
                      )
                  }m
                </Text>
              ))}
            </View>
            <Navbar navigate={this.props.navigation}/>
          </View>
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
  bottom: {
    alignSelf: 'stretch',
  },
  list: {
    backgroundColor: '#fff',
  },
  listItem: {
    padding: 8,
    borderBottomColor: '#47315a',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
