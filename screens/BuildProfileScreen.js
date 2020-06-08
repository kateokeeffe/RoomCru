import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import { TextInput } from 'react-native';

import ProfileScreen from './ProfileScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { LinkingTabsConfig } from '../navigation/LinkingTabsConfig.js';
import { ScrollView } from 'react-native-gesture-handler';
import CheckboxGroup from 'react-native-checkbox-group';
import { useState, useEffect } from 'react';
import { Picker } from 'react-native'; //'@react-native-community/picker';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as firebase from "firebase";

function handleChoosePhoto() {
    const [image, setImage] = useState(null);
    try {
        let result = ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }

        console.log(result);
    } catch (E) {
        console.log(E);
    }
}
function MyImagePicker() {

    return (
        <View>
            <Button title="Upload photo" onPress={() => handleChoosePhoto()} />
        </View>
    );
    useEffect(() => { handleChoosePhoto() });

}


export default function BuildProfileScreen({ route, navigation }) {

    var userId = "";

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            userId = user.uid;
            console.log(userId);
        } else {
            // No user is signed in.
            navigation.navigate("Login");
        }
    });

    const options = {
        1: "Go to artist for a dance party",
        2: "Your signature dish",
        3: "Last show you binged on Netflix",
        4: "Craziest travel story"
    };

    var class_years = {};
    var date = new Date();
    var current_year = date.getFullYear();
    var counter = 1;
    for (var i = current_year; i <= current_year + 6; i++) {
        class_years[counter] = i;
        counter++;
    }

    const [school, setSchool] = useState("");
    const [age, setage] = useState("");
    const [classYear, setclassyear] = useState("");
    const [loc, setloc] = useState("");
    const [dob, setDob] = useState(new Date());
    const [mode, setMode] = useState('date');

    const [p1, setp1] = useState("");
    const [p2, setp2] = useState("");
    const [p3, setp3] = useState("");
    const [p4, setp4] = useState("");
    const [p1a, setp1a] = useState("");
    const [p2a, setp2a] = useState("");
    const [p3a, setp3a] = useState("");
    const [p4a, setp4a] = useState("");

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text>Build profile screen{"\n"}</Text>

                <Text>{"\n"}</Text>
                <UserInput id="school" onChangeText={text => setSchool(text)} placeholder="School" />

                <Text>{"\n"}</Text>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dob}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={date => setDob(date)}
                />

                <Text> {"\n"}Class year</Text>
                <MyPicker options={class_years} setclassyear={setclassyear} />

                <Text>{"\n"}</Text>
                <UserInput id="location" placeholder="Location" onChangeText={(text) => setloc(text)} />


                <Text>{"\n"}Pick four prompts</Text>

                <MyPrompt options={options} setprompt={setp1} setanswer={setp1a} />
                <Text>{"\n"}</Text>
                <MyPrompt options={options} setprompt={setp2} setanswer={setp2a} />
                <Text>{"\n"}</Text>
                <MyPrompt options={options} setprompt={setp3} setanswer={setp3a} />
                <Text>{"\n"}</Text>
                <MyPrompt options={options} setprompt={setp4} setanswer={setp4a} />
                <Text>{"\n"}</Text>
                <Button title="Save" onPress={() => {
                    console.log(school, age);
                    firebase.database().ref('users/' + userId).update({
                        "school": school,
                        "age": age,
                        "classYear": classYear,
                        "location": loc,
                        "prompts": {
                            p1: p1a,
                            p2: p2a,
                            p3: p3a,
                            p4: p4a
                        }
                    });
                    navigation.navigate("Profile")
                }} />
            </ScrollView>
        </View>
    );
}

function MyPicker(props) {
    const options = props.options;
    const [selected, setSelected] = useState(options["1"]);
    const setclassyear = props.setclassyear;
    return (
        <Picker
            selectedValue={selected}
            style={{ height: 50, width: 300 }}
            onValueChange={(itemValue, itemIndex) =>
                setSelected(itemValue) &&
                setclassyear(itemValue)
            }>
            {
                Object.keys(options).map((key) => {
                    return (<Picker.Item label={options[key]} value={key} key={key} />) //if you have a bunch of keys value pair
                })
            }
        </Picker >
    );
}

function MyPrompt(props) {
    const options = props.options;
    const [selected, setSelected] = useState(options["1"]);
    const setprompt = props.setprompt;
    const setanswer = props.setanswer;

    return (
        <View>
            <Picker
                selectedValue={selected}
                style={{ height: 50, width: 300 }}
                onValueChange={(itemValue, itemIndex) => {
                    setSelected(itemValue); setprompt(itemValue);
                }}>
                {Object.keys(options).map((key) => {
                    return (<Picker.Item label={options[key]} value={key} key={key} />) //if you have a bunch of keys value pair
                })}
            </Picker>
            <UserInput onChangeText={text => setanswer(text)} />
        </View>
    );
}

function UserInput(props) {

    const [val, onChangeText] = React.useState("");

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
