import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';

import t from 'tcomb-form-native';
const Form = t.form.Form;

import DatePicker from 'react-native-datepicker'

const Event = t.struct({
  titel: t.String,
  beschrijving: t.String,
  locatie: t.String
});

export default class NewEvent extends React.Component {
  state = {
    user: null,
    progress: 1,
    data: null,
    date: new Date().toJSON().slice(0,10),
    startTime: '10:00',
    endTime: '21:00'
  };

  async componentWillMount() {
    AsyncStorage.getItem("user").then(user => {
      this.setState({'user': JSON.parse(user)});
      console.log(user);
    });w
  }

  handleVolgende = () => {
    const value = this._form.getValue();
    console.log(value);
    if(value){
      this.setState({ data: value });
      this.setState({ progress: 2 });
    }
  }

  handleSubmit = () => {
    AsyncStorage.getItem("myToken").then((token) => {
      if(token){
        const body = new FormData();
        body.append(`user`, this.state.user.email);
        body.append(`name`, this.state.data.titel);
        body.append(`description`, this.state.data.beschrijving);
        body.append(`location`, this.state.data.locatie);
        body.append(`date`, this.state.date);
        body.append(`starttime`, this.state.startTime);
        body.append(`endtime`, this.state.endTime);

        const headers = new Headers({
          Authorization: `Bearer ${token}`
        });

        fetch('http://192.168.1.22:3000/api/events', {
            method: 'POST',
            body,
            headers
          })
          .then(r => {
            this.props.navigation.goBack();
          })
          .catch(err => console.error(err));
      }
    });


  }

  render() {
    const { navigate } = this.props.navigation;
    const { progress } = this.state;

    var date = new Date().toJSON().slice(0,10);

    if(progress === 1){
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Button
              onPress={() => this.props.navigation.goBack()}
              title="Terug"
              color="#841584"
            />
            <Text>Event Aanmaken</Text>
          </View>
          <View style={styles.form}>
            <Text>1/2</Text>
            <Text>
              Om een evenement te maken moet je snel even dit forumulier
              invullen na het invullen wordt jouw event geplaatst en kunnen
              andere mensen erop reageren
            </Text>
            <Form
               type={Event}
               ref={c => this._form = c}
             />
            <Button
              title="Volgende"
              onPress={this.handleVolgende}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Button
              onPress={() => this.props.navigation.goBack()}
              title="Terug"
              color="#841584"
            />
            <Text>Event Aanmaken</Text>
          </View>
          <View style={styles.form}>
            <Text>2/2</Text>
            <DatePicker
              mode="date"
              date={this.state.date}
              format="YYYY-MM-DD"
              minDate={date}
              showIcon= {false}
              confirmBtnText="Bevestig"
              cancelBtnText="Terug"
              onDateChange={(date) => {this.setState({date: date})}}
            />
            <DatePicker
              mode="time"
              date={this.state.startTime}
              showIcon= {false}
              format="HH:mm"
              confirmBtnText="Bevestig"
              cancelBtnText="Terug"
              onDateChange={(startTime) => {this.setState({startTime: startTime})}}
            />
            <DatePicker
              mode="time"
              date={this.state.endTime}
              minDate={this.state.startTime}
              showIcon= {false}
              format="HH:mm"
              confirmBtnText="Bevestig"
              cancelBtnText="Terug"
              onDateChange={(endTime) => {this.setState({endTime: endTime})}}
            />
            <Button
              title="Bevestig"
              onPress={this.handleSubmit}
            />
          </View>
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    backgroundColor: '#0ff',
    alignSelf: 'stretch',
    paddingTop: 30
  }
});
