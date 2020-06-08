import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Alert, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import CheckboxGroup from 'react-native-checkbox-group';
import { ScrollView } from 'react-native-gesture-handler';

import ProfileScreen from './ProfileScreen.js';

import Slider from '@react-native-community/slider';
import * as firebase from "firebase";

function MySlider(props) {

    const [currVal, setCurrVal] = useState(1);

    return (
        <View>
            <Text>{currVal}</Text>
            <Slider {...props}
                style={{ width: 200, height: 40 }}
                step={1}
                value={currVal}
                minimumValue={1}
                maximumValue={5}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
                onValueChange={value => setCurrVal(value)}
            />
        </View>
    );
}

function MyCheckBoxGroup(props) {

    const [maleChecked, setMaleChecked] = useState(false);
    const [femaleChecked, setfemaleChecked] = useState(false);
    const [nbChecked, setNbChecked] = useState(false);

    return (
        <View>
            <CheckboxGroup
                callback={(selected) => { console.log(selected) }}
                iconColor={"#249c74"}
                iconSize={30}
                checkedIcon="ios-checkbox-outline"
                uncheckedIcon="ios-square-outline"
                checkboxes={[
                    {
                        label: " Male", // label for checkbox item
                        value: 1, // selected value for item, if selected, what value should be sent?
                        selected: maleChecked // if the item is selected by default or not.
                    },
                    {
                        label: " Female",
                        value: 2,
                        selected: femaleChecked
                    },
                    {
                        label: " Non-binary",
                        value: 3,
                        selected: nbChecked
                    }
                ]}
                labelStyle={{
                    color: '#333'
                }}
                rowStyle={{
                    flexDirection: 'row'
                }}
                rowDirection={"column"}
            />
        </View>
    );
}

export default function SurveyScreen({ navigation }) {

    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
        navigation.navigate("Root");
    } else {
        // No user is signed in.
        navigation.navigate("Login");
    }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            navigation.navigate("Root");
        } else {
            // No user is signed in.
            navigation.navigate("Login");
        }
    });

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text>Welcome! This will be the survey screen.</Text>
                <Text>{"\n"}</Text>
                <Text style={styles.title}>On a scale of 5: 1 is completely disagree and 5 is completely agree.</Text>
                <Text>{"\n"}</Text>
                <Text style={styles.title}>I am an early riser.</Text>
                <MySlider id="slider1" />
                <Text>{"\n"}</Text>
                <Text style={styles.title}>I keep my room neat.</Text>

                <MySlider id="slider2" />
                <Text>{"\n"}</Text>
                <Text style={styles.title}>I have friends over often.</Text>

                <MySlider id="slider3" />
                <Text>{"\n"}</Text>
                <Text style={styles.title}>I want lights out and silence when I sleep.</Text>

                <MySlider id="slider4" />
                <Text>{"\n"}</Text>
                <Text style={styles.title}>I have overnight guests regularly.</Text>

                <MySlider id="slider5" />
                <Text>{"\n"}</Text>

                <Text>I am open to living with these genders (Pick at least one)</Text>
                <MyCheckBoxGroup />

                <Text>{"\n"}</Text>
                <Button title="Submit" onPress={() => {
                    navigation.navigate("Match")
                }} />
                <Text>{"\n"}</Text>
            </ScrollView>
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
