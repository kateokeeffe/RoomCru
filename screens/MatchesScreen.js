import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Alert } from 'react-native';

import ProfileScreen from './ProfileScreen.js';
import { NavigationContainer } from '@react-navigation/native';

import { LinkingTabsConfig } from '../navigation/LinkingTabsConfig.js';
import * as firebase from "firebase";

async function getFirstName(setFirstName, uid) {
    var firstname = "";
    console.log("uid: " + uid);
    var promise = await firebase.database().ref("users/" + uid).once('value').then(function (snapshot) {
        console.log(snapshot.val());

        setFirstName(snapshot.val()["firstName"]);
    })
}

export default function MatchesScreen({ navigation }) {

    var userId = "";
    const [firstname, setFirstName] = React.useState("");

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            userId = user.uid;
            getFirstName(setFirstName, userId);
            console.log(userId);
        } else {
            // No user is signed in.
            console.log("user obj is null");
        }
    });

    return (
        <View style={styles.container}>
            <Text>Welcome {firstname}! This will be the matches screen.</Text>
            <View>
                <Text>Please fill out the{"\n"}</Text>

                <Button title="Compatibility questionnaire" onPress={() => {
                    navigation.navigate("Survey")
                }} />

                <Text>{"\n"}so we can vet your potential matches</Text>

            </View>
        </View>
    );
};

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
