import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Navbar from './Navbar';
export default class VolunteerScreen extends React.Component {
  state = {
    token: null,
    user: null,
    volunteers: null,
  };

  async componentWillMount() {
    AsyncStorage.getItem("myToken").then((token) => {
      this.setState({'token': token});

      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });

      fetch(`http://192.168.1.45:3000/api/volunteers?isActive=true`, {headers})
        .then(r => {
          this.setState({'volunteers': JSON.parse(r._bodyText).volunteers});
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

        fetch(`http://192.168.1.45:3000/api/volunteers?isActive=true`, {headers})
          .then(r => {
            const { volunteers } = this.state;
            if(volunteers && r){
              if(volunteers.length !== JSON.parse(r._bodyText).volunteers.length){
                  this.setState({'volunteers': JSON.parse(r._bodyText).volunteers});
              }
            }
          })
          .catch(err => console.error(err));
      }
    });
  }

  deleteVolunteer = volunteer => {
    AsyncStorage.getItem("myToken").then(token => {
      const method = `DELETE`;
      const headers = new Headers({
        Authorization: `Bearer ${token}`
      });
      const url = 'http://192.168.1.45:3000/api/volunteers/' + volunteer._id;
      fetch(url, {method, headers})
        .then(r => {
          this.props.navigation.goBack()
        })
        .catch(err => console.error(err));
    });
  }

  render() {
    setInterval(this.loadVolunteers, 1000);
    const { navigate } = this.props.navigation;

    const { volunteers, user } = this.state;

    if(volunteers && user){
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
          this.deleteVolunteer(volunteer);
        }

        //Check type
        if(volunteer.userType === 'ORGANISATIE'){
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
      if(volunteersArray.length !== 0){
        return (
          <View style={styles.container}>
            <Text>Vrijwilligerswerk organisatorisch</Text>
            <Button
              style={styles.newEvent}
              title='Bekijk persoonlijk aanbod'
              onPress={() => navigate('VolunteerPersonalScreen')}
            />
            {
              volunteersArray.map(
                volunteer => (
                  <View key={volunteer._id} style={styles.item}>
                    <Text>{volunteer.name}</Text>
                    <Text>{volunteer.description}</Text>
                    <Text>{volunteer.date}</Text>
                    <Button
                      onPress={() => navigate(`${(user.email === volunteer.user) ? 'ownVolunteerDetail' : "VolunteerDetail"}`, { ...volunteer })}
                      title='open'
                      color={(user.email === volunteer.user) ? '#FD9C27' : "#134D57"}
                    />
                  </View>
                )
              )
            }
            <Button
              style={styles.newEvent}
              title='Maak nieuwe aanvraag'
              onPress={() => navigate('newVolunteer')}
            />
            <Navbar navigate={this.props.navigation}/>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
              <Text>Vrijwilligerswerk organisatorisch</Text>
              <Button
                style={styles.newEvent}
                title='Bekijk persoonlijk aanbod'
                onPress={() => navigate('VolunteerPersonalScreen')}
              />
              <Text>Geen aanvragen</Text>
              <Button
                style={styles.newEvent}
                title='Plaats nieuwe aanvraag'
                onPress={() => navigate('newVolunteer')}
              />
              <Navbar navigate={this.props.navigation}/>
          </View>
        );
      }
    }


    return (
      <View style={styles.container}>
          <Text>Vrijwilligerswerk organisatorisch</Text>
          <Button
            style={styles.newEvent}
            title='Bekijk persoonlijk aanbod'
            onPress={() => navigate('VolunteerPersonalScreen')}
          />
          <Text>Geen aanvragen</Text>
          <Button
            style={styles.newEvent}
            title='Plaats nieuwe aanvraag'
            onPress={() => navigate('newVolunteer')}
          />
          <Navbar navigate={this.props.navigation}/>
      </View>
    );
  }
}

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
  item: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
  },
  own: {
    color: '#ff0',
  },
  other: {
    backgroundColor: '#0f0',
  },
});
