import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight } from 'react-native';

import Navbar from './Navbar';

export default class ownVolunteerDetailScreen extends React.Component {

  deleteVolunteer = () => {
    const { params } = this.props.navigation.state;

    AsyncStorage.getItem("myToken").then(token => {
      const method = `DELETE`;
      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });
      const url = 'http://192.168.1.40:3000/api/volunteers/' + params._id;
      fetch(url, {method, headers})
        .then(r => {
          this.props.navigation.goBack()
        })
        .catch(err => console.error(err));
    });
  }

  changeVolunteer = () => {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    navigate('EditVolunteer', { data: params })
  }

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
              underlayColor="white"
            >
              <Image
                source={require('../assets/general/back.png')}
                style={{
                  width: 15,
                  height: 23,
                }}
              />
            </TouchableHighlight>
            <Text style={styles.maintitle}>TRANSACTIES</Text>
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
          <Text style={styles.volunteerName}>{params.name}</Text>
          <Image
            source={require('../assets/volunteer/backDetail.png')}
            style={styles.volunteerNameImg}
          />

          <View style={styles.volunteerInfo}>
            <View style={styles.volunteerInfoSmall}>
              <Image
                source={require('../assets/home/location.png')}
                style={{
                  width: 15,
                  height: 22,
                }}
              />
              <Text style={styles.volunteerInfoText}>{params.location}</Text>
            </View>
            <View style={styles.volunteerInfoSmall}>
              <Image
                source={require('../assets/home/time.png')}
                style={{
                  width: 20,
                  height: 21,
                }}
              />
              <Text style={styles.volunteerInfoText}>{params.starttime}-{params.endtime}</Text>
            </View>
            <View style={styles.volunteerInfoSmall}>
              <Image
                source={require('../assets/home/date.png')}
                style={{
                  width: 19,
                  height: 20,
                }}
              />
              <Text style={styles.volunteerInfoText}>{params.date}</Text>
            </View>
          </View>

          <Text style={styles.description}>{params.description}</Text>

          <Text>Je krijgt hier {params.munten} Carpels voor</Text>
          <View style={styles.volunteerButtons}>
            <TouchableHighlight onPress={this.changeVolunteer} underlayColor="white">
              <Text style={styles.button}>WIJZIG VRIJWILLIGERSWERK</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.deleteVolunteer} underlayColor="white">
              <Text style={styles.button}>VERWIJDER VRIJWILLIGERSWERK</Text>
            </TouchableHighlight>
          </View>
        </View>
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
  button: {
    color: 'white',
    backgroundColor: '#5A60FB',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 14,
    paddingHorizontal: 50,
    textAlign: 'center',
    marginVertical: 6,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 52,
    left: 30,
  },
  volunteerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingBottom: 10,
    paddingTop: 40,
  },
  volunteerInfoSmall: {
    flexDirection: 'row',
  },
  volunteerInfoText: {
    marginLeft: 4,
    marginRight: 16,
    fontSize: 12,
  },
  volunteerName: {
    fontWeight: '700',
    color: '#5A60FB',
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  volunteerNameImg: {
    width: 113,
    height: 43,
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: -5,
  },
  volunteerButtons: {
    marginTop: 60,
  }
});
