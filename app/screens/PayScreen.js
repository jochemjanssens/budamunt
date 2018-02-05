import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity, Button, AsyncStorage } from "react-native";
import { Camera, Permissions } from "expo";
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
        body.append(`payingName`, this.state.user.firstname);
        body.append(`receivingId`, qrData.data.receiveId);
        body.append(`receivingName`, qrData.data.receiveName);
        body.append(`munten`, qrData.data.munten);

        AsyncStorage.getItem("munten").then(munten => {
          if(parseInt(munten) > parseInt(qrData.data.munten)){
            AsyncStorage.getItem("myToken").then(token => {
              const headers = new Headers({
                Authorization: `Bearer ${token}`
              });
              fetch("http://192.168.1.45:3000/api/transactions", {
                method: "POST",
                body,
                headers
              })
              .then(r => {
                AsyncStorage.getItem("muntenId").then(muntenId => {
                  fetch(`http://192.168.1.45:3000/api/balances/${muntenId}`, {
                      method: "DELETE",
                      headers
                  })
                  .then(d => {
                    const newMunten = munten - qrData.data.munten;
                    const balance = new FormData();
                    balance.append(`userId`, this.state.user._id);
                    balance.append(`munten`, newMunten);
                    fetch(`http://192.168.1.45:3000/api/balances`, {
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
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Terug"
            color="#841584"
          />
          <Camera style={{ flex: 1 }} type={this.state.type} onBarCodeRead={this.onBarCodeRead}>

          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 26,
    height: 26,
  },
});
