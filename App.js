/* import { useScreens } from 'react-native-screens';
useScreens(); */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import HomeScreen from './screens/HomeScreen.js';
import Matches from './screens/MatchesScreen.js';
import Profile from './screens/ProfileScreen.js';
import Messages from './screens/MessageScreen.js';

const Stack = createStackNavigator();

export default function App(props) {


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

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={HomeScreen} />
      <Stack.Screen name="Matches" component={Matches} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Messages" component={Messages} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
