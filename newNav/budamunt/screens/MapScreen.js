import React from 'react';
import { StyleSheet, Text, View, Button, Image, Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

import MapView from 'react-native-maps';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Map',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  state = {
      location: null,
      errorMessage: null,
    };

    componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
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
      if(data.latitude > 50.829535 && data.latitude < 50.830430 && data.longitude > 3.264549 && data.longitude < 3.265707){
        currentLatitude = data.latitude;
        currentLongitude = data.longitude;
      }
    }

    return (
      <View style={styles.container}>
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
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   paddingTop: Constants.statusBarHeight,
   backgroundColor: '#ecf0f1',
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
