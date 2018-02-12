import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, ScrollView, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Navbar from './Navbar';
export default class VolunteerPersonalScreen extends React.Component {
  state = {
    token: null,
    user: null,
    volunteers: null,
    applications: null
  };

  async componentWillMount() {
    AsyncStorage.getItem("myToken").then((token) => {
      this.setState({'token': token});

      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });

      fetch(`http://192.168.1.22:3000/api/volunteers?isActive=true`, {headers})
        .then(r => {
          this.setState({'volunteers': JSON.parse(r._bodyText).volunteers});
          fetch(`http://192.168.1.22:3000/api/applications`, {headers})
            .then(r => {
              this.setState({'applications': JSON.parse(r._bodyText).applications});
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    });

    AsyncStorage.getItem("user").then(user => {
      this.setState({'user': JSON.parse(user)});
    });
  }

  loadVolunteers = () => {
    AsyncStorage.getItem("myToken").then((token) => {
      if(token){
        const headers = new Headers({
          Authorization: `Bearer ${token}`
        });

        fetch(`http://192.168.1.22:3000/api/volunteers?isActive=true`, {headers})
          .then(r => {
            const { volunteers } = this.state;
            if(volunteers && r){
              if(volunteers.length !== JSON.parse(r._bodyText).volunteers.length){
                  this.setState({'volunteers': JSON.parse(r._bodyText).volunteers});
              }
            }
            fetch(`http://192.168.1.22:3000/api/applications`, {headers})
              .then(r => {
                const { applications } = this.state;
                if(applications && r){
                  if(applications.length !== JSON.parse(r._bodyText).applications.length){
                      this.setState({'applications': JSON.parse(r._bodyText).applications});
                  }
                }
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      }
    });
  }

  render() {
    setInterval(this.loadVolunteers, 1000);
    const { navigate } = this.props.navigation;

    const { volunteers, user, applications } = this.state;

    if(volunteers && user && applications){
      const volunteersArray = [];
      volunteers.map(volunteer => {
        //Delete past Events
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        if (dd < 10) {
          dd = `0${dd}`;
        }
        if (mm < 10) {
          mm = `0${mm}`;
        }
        today = `${yyyy}-${mm}-${dd}`;

        if (today > volunteer.date) {
          console.log(volunteer);
        }

        //Check type
        if(volunteer.userType === 'USER'){
          let added = false;
          volunteersArray.forEach((newEvent, key) => {
            if (volunteer.date < newEvent.date) {
              if (added === false) {
                volunteersArray.splice(key, 0, volunteer);
              }
              added = true;
            }
          });
          if (added === false) {
            volunteersArray.push(volunteer);
          }
        }
      });


      let counter = 0;

      if(volunteersArray.length !== 0){
        return (
          <View style={styles.container}>
            <View>
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
                <Text style={styles.maintitle}>VRIJWILLIGERS</Text>
                <TouchableHighlight
                  onPress={() => navigate('Messages')}
                >
                  <Image
                    source={require('../assets/volunteer/messages.png')}
                    style={{
                      width: 25,
                      height: 19,
                    }}
                  />
                </TouchableHighlight>
              </View>
              <View style={styles.buttons}>
                <TouchableHighlight
                  onPress={() => navigate('Vrijwilligerswerk')}
                >
                  <Text style={styles.smallButton}>ORGANISATORISCH AANBOD</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => navigate('newVolunteer')}
                >
                  <Text style={styles.smallButton}>DOE EEN AANVRAAG</Text>
                </TouchableHighlight>
              </View>
              <Image
                source={require('../assets/home/bigBorder.png')}
                style={{
                  width: '100%',
                  height: 12,
                }}
              />
            </View>
            <ScrollView style={styles.elementlijst}>
              {
                volunteersArray.map(
                  volunteer => {
                    let match = false;
                    applications.map(
                      application => {
                        if(application.volunteerId === volunteer._id && user._id === application.userId){
                          match = true;
                        }
                      }
                    )
                    let link = null;
                     if (user.email === volunteer.user) {
                        link = `ownVolunteerDetail`;
                     } else {
                       if(match){
                         link = `chosenVolunteerDetail`;
                       } else {
                         link = `VolunteerDetail`;
                       }
                     }

                     counter++;
                    console.log(link);

                    return(
                      <View key={volunteer._id} >
                        <TouchableHighlight style={styles.item} onPress={() => navigate(link, { ...volunteer })}>
                          <View style={(link === `ownVolunteerDetail`) ? styles.own : styles.other}>
                            <Text style={styles.itemtitle}>{volunteer.name}{`${(match === true) ? ' - INGESCHREVEN' : ""}`}</Text>
                            <Text>{volunteer.description}</Text>
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
                          </View>
                        </TouchableHighlight>
                        <Image
                          source={(counter % 2 === 0) ? require(`../assets/volunteer/grid2small.png`) : require(`../assets/volunteer/grid1small.png`)}
                          style={{
                            width: 114,
                            height: 66,
                            position: 'absolute',
                            top: `${48 + counter*2}%`,
                            left: `${((counter % 2)*60) + 2}%`,
                            zIndex: -10,
                          }}
                        />
                      </View>
                    );
                  }
                )
              }
              <View style={{height: 60}}></View>
            </ScrollView>
            <Navbar navigate={this.props.navigation}/>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <View>
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
                <Text style={styles.maintitle}>VRIJWILLIGERS</Text>
                <TouchableHighlight
                  onPress={() => navigate('Messages')}
                >
                  <Image
                    source={require('../assets/volunteer/messages.png')}
                    style={{
                      width: 25,
                      height: 19,
                    }}
                  />
                </TouchableHighlight>
              </View>
              <View style={styles.buttons}>
                <TouchableHighlight
                  onPress={() => navigate('Vrijwilligerswerk')}
                >
                  <Text style={styles.smallButton}>ORGANISATORISCH AANBOD</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => navigate('newVolunteer')}
                >
                  <Text style={styles.smallButton}>DOE EEN AANVRAAG</Text>
                </TouchableHighlight>
              </View>
              <Image
                source={require('../assets/home/bigBorder.png')}
                style={{
                  width: '100%',
                  height: 12,
                }}
              />
            </View>
              <Text style={styles.novolunteer}>Geen aanvragen</Text>
              <Navbar navigate={this.props.navigation}/>
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        <View>
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
            <Text style={styles.maintitle}>VRIJWILLIGERS</Text>
            <TouchableHighlight
              onPress={() => navigate('Messages')}
            >
              <Image
                source={require('../assets/volunteer/messages.png')}
                style={{
                  width: 25,
                  height: 19,
                }}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              onPress={() => navigate('Vrijwilligerswerk')}
            >
              <Text style={styles.smallButton}>ORGANISATORISCH AANBOD</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => navigate('newVolunteer')}
            >
              <Text style={styles.smallButton}>DOE EEN AANVRAAG</Text>
            </TouchableHighlight>
          </View>
          <Image
            source={require('../assets/home/bigBorder.png')}
            style={{
              width: '100%',
              height: 12,
            }}
          />
        </View>
          <Text style={styles.novolunteer}>Geen aanvragen</Text>
          <Navbar navigate={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: "100%",
  },
  newEvent: {
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  icon: {
    width: 26,
    height: 26,
  },
  item: {
    backgroundColor: '#FFF',
    borderColor: '#5A60FB',
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  lijst: {
    alignSelf: 'stretch',
  },
  own: {
    backgroundColor: '#FEDAD2',
    padding: 10,
  },
  other: {
    padding: 10,
  },
  maintitle: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 20,
  },
  smallButton: {
    backgroundColor: '#5A60FB',
    color: '#FFF',
    fontWeight: '700',
    fontSize: 11,
    padding: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemtitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#43454E',
  },
  volunteerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 10,
  },
  volunteerInfoSmall: {
    flexDirection: 'row',
  },
  volunteerInfoText: {
    marginLeft: 4,
    marginRight: 16,
    fontSize: 12,
  },
  novolunteer: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#5A60FB',
    paddingTop: 160,
    fontSize: 16,
  }
});
