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
        <TouchableHighlight onPress={() => this.navigate.navigate('Home')}>
          <Image
            style={styles.button}
            source={require('../assets/icons/community.png')}

            source={(page === 'Home') ? require('../assets/icons/home-active.png') : require('../assets/icons/home.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate.navigate('Community')}>
          <Image
            style={styles.button}
            source={(page === 'Community') ? require('../assets/icons/community-active.png') : require('../assets/icons/community.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate.navigate('Winkel')}>
          <Image
            style={styles.button}
            source={(page === 'Winkel') ? require('../assets/icons/shop-active.png') : require('../assets/icons/shop.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate.navigate('Vrijwilligerswerk')}>
          <Image
            style={styles.button}
            source={(page === 'Vrijwilligerswerk') ? require('../assets/icons/volunteer-active.png') : require('../assets/icons/volunteer.png')}

          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.navigate.navigate('Evenementen')}>
          <Image
            style={styles.button}
            source={(page === 'Evenementen') ? require('../assets/icons/events-active.png') : require('../assets/icons/events.png')}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: 300,
    backgroundColor: '#fff',
  },
});
