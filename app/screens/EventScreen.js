import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import EventDetailScreen from './EventDetailScreen';
import ownEventDetailScreen from './ownEventDetailScreen';
import NewEvent from './NewEvent';


class EventScreen extends React.Component {
  state = {
    token: null,
    user: null,
    events: null
  };

  async componentWillMount() {
    AsyncStorage.getItem("myToken").then((token) => {
      this.setState({'token': token});

      //Get Events
      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });

      fetch(`http://192.168.1.5:3000/api/events?isActive=true`, {headers})
        .then(r => {
          this.setState({'events': JSON.parse(r._bodyText).events});
        })
        .catch(err => console.error(err));
    });

    AsyncStorage.getItem("user").then(user => {
      this.setState({'user': JSON.parse(user)});
      console.log(user);
    });
  }

  loadEvents = () => {
    AsyncStorage.getItem("myToken").then((token) => {
      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });

      fetch(`http://192.168.1.5:3000/api/events?isActive=true`, {headers})
        .then(r => {
          const { events } = this.state;
          if(events){
            if(events.length !== JSON.parse(r._bodyText).events.length){
                this.setState({'events': JSON.parse(r._bodyText).events});
            }
          }
        })
        .catch(err => console.error(err));
    });
  }


  render() {
    setInterval(this.loadEvents, 1000);
    const { navigate } = this.props.navigation;

    const { events, user } = this.state;
    if(events && user){
      return (
        <View style={styles.container}>
          {
            events.map(
              event => (
                console.log(event.user),
                <Button
                  onPress={() => navigate(`${(user.email === event.user) ? 'ownEventDetail' : "EventDetail"}`, { ...event })}
                  title={event.name}
                  key={event._id}
                  color={(user.email === event.user) ? '#FD9C27' : "#134D57"}
                />
              )
            )
          }
          <Button
            style={styles.newEvent}
            title='Maak nieuw event'
            onPress={() => navigate(`newEvent`)}
          />
        </View>
      );
    }


    return (
      <View style={styles.container}>
          <Text>Geen events</Text>
      </View>
    );
  }
}

export default class App extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Evenementen',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return <ListNavigation />;
  }
}

export const ListNavigation = StackNavigator({
  EventList: { screen: EventScreen },
  EventDetail: { screen: EventDetailScreen },
  ownEventDetail: { screen: ownEventDetailScreen },
  newEvent: { screen: NewEvent },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newEvent: {
    marginTop: 100,
  },
  icon: {
    width: 26,
    height: 26,
  },
  own: {
    color: '#ff0',
  },
  other: {
    backgroundColor: '#0f0',
  },
});
