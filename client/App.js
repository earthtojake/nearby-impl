import React, { Component } from 'react';
import Navigator from './components/Navigator.react';

import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';

class App extends Component {

  state = {
    user: undefined, // user has not logged in yet
  };

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    const user = JSON.parse(decodeURI(user_string));
    console.log(user);
    this.setState({
      // Decode the user string and parse it into JSON
      user: user
    });
    AsyncStorage.setItem('userId', user._id, () => {
      console.log("saved");
    });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('http://localhost:8080/auth/facebook');

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  render() {
    const { user } = this.state;

    AsyncStorage.getItem('userId').then((uid) => {
      if (uid) {
        this.setState({user: uid});
      }
    });

    return (
      user === undefined ? <View style={styles.content}>
        <View style={styles.button}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
            {...iconStyles}
          >
            Login with Facebook
          </Icon.Button>
        </View>
      </View> : <Navigator />
    )
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    right: 20,
  },
});

export default App
