import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';

import t from 'tcomb-form-native';
const Form = t.form.Form;

import DatePicker from 'react-native-datepicker'

const Volunteer = t.struct({
  titel: t.String,
  beschrijving: t.String,
  locatie: t.String,
  munten: t.Number
});

export default class EditVolunteer extends React.Component {
  state = {
    id: null,
    user: null,
    progress: 1,
    value: {
      beschrijving: null,
      locatie: null,
      titel: null,
      munten: null,
    },
    date: null,
    startTime: null,
    endTime: null,
    load: null
  };

  constructor(data){
    super();
    this.formData = data.navigation.state.params.data;

    this.id = this.formData._id;
    this.user = this.formData.user;
    this.value = {
      beschrijving: this.formData.description,
      locatie: this.formData.location,
      titel: this.formData.name,
      munten: this.formData.munten,
    }
    this.date = this.formData.date;
    this.startTime = this.formData.starttime;
    this.endTime = this.formData.endtime;
  }

  onChange(value) {
    this.value = value
  }

  async componentWillMount() {
    AsyncStorage.getItem("user").then(user => {
      this.setState({'user': JSON.parse(user)});
    });
  }

  handleVolgende = () => {
    const value = this._form.getValue();
    this.value.titel =  value.titel;
    this.value.beschrijving = value.beschrijving;
    this.value.locatie = value.locatie;
    this.value.munten = value.munten;
    this.setState({ progress: 2 });
  }

  handleSubmit = () => {
    AsyncStorage.getItem("myToken").then((token) => {
      if(token){
        const body = new FormData();
        body.append(`user`, this.state.user.email);
        body.append(`name`, this.value.titel);
        body.append(`description`, this.value.beschrijving);
        body.append(`location`, this.value.locatie);
        body.append(`munten`, this.value.munten);
        body.append(`date`, this.state.date);
        body.append(`starttime`, this.state.startTime);
        body.append(`endtime`, this.state.endTime);
        body.append(`userType`, this.state.user.scope);
        body.append(`isActive`, 'true');

        const headers = new Headers({
          Authorization: `Bearer ${token}`
        });
        const url = 'http://192.168.1.16:3000/api/volunteers/' + this.id;
        fetch(url, {
          method: 'DELETE',
          headers
        })
          .then(r => {
            console.log(r);
          })
          .catch(err => console.error(err));

        fetch('http://192.168.1.16:3000/api/volunteers', {
            method: 'POST',
            body,
            headers
          })
          .then(r => {
            console.log(r);
            this.props.navigation.navigate('Vrijwilligerswerk')
          })
          .catch(err => console.error(err));
      }
    });
  }

  setup = () => {
    this.setState({date: this.date});
    this.setState({startTime: this.startTime});
    this.setState({endTime: this.endTime});
    this.setState({load: true});
  }

  render() {

    const { navigate } = this.props.navigation;
    const { load, progress, date, startTime, endTime} = this.state;

    if(load !== true){
      this.setup();
    }

    var currentDate = new Date().toJSON().slice(0,10);

    if(progress === 1){
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Button
              onPress={() => this.props.navigation.goBack()}
              title="Terug"
              color="#841584"
            />
            <Text>Aanvraag Wijzigen</Text>
          </View>
          <View style={styles.form}>
            <Text>1/2</Text>
            <Text>
              Om een vrijwilliger aan te vragen moet je snel even dit form invullen
              na het invullen wordt jouw aanvraag geplaatst
              en kunnen andere mensen erop reageren.
            </Text>
            <Form
               type={Volunteer}
               ref={c => this._form = c}
               value={this.value}
               onChange={this.onChange}
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
              date={date}
              format="YYYY-MM-DD"
              minDate={currentDate}
              showIcon= {false}
              confirmBtnText="Bevestig"
              cancelBtnText="Terug"
              onDateChange={(date) => {this.setState({date: date})}}
            />
            <DatePicker
              mode="time"
              date={startTime}
              showIcon= {false}
              format="HH:mm"
              confirmBtnText="Bevestig"
              cancelBtnText="Terug"
              onDateChange={(startTime) => {this.setState({startTime: startTime})}}
            />
            <DatePicker
              mode="time"
              date={endTime}
              minDate={startTime}
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
