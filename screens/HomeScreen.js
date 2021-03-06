import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import { TextInput } from 'react-native';

import { MatchesScreen } from './MatchesScreen.js';
import { StackActions, StackNavigator, withNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import * as firebase from "firebase";
import { powderblue } from 'color-name';

function handleSignInUser(email, pw) {
  firebase.auth().signInWithEmailAndPassword(email, pw).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    return;
  });
}

export default function HomeScreen({ navigation }) {

  var userId = "";

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      userId = user.uid;
      console.log(userId);
    } else {
      // No user is signed in.
      console.log("user obj is null");
    }
  });

  return (
    <View style={styles.container}>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          <UserInput value={email} id="email" onChangeText={text => setEmail(text)} placeholder="Email" />
          <UserInput value={pw} id="pw" onChangeText={text => setPw(text)} placeholder='Password' />

          <Button title="Log In" onPress={() => {

            handleSignInUser(email, pw);

            navigation.navigate("Root")
          }} />
          <Text>
            {"\n"}
            {"\n"}
          </Text>

        </View>

        <View>
          <Text>
            New to RoomCru?
        </Text>
          <Button title="Sign up" onPress={() => {
            navigation.navigate("SignUp")
          }} />
        </View>
      </ScrollView>

    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function UserInput(props) {


  return (
    <TextInput {...props}
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
