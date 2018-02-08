import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, ScrollView } from 'react-native';
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

      fetch(`http://192.168.0.233:3000/api/volunteers?isActive=true`, {headers})
        .then(r => {
          this.setState({'volunteers': JSON.parse(r._bodyText).volunteers});
          fetch(`http://192.168.0.233:3000/api/applications`, {headers})
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

        fetch(`http://192.168.0.233:3000/api/volunteers?isActive=true`, {headers})
          .then(r => {
            const { volunteers } = this.state;
            if(volunteers && r){
              if(volunteers.length !== JSON.parse(r._bodyText).volunteers.length){
                  this.setState({'volunteers': JSON.parse(r._bodyText).volunteers});
              }
            }
            fetch(`http://192.168.0.233:3000/api/applications`, {headers})
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

      if(volunteersArray.length !== 0){
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Button
                onPress={() => this.props.navigation.goBack()}
                title="Terug"
                color="#841584"
              />
              <Text>Vrijwilligers</Text>
              <Button
                title='Berichten'
                onPress={() => navigate('Messages')}
              />
            </View>
            <View style={{ height: 100 }} />
            <Text>Vrijwilligerswerk persoonlijk</Text>
            <Button
              style={styles.newEvent}
              title='Bekijk organisatorisch aanbod'
              onPress={() => navigate('Vrijwilligerswerk')}
            />
            <ScrollView style={styles.lijst}>
              {
                volunteersArray.map(
                  volunteer => {
                    let match = false;
                    applications.map(
                      application => {
                        if(application.volunteerId === volunteer._id && user._id === application.userId){
                          console.log(match);
                          match = true;
                        }
                      }
                    )
                    let button = null;
                    console.log(user.email);
                    console.log(volunteer.user);
                     if (user.email === volunteer.user) {
                        button =  <Button onPress={() => navigate(`ownVolunteerDetail`, { ...volunteer })} title='wijzig' color="#134D57"/>;
                     } else {
                       if(match){
                         button = <Button onPress={() => navigate(`chosenVolunteerDetail`, { ...volunteer })} title='bekijk' color="#134D57"/>;
                       } else {
                          button = <Button onPress={() => navigate(`VolunteerDetail`, { ...volunteer })} title='open' color="#134D57"/>;
                       }
                     }

                    return(
                      <View key={volunteer._id} style={styles.item}>
                        <Text>
                          {`${(match === true) ? 'AL INGESCHREVEN' : "NIET INGESCHREVEN"}`}
                        </Text>
                        <Text>{volunteer.name}</Text>
                        <Text>{volunteer.description}</Text>
                        <Text>{volunteer.date}</Text>
                        {button}
                      </View>
                    );
                  }
                )
              }
            </ScrollView>
            <Button
              style={styles.newEvent}
              title='Maak nieuwe aanvraag'
              onPress={() => navigate('newVolunteer')}
            />
            <View style={{ height: 60 }} />
            <Navbar navigate={this.props.navigation}/>
          </View>
        );
      } else {
        return (
          <View style={styles.containerEmpty}>
            <View style={styles.header}>
              <Button
                onPress={() => this.props.navigation.goBack()}
                title="Terug"
                color="#841584"
              />
              <Text>Vrijwilligers</Text>
              <Button
                title='Berichten'
                onPress={() => navigate('Messages')}
              />
            </View>
              <Text>Vrijwilligerswerk persoonlijk</Text>
              <Button
                style={styles.newEvent}
                title='Bekijk organisatorisch aanbod'
                onPress={() => navigate('Vrijwilligerswerk')}
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
      <View style={styles.containerEmpty}>
        <View style={styles.header}>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Terug"
            color="#841584"
          />
          <Text>Vrijwilligers</Text>
          <Button
            title='Berichten'
            onPress={() => navigate('Messages')}
          />
        </View>
          <Text>Vrijwilligerswerk persoonlijk</Text>
          <Button
            style={styles.newEvent}
            title='Bekijk organisatorisch aanbod'
            onPress={() => navigate('Vrijwilligerswerk')}
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
    justifyContent: 'space-between',
  },
  containerEmpty: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newEvent: {
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    alignItems: 'center',
    top: 50,
    width: 300
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
  lijst: {
    alignSelf: 'stretch',
  },
  own: {
    color: '#ff0',
  },
  other: {
    backgroundColor: '#0f0',
  },
});
