import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import BottomTabNavigator from '../navigation/BottomTabNavigator.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput } from 'react-native';

import ProfileScreen from './ProfileScreen.js';
import { NavigationContainer } from '@react-navigation/native';

import { LinkingTabsConfig } from '../navigation/LinkingTabsConfig.js';
import { useState, useEffect } from 'react';

import * as firebase from "firebase";

const Tab = createBottomTabNavigator();

export default function SignUpScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <View>
                <UserInput id="firstName" placeholder='First Name' />
                <UserInput id="lastName" placeholder='Last Name' />
                <UserInput id="email" placeholder="Email" />
                <UserInput id="password" placeholder='Password' />
                <UserInput id="confirmPassword" placeholder='Confirm Password' />

                <Button title="Create account" onPress={() => {
                    var firstName = document.getElementById("firstName").value;
                    var lastName = document.getElementById("lastName").value;
                    var email = document.getElementById("email").value;
                    console.log(email);
                    var password = document.getElementById("password").value;
                    var confirmpassword = document.getElementById("confirmPassword").value;
                    if (password !== confirmpassword) {
                        alert("Passwords do not match.");
                        console.log("warning- do not match");
                        return;
                    }

                    handleCreateUser(email, password, firstName, lastName);

                    console.log(firstName);
                    navigation.navigate("Root")
                }} />
                <br />
                <br />
            </View>
        </View>
    );
};

function handleCreateUser(email, password, firstName, lastName) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {
            // set other info (first name, last name)
            firebase.database().ref('users/' + user.uid).update({
                firstname: firstName,
                lastname: lastName
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                return;
            });
        });
    //alert("Congrats! You have created your account");
}

function UserInput(props) {

    const [val, onChangeText] = React.useState("");

    return (
        <TextInput {...props}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(text) => onChangeText(text)}
            value={val}
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
