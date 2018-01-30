import React from 'react';
import { StyleSheet, Text, View, Button, Image, AsyncStorage} from 'react-native';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  state = {
    token: null,
  };

  async componentWillMount() {
    AsyncStorage.getItem("myToken").then((token) => {
          this.setState({'token': token});
          const headers = new Headers({
            Authorization: `Bearer ${token}`
          });
          fetch(`http://192.168.1.5:3000/api/me?isActive=true`, {headers})
            .then(user => {
              const userContent = user._bodyText;
              AsyncStorage.setItem("user", userContent);
            })
            .catch(err => console.error(err));
    }).done();

  }


  render() {
    const { token } = this.state;


    return (
      <View style={styles.container}>
        <Text>
            token: {token}
        </Text>
        <Text>HOME</Text>
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
  icon: {
    width: 26,
    height: 26,
  },
});
