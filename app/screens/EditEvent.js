import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight } from 'react-native';

import t from 'tcomb-form-native';
const Form = t.form.Form;

import DatePicker from 'react-native-datepicker'

const Event = t.struct({
  titel: t.String,
  beschrijving: t.String,
  locatie: t.String
});

export default class EditEvent extends React.Component {
  state = {
    user: null,
    progress: 1,
    value: {
      beschrijving: null,
      locatie: null,
      titel: null,
    },
    date: null,
    startTime: null,
    endTime: null,
  };

  constructor(data){
    super();
    this.formData = data.navigation.state.params.data;
    this.user = this.formData.user;
    this.value = {
      beschrijving: this.formData.description,
      locatie: this.formData.location,
      titel: this.formData.name,
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
        body.append(`date`, this.state.date);
        body.append(`starttime`, this.state.startTime);
        body.append(`endtime`, this.state.endTime);
        body.append(`isActive`, 'true');

        const headers = new Headers({
          Authorization: `Bearer ${token}`
        });
        const url = 'http://192.168.1.22:3000/api/events/' + this.formData._id;
        fetch(url, {
          method: 'DELETE',
          headers
        })
          .then(r => {
            console.log(r);
          })
          .catch(err => console.error(err));

        fetch('http://192.168.1.22:3000/api/events', {
            method: 'POST',
            body,
            headers
          })
          .then(r => {
            console.log(r);
            this.props.navigation.navigate('Evenementen')
          })
          .catch(err => console.error(err));
      }
    });
  }

  render() {

    const { navigate } = this.props.navigation;
    const { progress, date, startTime, endTime} = this.state;
    this.setState({date: this.date});
    this.setState({startTime: this.startTime});
    this.setState({endTime: this.endTime});

    var currentDate = new Date().toJSON().slice(0,10);

    if(progress === 1){
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
              <Text style={styles.maintitle}>AANVRAAG WIJZIGEN</Text>
              <TouchableHighlight
                onPress={this.handleVolgende}
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
              Om een evenement te maken moet je snel even dit forumulier
              invullen na het invullen wordt jouw event geplaatst en kunnen
              andere mensen erop reageren
            </Text>
            <Form
               type={Event}
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
              >
                <Image
                  source={require('../assets/general/back.png')}
                  style={{
                    width: 15,
                    height: 23,
                  }}
                />
              </TouchableHighlight>
              <Text style={styles.maintitle}>AANVRAAG WIJZIGEN</Text><TouchableHighlight
                onPress={this.handleSubmit}
              >
                <Text style={styles.comfirm}>PLAATS</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  maintitle: {
    color: '#5A60FB',
    fontWeight: '700',
    fontSize: 20,
  },
  comfirm: {
    color: '#5A60FB',
    fontSize: 12,
  },
  form: {
    padding: 20,
  },
  description: {
    textAlign: 'center',
    paddingBottom: 20,
  },
  text: {
    color: '#5A60FB',
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 5,
  }
});
