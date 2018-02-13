import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight } from 'react-native';

export default class Navbar extends React.Component {
  constructor(navigation){
    super();
    this.navigate = navigation.navigate;
    this.route = navigation.navigate.state.routeName
  }

  render() {
    //Fix subpaginas
    let page = this.route;
    if(page === 'VolunteerPersonalScreen' || page === 'VolunteerDetail' || page === 'ownVolunteerDetail' || page === 'Messages'){
      page = 'Vrijwilligerswerk';
    }
    if(page === 'ownEventDetail' || page === 'EventDetail'){
      page = 'Evenementen';
    }
    if(page === 'Transactions'){
      page = 'Home';
    }
    if(page === 'CommunityDetail'){
      page = 'Community';
    }

    return (
      <View style={styles.navbar}>
        <TouchableHighlight onPress={() => this.navigate.navigate('Home')}  underlayColor="white">
          <Image
            style={styles.button1}

            source={(page === 'Home') ? require('../assets/icons/home-active.png') : require('../assets/icons/home.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate.navigate('Community')}  underlayColor="white">
          <Image
            style={styles.button2}
            source={(page === 'Community') ? require('../assets/icons/community-active.png') : require('../assets/icons/community.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate.navigate('Vrijwilligerswerk')}  underlayColor="white">
          <Image
            style={styles.button3}
            source={(page === 'Vrijwilligerswerk') ? require('../assets/icons/volunteer-active.png') : require('../assets/icons/volunteer.png')}

          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate.navigate('Evenementen')}  underlayColor="white">
          <Image
            style={styles.button4}
            source={(page === 'Evenementen') ? require('../assets/icons/events-active.png') : require('../assets/icons/events.png')}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button1: {
    width: 32,
    height: 30,
  },
  button2: {
    width: 35,
    height: 32,
  },
  button3: {
    width: 38,
    height: 31,
  },
  button4: {
    width: 29,
    height: 28,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#4A90E2',
    paddingVertical: 8,
  },
});
