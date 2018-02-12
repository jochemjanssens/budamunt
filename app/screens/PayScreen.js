import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity, Button, AsyncStorage, TouchableHighlight } from "react-native";
import { Camera, Permissions, Constants } from "expo";
import { StackNavigator } from "react-navigation";

export default class PayScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Betalen",
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../assets/icon.png")}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    user: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });

    AsyncStorage.getItem("user").then(user => {
      this.setState({"user": JSON.parse(user)});
    });
  }

  scanned = false;

  onBarCodeRead = data => {
    if(this.scanned === false){
      this.scanned = true;
      const qrData = JSON.parse(data.data);
      if(qrData.type === "Budamunt"){
        const body = new FormData();
        body.append(`payingId`, this.state.user._id);
        body.append(`payingName`, `${this.state.user.firstname} ${this.state.user.name}`);
        body.append(`receivingId`, qrData.data.receiveId);
        body.append(`receivingName`, qrData.data.receiveName);
        body.append(`munten`, qrData.data.munten);

        AsyncStorage.getItem("munten").then(munten => {
          if(parseInt(munten) > parseInt(qrData.data.munten)){
            AsyncStorage.getItem("myToken").then(token => {
              const headers = new Headers({
                Authorization: `Bearer ${token}`
              });
              fetch("http://192.168.1.16:3000/api/transactions", {
                method: "POST",
                body,
                headers
              })
              .then(r => {
                AsyncStorage.getItem("muntenId").then(muntenId => {
                  fetch(`http://192.168.1.16:3000/api/balances/${muntenId}`, {
                      method: "DELETE",
                      headers
                  })
                  .then(d => {
                    const newMunten = munten - qrData.data.munten;
                    const balance = new FormData();
                    balance.append(`userId`, this.state.user._id);
                    balance.append(`munten`, newMunten);
                    fetch(`http://192.168.1.16:3000/api/balances`, {
                      method: "POST",
                      body: balance,
                      headers
                    })
                    .then(r => {
                      this.props.navigation.navigate("AfterpayScreen");
                    })
                    .catch(err => console.error(err));
                  })
                  .catch(err => console.error(err));
                })
              })
              .catch(err => console.error(err));
            })
          }else{
            this.props.navigation.navigate("ErrorScreen");
          }
        })
      }
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
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
              <Text style={styles.maintitle}>BETALEN</Text>
            </View>
            <Image
              source={require('../assets/home/bigBorder.png')}
              style={{
                width: '100%',
                height: 12,
              }}
            />
          </View>

          <Camera style={{ flex: 1 }} type={this.state.type} onBarCodeRead={this.onBarCodeRead}>

          </Camera>
        </View>
      );
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
});
