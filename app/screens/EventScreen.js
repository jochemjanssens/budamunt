import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import EventDetailScreen from './EventDetailScreen';
import ownEventDetailScreen from './ownEventDetailScreen';


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

      fetch(`http://172.20.66.20:3000/api/events?isActive=true`, {headers})
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

  render() {
    const { navigate } = this.props.navigation;

    const { events, user } = this.state;
    if(events){
      console.log(user.email);
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
                  color={(user.email === event.user) ? '#ECF838' : "#134D57"}
                />
              )
            )
          }
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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
