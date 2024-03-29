import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight, Platform, ScrollView} from 'react-native';
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
    stores: null,
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
          fetch(`http://172.20.66.6:3000/api/me?isActive=true`, {headers})
            .then(user => {
              const userContent = user._bodyText;
              AsyncStorage.setItem("user", userContent);
              fetch(`http://172.20.66.6:3000/api/balances?isActive=true`, {headers})
                .then(r => {
                  const balances = JSON.parse(r._bodyText).balances;
                  balances.forEach(balance => {
                    if(JSON.parse(userContent)._id === balance.userId){
                      this.setState({ munten: balance.munten});
                      AsyncStorage.setItem("muntenId", balance._id);
                      AsyncStorage.setItem("munten", balance.munten);
                      fetch(`http://172.20.66.6:3000/api/volunteers?isActive=true`, {headers})
                        .then(r => {
                          this.setState({'volunteers': JSON.parse(r._bodyText).volunteers});
                          fetch(`http://172.20.66.6:3000/api/stores?isActive=true`, {headers})
                            .then(r => {
                              this.setState({'stores': JSON.parse(r._bodyText).stores});
                            })
                            .catch(err => console.error(err));
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
    const { logout, munten, volunteers, stores } = this.state;
    const { navigate } = this.props.navigation;

    let onBuda = false;

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      let data = this.state.location.coords;
      if(data.latitude > 50.829535 && data.latitude < 50.834446 && data.longitude > 3.259348 && data.longitude < 3.270361){
        currentLatitude = data.latitude;
        currentLongitude = data.longitude;
        onBuda = true;
      }
    }

    let nearbyStore = 'empty';
    let nearbyAdres = 'adres';
    if(stores){
      nearbyStore = stores[1].store;
      nearbyAdres = `${stores[1].street} Kortrijk`;
    }else{
      nearbyStore = 'Budascoop';
      nearbyAdres = `Kapucijnenstraat 10 Kortrijk`;
    }

    if(logout){
      return (
        <App />
      )
    }

    if(onBuda){
      return (
        <View style={styles.container}>
          <View>
            <View style={styles.header}>
              <TouchableHighlight onPress={this.handleLogout} underlayColor="white">
                <Image
                  source={require('../assets/home/logout.png')}
                  style={{
                    width: 23,
                    height: 26,
                  }}
                />
              </TouchableHighlight>
              <Text style={styles.maintitle}>{munten} CARPELS</Text>
              <TouchableHighlight onPress={() => navigate('Kaart')} underlayColor="white">
                <Image
                  source={require('../assets/home/map.png')}
                  style={{
                    width: 21,
                    height: 29,
                  }}
                />
              </TouchableHighlight>
            </View>
            <Image
              source={require('../assets/home/bigBorder.png')}
              style={{
                width: '100%',
                height: 12,
              }}
            />
            <Image
              source={require('../assets/home/carpelGraphic.png')}
              style={styles.graphic}
            />
          </View>
          <ScrollView style={styles.content}>

            <View style={styles.cta}>
              <View style={styles.vrijwilligerswerktitel}>
                <Text style={styles.bigtitle}>WINKEL IN DE BUURT</Text>
                <TouchableHighlight onPress={() => navigate('Support')} underlayColor="white">
                  <Image
                    source={require('../assets/home/infoButton.png')}
                    style={{
                      width: 27,
                      height: 27,
                    }}
                  />
                </TouchableHighlight>
              </View>

              <View style={styles.item}>
                <Text style={styles.actionTitle}>{nearbyStore}</Text>
                <Text style={styles.actionText}>Bij budascoop kan je genieten van een gratis popcorn bij aankoop van een ticket voor 6 budamunten.</Text>
              </View>
              <Image
                source={require('../assets/home/borderMid.png')}
                style={{
                  width: '90%',
                  height: 15,
                  marginHorizontal: '5%',
                  marginTop: 10,
                }}
              />
              <TouchableHighlight onPress={() => navigate('Kaart')} underlayColor="white">
                <Text style={styles.showmore}>BEKIJK MEER</Text>
              </TouchableHighlight>
            </View>

            <TouchableHighlight onPress={() => navigate('Transactions')}  underlayColor="white">
              <Text style={styles.transactionbutton}>BEKIJK TRANSACTIES</Text>
            </TouchableHighlight>

            <View style={styles.buttons}>
              <TouchableHighlight onPress={() => navigate('Pay')} style={styles.buttonElement} underlayColor="white">
                <View style={styles.bigButton}>
                  <Image
                    source={require('../assets/home/betalen.png')}
                    style={styles.icon1}
                  />
                  <Text style={styles.button}>BETALEN</Text>
                </View>
              </TouchableHighlight>


              <TouchableHighlight onPress={() => navigate('Receive')} style={styles.buttonElement} underlayColor="white">
                <View style={styles.bigButton}>
                  <Image
                    source={require('../assets/home/ontvangen.png')}
                    style={styles.icon2}
                  />
                  <Text style={styles.button}>ONTVANGEN</Text>
                </View>
              </TouchableHighlight>
              <Image
                source={require('../assets/general/grid3.png')}
                style={styles.grid1}
              />
              <Image
                source={require('../assets/general/grid2.png')}
                style={styles.grid2}
              />
            </View>
            <View style={{
              height: 100,
            }}></View>
          </ScrollView>

          <Navbar navigate={this.props.navigation}/>
        </View>
      );
    } else {
      if(volunteers){
        const volunteer = volunteers[volunteers.length-1];
        if(volunteer){
          return (
            <View style={styles.container}>
              <View>
                <View style={styles.header}>
                  <TouchableHighlight onPress={this.handleLogout} underlayColor="white">
                    <Image
                      source={require('../assets/home/logout.png')}
                      style={{
                        width: 23,
                        height: 26,
                      }}
                    />
                  </TouchableHighlight>
                  <Text style={styles.maintitle}>{munten} CARPELS</Text>
                  <TouchableHighlight onPress={() => navigate('Kaart')} underlayColor="white">
                    <Image
                      source={require('../assets/home/map.png')}
                      style={{
                        width: 21,
                        height: 29,
                      }}
                    />
                  </TouchableHighlight>
                </View>
                <Image
                  source={require('../assets/home/bigBorder.png')}
                  style={{
                    width: '100%',
                    height: 12,
                  }}
                />
                <Image
                  source={require('../assets/home/carpelGraphic.png')}
                  style={styles.graphic}
                />
              </View>
              <ScrollView style={styles.content}>
                <View style={styles.cta}>
                  <View style={styles.vrijwilligerswerktitel}>
                    <Text style={styles.bigtitle}>VRIJWILLIGERSWERK</Text>
                    <TouchableHighlight onPress={() => navigate('Support')} underlayColor="white">
                      <Image
                        source={require('../assets/home/infoButton.png')}
                        style={{
                          width: 27,
                          height: 27,
                        }}
                      />
                    </TouchableHighlight>
                  </View>

                  <View key={volunteer._id} style={styles.item}>
                    <Text style={styles.volunteerTitle}>{volunteer.name}</Text>
                    <View style={styles.volunteerInfo}>
                      <View style={styles.volunteerInfoSmall}>
                        <Image
                          source={require('../assets/home/location.png')}
                          style={{
                            width: 15,
                            height: 22,
                          }}
                        />
                        <Text style={styles.volunteerInfoText}>{volunteer.location}</Text>
                      </View>
                      <View style={styles.volunteerInfoSmall}>
                        <Image
                          source={require('../assets/home/time.png')}
                          style={{
                            width: 20,
                            height: 21,
                          }}
                        />
                        <Text style={styles.volunteerInfoText}>{volunteer.starttime}-{volunteer.endtime}</Text>
                      </View>
                      <View style={styles.volunteerInfoSmall}>
                        <Image
                          source={require('../assets/home/date.png')}
                          style={{
                            width: 19,
                            height: 20,
                          }}
                        />
                        <Text style={styles.volunteerInfoText}>{volunteer.date}</Text>
                      </View>
                    </View>
                    <Text>{volunteer.description.substring(0,80)}</Text>
                  </View>
                  <Image
                    source={require('../assets/home/borderMid.png')}
                    style={{
                      width: '90%',
                      height: 15,
                      marginHorizontal: '5%',
                      marginTop: 10,
                    }}
                  />
                  <TouchableHighlight onPress={() => navigate('Vrijwilligerswerk')} underlayColor="white">
                    <Text style={styles.showmore}>BEKIJK MEER</Text>
                  </TouchableHighlight>
                </View>

                <TouchableHighlight onPress={() => navigate('Transactions')}  underlayColor="white">
                  <Text style={styles.transactionbutton}>BEKIJK TRANSACTIES</Text>
                </TouchableHighlight>

                <View style={styles.buttons}>
                  <TouchableHighlight onPress={() => navigate('Pay')} style={styles.buttonElement} underlayColor="white">
                    <View style={styles.bigButton}>
                      <Image
                        source={require('../assets/home/betalen.png')}
                        style={styles.icon1}
                      />
                      <Text style={styles.button}>BETALEN</Text>
                    </View>
                  </TouchableHighlight>


                  <TouchableHighlight underlayColor="white" onPress={() => navigate('Receive')} style={styles.buttonElement}>
                    <View style={styles.bigButton}>
                      <Image
                        source={require('../assets/home/ontvangen.png')}
                        style={styles.icon2}
                      />
                      <Text style={styles.button}>ONTVANGEN</Text>
                    </View>
                  </TouchableHighlight>
                  <Image
                    source={require('../assets/general/grid3.png')}
                    style={styles.grid1}
                  />
                  <Image
                    source={require('../assets/general/grid2.png')}
                    style={styles.grid2}
                  />
                </View>
                <View style={{
                  height: 100,
                }}></View>
              </ScrollView>
              <Navbar navigate={this.props.navigation}/>
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
              <View>
                <View style={styles.header}>
                  <TouchableHighlight onPress={this.handleLogout} underlayColor="white">
                    <Image
                      source={require('../assets/home/logout.png')}
                      style={{
                        width: 23,
                        height: 26,
                      }}
                    />
                  </TouchableHighlight>
                  <Text style={styles.maintitle}>{munten} CARPELS</Text>
                  <TouchableHighlight onPress={() => navigate('Kaart')} underlayColor="white">
                    <Image
                      source={require('../assets/home/map.png')}
                      style={{
                        width: 21,
                        height: 29,
                      }}
                    />
                  </TouchableHighlight>
                </View>
                <Image
                  source={require('../assets/home/bigBorder.png')}
                  style={{
                    width: '100%',
                    height: 12,
                  }}
                />
                <Image
                  source={require('../assets/home/carpelGraphic.png')}
                  style={styles.graphic}
                />
              </View>
              <View style={styles.content}>
                <Text style={styles.errorText}>nog geen vrijwilligerswerk</Text>

                <TouchableHighlight onPress={() => navigate('Transactions')}  underlayColor="white">
                  <Text style={styles.transactionbutton}>BEKIJK TRANSACTIES</Text>
                </TouchableHighlight>

                <View style={styles.buttons}>
                  <TouchableHighlight onPress={() => navigate('Pay')} style={styles.buttonElement} underlayColor="white">
                    <View style={styles.bigButton}>
                      <Image
                        source={require('../assets/home/betalen.png')}
                        style={styles.icon1}
                      />
                      <Text style={styles.button}>BETALEN</Text>
                    </View>
                  </TouchableHighlight>


                  <TouchableHighlight onPress={() => navigate('Receive')} style={styles.buttonElement} underlayColor="white">
                    <View style={styles.bigButton}>
                      <Image
                        source={require('../assets/home/ontvangen.png')}
                        style={styles.icon2}
                      />
                      <Text style={styles.button}>ONTVANGEN</Text>
                    </View>
                  </TouchableHighlight>
                  <Image
                    source={require('../assets/general/grid3.png')}
                    style={styles.grid1}
                  />
                  <Image
                    source={require('../assets/general/grid2.png')}
                    style={styles.grid2}
                  />
                </View>
              </View>

              <Navbar navigate={this.props.navigation}/>
            </View>
          );
        }
      } else {
        return (
          <View style={styles.container}>
            <View>
              <View style={styles.header}>
                <TouchableHighlight onPress={this.handleLogout} underlayColor="white">
                  <Image
                    source={require('../assets/home/logout.png')}
                    style={{
                      width: 23,
                      height: 26,
                    }}
                  />
                </TouchableHighlight>
                <Text style={styles.maintitle}>{munten} CARPELS</Text>
                <TouchableHighlight onPress={() => navigate('Kaart')} underlayColor="white">
                  <Image
                    source={require('../assets/home/map.png')}
                    style={{
                      width: 21,
                      height: 29,
                    }}
                  />
                </TouchableHighlight>
              </View>
              <Image
                source={require('../assets/home/bigBorder.png')}
                style={{
                  width: '100%',
                  height: 12,
                }}
              />
              <Image
                source={require('../assets/home/carpelGraphic.png')}
                style={styles.graphic}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.errorText}>nog geen vrijwilligerswerk</Text>

              <TouchableHighlight onPress={() => navigate('Transactions')} underlayColor="white">
                <Text style={styles.transactionbutton}>BEKIJK TRANSACTIES</Text>
              </TouchableHighlight>

              <View style={styles.buttons}>
                <TouchableHighlight onPress={() => navigate('Pay')} style={styles.buttonElement} underlayColor="white">
                  <View style={styles.bigButton}>
                    <Image
                      source={require('../assets/home/betalen.png')}
                      style={styles.icon1}
                    />
                    <Text style={styles.button}>BETALEN</Text>
                  </View>
                </TouchableHighlight>


                <TouchableHighlight onPress={() => navigate('Receive')} style={styles.buttonElement} underlayColor="white">
                  <View style={styles.bigButton}>
                    <Image
                      source={require('../assets/home/ontvangen.png')}
                      style={styles.icon2}
                    />
                    <Text style={styles.button}>ONTVANGEN</Text>
                  </View>
                </TouchableHighlight>
                <Image
                  source={require('../assets/general/grid3.png')}
                  style={styles.grid1}
                />
                <Image
                  source={require('../assets/general/grid2.png')}
                  style={styles.grid2}
                />
              </View>
            </View>

            <Navbar navigate={this.props.navigation}/>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: "100%",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  maintitle: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 22,
  },
  bigtitle: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 20,
    paddingLeft: 20,
    paddingVertical: 10,
  },
  transactionbutton: {
    borderColor: '#5A60FB',
    borderWidth: 1,
    fontSize: 14,
    color: '#5A60FB',
    fontWeight: '700',
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 30,
    marginBottom: 40,
    width: 220,
    textAlign: 'center',
    alignSelf: 'center',
  },
  bigButton: {
    borderWidth: 2,
    borderColor: '#5A60FB',
    backgroundColor: 'white',
    paddingTop: 30,
    height: 148,
  },
  buttonElement: {
    width: '40%',
  },
  icon1: {
    marginLeft: "28%",
    marginBottom: 32,
    width: 69,
    height: 40,
  },
  icon2: {
    marginLeft: "36%",
    marginBottom: 10,
    width: 38,
    height: 62,
  },
  button: {
    color: 'white',
    backgroundColor: '#5A60FB',
    fontSize: 13,
    fontWeight: 'bold',
    paddingVertical: 14,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  buttons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginTop: 50,
  },
  grid1: {
    position: 'absolute',
    zIndex: -1,
    left: 5,
    bottom: 68,
    width: 95,
    height: 95,
  },
  grid2: {
    position: 'absolute',
    zIndex: -1,
    right: 5,
    bottom: 68,
    width: 95,
    height: 95,
  },
  showmore: {
    fontWeight: '700',
    fontSize: 14,
    color: '#5A60FB',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  item: {
    paddingHorizontal: 20,
  },
  cta: {
    marginBottom: 20,
    marginTop: 50,
  },
  ctaText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#5A60FB',
  },
  volunteerTitle: {
    fontWeight:'700',
    fontSize: 14,
  },
  volunteerInfo: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 16     ,
  },
  volunteerInfoSmall: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volunteerInfoText: {
    marginLeft: 5,
    marginRight: 20,
  },
  carpelcount: {
    fontSize: 20,
    color: '#5A60FB',
    fontWeight: '700',
  },
  graphic: {
    position: 'absolute',
    zIndex: -1,
    left: 140,
    top: 35,
    width: 116,
    height: 31,
  },
  vrijwilligerswerktitel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  errorText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#5A60FB',
    textAlign: 'center',
    paddingTop: 100,
    paddingBottom: 50,
  },
  volunteerText: {
    fontSize: 16,
    paddingTop: 10,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5A60FB',
  },
  actionText: {
    paddingVertical: 10,
  },
  actions: {
    fontSize: 16,
    paddingTop: 10,
  }
});
