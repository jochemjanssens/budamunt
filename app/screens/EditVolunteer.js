import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight } from 'react-native';

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
        const url = 'http://172.20.66.6:3000/api/volunteers/' + this.id;
        fetch(url, {
          method: 'DELETE',
          headers
        })
          .then(r => {
            console.log(r);
          })
          .catch(err => console.error(err));

        fetch('http://172.20.66.6:3000/api/volunteers', {
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
              <Text style={styles.maintitle}>AANVRAAG WIJZIGEN</Text>
              <TouchableHighlight
                onPress={this.handleVolgende}
                underlayColor="white"
              >
                <Text style={styles.comfirm}>VOLGENDE</Text>
              </TouchableHighlight>
            </View>
            <Image
              source={require('../assets/home/bigBorder.png')}
              style={{
                width: '100%',
                height: 12,
              }}
            />
          </View>
          <View style={styles.form}>

              <Image
                source={require('../assets/register/progress.png')}
                style={{
                  width: 79,
                  height: 28,
                  alignSelf: 'center',
                  marginBottom: 20,
                  marginTop: 10,
                }}
              />
            <Text style={styles.description}>
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
          </View>
        </View>
      );
    } else {
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
              <Text style={styles.maintitle}>AANVRAAG WIJZIGEN</Text>
              <TouchableHighlight
                onPress={this.handleSubmit}
                underlayColor="white"
              >
                <Text style={styles.comfirm}>BEVESTIG</Text>
              </TouchableHighlight>
            </View>
            <Image
              source={require('../assets/home/bigBorder.png')}
              style={{
                width: '100%',
                height: 12,
              }}
            />
          </View>
          <View style={styles.form}>
            <Image
              source={require('../assets/register/progress2.png')}
              style={{
                width: 79,
                height: 28,
                alignSelf: 'center',
                marginBottom: 20,
                marginTop: 10,
              }}
            />

            <Text style={styles.text}>Datum</Text>
            <DatePicker
              mode="date"
              date={date}
              format="YYYY-MM-DD"
              minDate={currentDate}
              showIcon= {false}
              confirmBtnText="Bevestig"
              cancelBtnText="Terug"
              onDateChange={(date) => {this.setState({date: date})}}
              style={{width: '100%'}}
              customStyles={{
                dateInput: {
                  borderColor: '#5A60FB'
                }
              }}
            />
            <Text style={styles.text}>Startuur</Text>
            <DatePicker
              mode="time"
              date={startTime}
              showIcon= {false}
              format="HH:mm"
              confirmBtnText="Bevestig"
              cancelBtnText="Terug"
              onDateChange={(startTime) => {this.setState({startTime: startTime})}}
              style={{width: '100%'}}
              customStyles={{
                dateInput: {
                  borderColor: '#5A60FB'
                }
              }}
            />
            <Text style={styles.text}>Einduur</Text>
            <DatePicker
              mode="time"
              date={endTime}
              minDate={startTime}
              showIcon= {false}
              format="HH:mm"
              confirmBtnText="Bevestig"
              cancelBtnText="Terug"
              onDateChange={(endTime) => {this.setState({endTime: endTime})}}
              style={{width: '100%'}}
              customStyles={{
                dateInput: {
                  borderColor: '#5A60FB'
                }
              }}
            />
          </View>
        </View>
      )
    }

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
  description: {
    textAlign: 'center',
    paddingBottom: 20,
  },
});
