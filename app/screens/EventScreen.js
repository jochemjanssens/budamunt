import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Navbar from './Navbar';
export default class EventScreen extends React.Component {
  state = {
    token: null,
    user: null,
    events: null
  };

  async componentWillMount() {
    AsyncStorage.getItem("myToken").then((token) => {
      this.setState({'token': token});

      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });

      fetch(`http://192.168.1.22:3000/api/events?isActive=true`, {headers})
        .then(r => {
          this.setState({'events': JSON.parse(r._bodyText).events});
        })
        .catch(err => console.error(err));
    });

    AsyncStorage.getItem("user").then(user => {
      this.setState({'user': JSON.parse(user)});
    });
  }

  loadEvents = () => {
    AsyncStorage.getItem("myToken").then((token) => {
      if(token){
        const headers = new Headers({
          Authorization: `Bearer ${token}`
        });

        fetch(`http://192.168.1.22:3000/api/events?isActive=true`, {headers})
          .then(r => {
            const { events } = this.state;
            if(events && r){
              if(events.length !== JSON.parse(r._bodyText).events.length){
                  this.setState({'events': JSON.parse(r._bodyText).events});
              }
            }
          })
          .catch(err => console.error(err));
      }
    });
  }

  deleteEvent = event => {
    AsyncStorage.getItem("myToken").then(token => {
      const method = `DELETE`;
      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });
      const url = 'http://192.168.1.22:3000/api/events/' + event._id;
      fetch(url, {method, headers})
        .then(r => {
          this.props.navigation.goBack()
        })
        .catch(err => console.error(err));
    });
  }

  render() {
    setInterval(this.loadEvents, 1000);
    const { navigate } = this.props.navigation;

    const { events, user } = this.state;
    if(events && user){
      if(events.length !== 0){
        const eventsArray = [];
        events.map(event => {

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

          if (today > event.date) {
            this.deleteEvent(event);
          }

          let added = false;
          eventsArray.forEach((newEvent, key) => {
            if (event.date < newEvent.date) {
              if (added === false) {
                eventsArray.splice(key, 0, event);
              }
              added = true;
            }
          });
          if (added === false) {
            eventsArray.push(event);
          }
        });

        let counter = 0;

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
                <Text style={styles.maintitle}>EVENTS</Text>
                <TouchableHighlight
                  onPress={() => navigate('newEvent')}
                >
                  <Text style={styles.comfirm}>+</Text>
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
            <ScrollView style={styles.content}>
            {
              eventsArray.map(
                event => {
                  counter++;
                  return(
                    <View key={event._id}>
                      <TouchableHighlight
                        onPress={() => navigate(`${(user.email === event.user) ? 'ownEventDetail' : "EventDetail"}`, { ...event })}
                      >
                        <View style={styles.item}>
                          <View style={styles.titleitem}>
                            <Text style={styles.eventtitle}>{event.name.toUpperCase()}</Text>
                            <Text style={(user.email === event.user) ? styles.own : styles.other}>{(user.email === event.user) ? 'eigen event' : ''}</Text>
                          </View>
                          <Text>{event.description.substring(0,80)}...</Text>
                          <View style={styles.eventInfo}>
                            <View style={styles.eventInfoSmall}>
                              <Image
                                source={require('../assets/home/location.png')}
                                style={{
                                  width: 15,
                                  height: 22,
                                }}
                              />
                              <Text style={styles.eventInfoText}>{event.location}</Text>
                            </View>
                            <View style={styles.eventInfoSmall}>
                              <Image
                                source={require('../assets/home/time.png')}
                                style={{
                                  width: 20,
                                  height: 21,
                                }}
                              />
                              <Text style={styles.eventInfoText}>{event.starttime}-{event.endtime}</Text>
                            </View>
                            <View style={styles.eventInfoSmall}>
                              <Image
                                source={require('../assets/home/date.png')}
                                style={{
                                  width: 19,
                                  height: 20,
                                }}
                              />
                              <Text style={styles.eventInfoText}>{event.date}</Text>
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
                        top: `${54 + counter*2}%`,
                        left: `${((counter % 2)*60) + 4}%`,
                        zIndex: -1,
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
            <Text style={styles.maintitle}>EVENTS</Text>
            <TouchableHighlight
              onPress={() => navigate('newEvent')}
            >
              <Text style={styles.comfirm}>+</Text>
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
        <Text style={styles.emptyText}>Geen events</Text>
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
    fontSize: 20,
  },
  comfirm: {
    color: '#5A60FB',
    fontSize: 28,
    fontWeight: '700',
  },
  newEvent: {
    marginTop: 100,
  },
  item: {
    backgroundColor: '#FFF',
    borderColor: '#5A60FB',
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 30,
    marginBottom: 20,
  },
  content: {
    paddingTop: 30,
  },
  own: {
    color: '#5A60FB',
  },
  emptyText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#5A60FB',
    textAlign: 'center',
    marginTop: '50%',
  },
  eventInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 10,
  },
  eventInfoSmall: {
    flexDirection: 'row',
  },
  eventInfoText: {
    marginLeft: 4,
    marginRight: 16,
    fontSize: 12,
  },
  titleitem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventtitle: {
    color: '#5A60FB',
    fontWeight: '700',
    paddingBottom: 10,
  }
});
