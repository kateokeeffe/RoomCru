import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import BottomTabNavigator from '../navigation/BottomTabNavigator.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import * as firebase from "firebase";
import { useState, useEffect } from 'react';

function DefaultView(props) {
    const navigation = props.navigation;
    const info = props.info;
    return (
        <View style={styles.container}>
            <Text>Welcome! This will be the profile screen.</Text>
            <Button title="Edit Profile" onPress={() => {
                navigation.navigate("Edit Profile")
            }} />
            <Text id="name">Name: {info[0]} {info[1]}</Text>
            <Text id="photo">Photo</Text>
            <Text id="school">School</Text>
            <Text id="age">Age</Text>
            <Text id="class_year">Class year</Text>
            <Text id="location">location</Text>
            <Text id="prompt1">prompt1</Text>
            <Text id="prompt2">prompt2</Text>
            <Text id="prompt3">prompt3</Text>
        </View>
    );
}

function BuildProfileView(props) {
    const navigation = props.navigation;
    return (
        <View>
            <Button title="Build your profile" onPress={() => {
                navigation.navigate("Build Your Profile")
            }} />
        </View>
    );
}

function ProfileView(props) {
    const has_profile = props.has_profile;
    if (has_profile === 0) {
        return (
            <BuildProfileView navigation={props.navigation} />
        );
    } else {
        return (
            <DefaultView navigation={props.navigation} info={props.info} />
        );
    }
}


async function getInfo(uid, setFirstName, setLastName, setEmail, setHasProfile) {
    var promise = await firebase.database().ref("users/" + uid).once('value').then(function (snapshot) {
        console.log(snapshot.val());
        setFirstName(snapshot.val()["firstName"]);
        setLastName(snapshot.val()["lastName"]);
        setEmail(snapshot.val()["email"]);
        setHasProfile(snapshot.val()["has_profile"]);
    })
}

export default function ProfileScreen({ route, navigation }) {

    var userId = "";
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [hasProfile, setHasProfile] = useState(0);

    var info = [firstName, lastName, email, hasProfile];

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            userId = user.uid;
            getInfo(userId, setFirstName, setLastName, setEmail, setHasProfile);
            if (hasProfile === 1) {
                setHasProfile(1);
            }
        } else {
            // No user is signed in.
            navigation.navigate("Login");
        }
    });

    return (
        <View>
            <ProfileView navigation={navigation} has_profile={hasProfile} info={info} />
        </View>
    );
};


function UserInput(props) {

    const [value, onChangeText] = React.useState(props.placeholder);

    return (
        <TextInput {...props}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={value}
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
