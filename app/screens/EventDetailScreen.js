import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight } from 'react-native';

import Navbar from './Navbar';

export default class EventDetailScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

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
          </View>
          <Image
            source={require('../assets/home/bigBorder.png')}
            style={{
              width: '100%',
              height: 12,
            }}
          />
        </View>
        <View style={styles.content}>
          <Image
            source={require('../assets/volunteer/event.jpg')}
            style={{
              width: 300,
              height: 150,
            }}
          />
          <Text style={styles.title}>{params.name.toUpperCase()}</Text>
          <Text>{params.description}</Text>

          <View style={styles.eventInfo}>
            <View style={styles.eventInfoSmall}>
              <Image
                source={require('../assets/home/location.png')}
                style={{
                  width: 15,
                  height: 22,
                }}
              />
              <Text style={styles.eventInfoText}>{params.location}</Text>
            </View>
            <View style={styles.eventInfoSmall}>
              <Image
                source={require('../assets/home/time.png')}
                style={{
                  width: 20,
                  height: 21,
                }}
              />
              <Text style={styles.eventInfoText}>{params.starttime}-{params.endtime}</Text>
            </View>
            <View style={styles.eventInfoSmall}>
              <Image
                source={require('../assets/home/date.png')}
                style={{
                  width: 19,
                  height: 20,
                }}
              />
              <Text style={styles.eventInfoText}>{params.date}</Text>
            </View>
          </View>
        </View>

        <Navbar navigate={this.props.navigation}/>

        <Image
          source={require('../assets/volunteer/backDetail.png')}
          style={styles.detail}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: "100%",
  },
  maintitle: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 20,
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 52,
    left: 30,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    color: 'white',
    backgroundColor: '#5A60FB',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 14,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  title: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 30,
  },
  content: {
    padding: 30,
  },
  eventInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 20,
  },
  eventInfoSmall: {
    flexDirection: 'row',
  },
  eventInfoText: {
    marginLeft: 4,
    marginRight: 16,
    fontSize: 12,
  },
  detail: {
    width: 113,
    height: 43,
    position: 'absolute',
    top: 296,
    left: 20,
    zIndex: -1,
  }
});
