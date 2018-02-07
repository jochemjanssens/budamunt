import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight, Platform} from 'react-native';
import { Constants, Location, Permissions } from 'expo';

import App from '../App';
import Navbar from './Navbar';

export default class HomeScreen extends React.Component {

  state = {
    token: null,
    logout: false,
    volunteers: null,
    location: null,
    errorMessage: null,
  };

  async componentWillMount() {
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
          fetch(`http://192.168.1.59:3000/api/me?isActive=true`, {headers})
            .then(user => {
              const userContent = user._bodyText;
              AsyncStorage.setItem("user", userContent);
              fetch(`http://192.168.1.59:3000/api/balances?isActive=true`, {headers})
                .then(r => {
                  const balances = JSON.parse(r._bodyText).balances;
                  balances.forEach(balance => {
                    if(JSON.parse(userContent)._id === balance.userId){
                      console.log("found");
                      this.setState({ munten: balance.munten});
                      AsyncStorage.setItem("muntenId", balance._id);
                      AsyncStorage.setItem("munten", balance.munten);
                      fetch(`http://192.168.1.59:3000/api/volunteers?isActive=true`, {headers})
                        .then(r => {
                          this.setState({'volunteers': JSON.parse(r._bodyText).volunteers});
                        })
                        .catch(err => console.error(err));
                    }
                  });
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }).done();
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

  handleLogout = () => {
    console.log('logout');
    AsyncStorage.setItem("myToken", '');
    this.setState({ logout: true });
  }

  render() {
    const { logout, munten, volunteers } = this.state;
    const { navigate } = this.props.navigation;

    let onBuda = false;

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      let data = this.state.location.coords;
      if(data.latitude > 50.829535 && data.latitude < 50.830430 && data.longitude > 3.264559 && data.longitude < 3.265707){
        currentLatitude = data.latitude;
        currentLongitude = data.longitude;
        onBuda = true;
        console.log(currentLatitude);
        console.log(currentLongitude);
      }else{
        console.log("notOnBuda");
      }
    }

    if(logout){
      return (
        <App />
      )
    }

    if(onBuda){
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>{munten} CARPELS</Text>
            <Button
              title='MELD AF'
              onPress={this.handleLogout}
            />
            <Button
              title='HELP'
              onPress={() => navigate('Support')}
            />
            <Button
              title='Kaart'
              onPress={() => navigate('Kaart')}
            />
          </View>
          <View style={styles.cta}>
            <Text>Partner in de buurt</Text>
            <Text>Comming soon...</Text>
          </View>
          <Button
            title='Bekijk Transacties'
            onPress={() => navigate('Transactions')}
          />
          <Button
            title='Betalen'
            onPress={() => navigate('Pay')}
          />
          <Button
            title='Ontvangen'
            onPress={() => navigate('Receive')}
          />
          <Navbar navigate={this.props.navigation}/>
        </View>
      );
    } else {
      if(volunteers){
        const volunteer = volunteers[volunteers.length-1];
        if(volunteer){
          return (
            <View style={styles.container}>
              <View style={styles.header}>
                <Text>{munten} CARPELS</Text>
                <Button
                  title='MELD AF'
                  onPress={this.handleLogout}
                />
                <Button
                  title='HELP'
                  onPress={() => navigate('Support')}
                />
                <Button
                  title='Kaart'
                  onPress={() => navigate('Kaart')}
                />
              </View>
              <View style={styles.cta}>
                <Text>Vrijwilligerswerk</Text>

                <View key={volunteer._id} style={styles.item}>
                  <Text>{volunteer.name}</Text>
                  <Text>{volunteer.location} | {volunteer.starttime}-{volunteer.endtime} | {volunteer.date}</Text>
                  <Text>{volunteer.description}</Text>
                </View>
                <Button
                  title='Bekijk meer'
                  onPress={() => navigate('Vrijwilligerswerk')}
                />
              </View>
              <Button
                title='Bekijk Transacties'
                onPress={() => navigate('Transactions')}
              />
              <Button
                title='Betalen'
                onPress={() => navigate('Pay')}
              />
              <Button
                title='Ontvangen'
                onPress={() => navigate('Receive')}
              />
              <Navbar navigate={this.props.navigation}/>
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
              <View style={styles.header}>
                <Text>{munten} CARPELS</Text>
                <Button
                  title='MELD AF'
                  onPress={this.handleLogout}
                />
                <Button
                  title='HELP'
                  onPress={() => navigate('Support')}
                />
                <Button
                  title='Kaart'
                  onPress={() => navigate('Kaart')}
                />
              </View>
              <Button
                title='Bekijk Transacties'
                onPress={() => navigate('Transactions')}
              />
              <Button
                title='Betalen'
                onPress={() => navigate('Pay')}
              />
              <Button
                title='Ontvangen'
                onPress={() => navigate('Receive')}
              />
              <Navbar navigate={this.props.navigation}/>
            </View>
          );
        }
      } else {
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text>{munten} CARPELS</Text>
              <Button
                title='MELD AF'
                onPress={this.handleLogout}
              />
              <Button
                title='HELP'
                onPress={() => navigate('Support')}
              />
              <Button
                title='Kaart'
                onPress={() => navigate('Kaart')}
              />
            </View>
            <Button
              title='Bekijk Transacties'
              onPress={() => navigate('Transactions')}
            />
            <Button
              title='Betalen'
              onPress={() => navigate('Pay')}
            />
            <Button
              title='Ontvangen'
              onPress={() => navigate('Receive')}
            />
            <Navbar navigate={this.props.navigation}/>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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
