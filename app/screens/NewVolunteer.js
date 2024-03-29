import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage, TouchableHighlight, ScrollView } from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import t from 'tcomb-form-native';
const Form = t.form.Form;

import DatePicker from 'react-native-datepicker'

const Volunteer = t.struct({
  titel: t.String,
  beschrijving: t.String,
  locatie: t.String,
  munten: t.Number
});

var options = {
  fields: {
    beschrijving: {
      multiline: true,
      stylesheet: {
          ...Form.stylesheet,
          textbox: {
            ...Form.stylesheet.textbox,
            normal: {
              ...Form.stylesheet.textbox.normal,
              height: 100
            },
            error: {
              ...Form.stylesheet.textbox.error,
              height: 100
          }
        }
      }
    }
  }
};

export default class NewVolunteer extends React.Component {
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
    });
  }

  handleVolgende = () => {
    const value = this._form.getValue();
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
        body.append(`munten`, this.state.data.munten);
        body.append(`date`, this.state.date);
        body.append(`starttime`, this.state.startTime);
        body.append(`endtime`, this.state.endTime);
        body.append(`userType`, this.state.user.scope);

        const headers = new Headers({
          Authorization: `Bearer ${token}`
        });

        fetch('http://172.20.66.6:3000/api/volunteers', {
            method: 'POST',
            body,
            headers
          })
          .then(r => {
            console.log(r);
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
              <Text style={styles.maintitle}>VRIJWILLIGERS</Text>
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
          <ScrollView style={styles.form}>
            <Image
              source={require('../assets/register/progress.png')}
              style={{
                width: 79,
                height: 28,
                alignSelf: 'center',
              }}
            />
            <Text style={styles.description}>
              Om een vrijwilliger aan te vragen moet je snel even dit form invullen
               na het invullen wordt jouw aanvraag geplaatst en kunnen andere mensen
               erop reageren.
            </Text>
            <Form
               type={Volunteer}
               ref={c => this._form = c}
               options={options}
             />
             <View style={{height: 50}}></View>
          </ScrollView>

          <KeyboardSpacer/>

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
              <Text style={styles.maintitle}>VRIJWILLIGERS</Text>
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
          <ScrollView style={styles.form}>
            <Image
              source={require('../assets/register/progress2.png')}
              style={{
                width: 79,
                height: 28,
                alignSelf: 'center',
              }}
            />

            <Text style={styles.text}>Datum</Text>
            <DatePicker
              mode="date"
              date={this.state.date}
              format="YYYY-MM-DD"
              minDate={date}
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
              date={this.state.startTime}
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
              date={this.state.endTime}
              minDate={this.state.startTime}
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
          </ScrollView>
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
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  description: {
    textAlign: 'center',
    paddingVertical: 30,
    fontSize: 13,
  },
  text: {
    color: '#5A60FB',
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 5,
  }
});
