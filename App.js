/* import { useScreens } from 'react-native-screens';
useScreens(); */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomeScreen from './screens/HomeScreen.js';
import MatchesScreen from './screens/MatchesScreen.js';
import Profile from './screens/ProfileScreen.js';
import Messages from './screens/MessageScreen.js';
import SignUp from './screens/SignUpScreen.js';
import ActiveMessages from './screens/MessageTabs/ActiveMessageScreen.js';
import NewMessages from './screens/MessageTabs/NewMessageScreen.js';
import Survey from './screens/SurveyScreen.js';
import EditScreen from './screens/EditProfileScreen';
import BuildProfileScreen from './screens/BuildProfileScreen';

import * as firebase from "firebase";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MessageTabs = createMaterialTopTabNavigator();
const MatchStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function Matches() {
  return (
    <MatchStack.Navigator >
      <MatchStack.Screen name="Match" component={MatchesScreen} />
      <MatchStack.Screen name="Survey" component={Survey} />
    </MatchStack.Navigator >
  );
}

function Messages_Tab() {
  return (
    <MessageTabs.Navigator>
      <MessageTabs.Screen name="Active" component={ActiveMessages} />
      <MessageTabs.Screen name="New" component={NewMessages} />
    </MessageTabs.Navigator>
  );
}

function Profile_Tab() {
  return (
    <ProfileStack.Navigator >
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Edit Profile" component={EditScreen} />
      <ProfileStack.Screen name="Build Your Profile" component={BuildProfileScreen} />
    </ProfileStack.Navigator >
  );
}

function Root() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Matches" component={Matches} />
      <Tab.Screen name="Profile" component={Profile_Tab} />
      <Tab.Screen name="Messages" component={Messages_Tab} />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Root" component={Root} />
      <Stack.Screen name="Login" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}

export default function App({ navigation }) {


  const firebaseConfig = {
    apiKey: "AIzaSyDKDEilnSWOQdCEvpuGM2pSZ_e94P_qkH0",
    authDomain: "roomcru-2bd45.firebaseapp.com",
    databaseURL: "https://roomcru-2bd45.firebaseio.com",
    projectId: "roomcru-2bd45",
    storageBucket: "roomcru-2bd45.appspot.com",
    messagingSenderId: "203985573677",
    appId: "1:203985573677:web:a91f5e8cda6914f55865a4",
    measurementId: "G-DEJK676FV9"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  firebase.analytics();


  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <MyStack />
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
