import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import { TextInput } from 'react-native';

import ProfileScreen from './ProfileScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { LinkingTabsConfig } from '../navigation/LinkingTabsConfig.js';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import CheckboxGroup from 'react-native-checkbox-group';
import { useState, useEffect } from 'react';
import { Picker } from 'react-native'; //'@react-native-community/picker';
import * as ImagePicker from 'expo-image-picker';
//import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Autocomplete from 'react-native-autocomplete-input';
import * as firebase from "firebase";

function ImagePickerExample(props) {

    const image = props.image;
    const setImage = props.setimage;

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'ios') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'left', justifyContent: 'center', width: 300, height: 75 }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}

function GooglePlacesInput() {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            query={{
                key: 'AIzaSyDcBpxH6UaC6tR3lM4P - _LhCw7YjR5Plz0',
                language: 'en'
            }}
        />
    );
};
function fetchLocations(text, setData) {

    fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=(cities)&country=US&key=AIzaSyDcBpxH6UaC6tR3lM4P - _LhCw7YjR5Plz0`, { mode: 'no-cors' })
        .then(res => {
            //res.set('Access-Control-Allow-Origin', '*');
            // set data
            console.log(res);
            setData(res); //(['Place 1', 'Place 2']);

        })
        .catch(err => console.log(err));
}

function LocAutocomplete(props) {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    return (
        <View>
            <UserInput
                placeholder={props.placeholder}
                value={query}
                onChangeText={text => { setQuery(text); fetchLocations(text, setData) }}
            />
            <FlatList
                data={data}
                renderItem={({ item, i }) => (
                    <TouchableOpacity onPress={() => { setQuery(item); setData([]); props.setVar(item); }}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

// returns empty list if query is empty, or filtered list if query is not empty
function getNewList(mylist, query) {
    if (query.length > 0) {
        return mylist.filter(word => word.startsWith(query));
    }
    return [];
}

function SchoolAutocomplete(props) {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    //const mylist = { 1: "Rutgers", 2: "Rowan", 3: "Rochester Institute of Technology", 4: "NYU" };
    const mylist = props.mylist;//["Rutgers", "Rowan", "Rochester Institute of Technology", "NYU"];


    return (
        <View>
            <UserInput
                placeholder={props.placeholder}
                value={query}
                onChangeText={text => { setQuery(text); setData(getNewList(mylist, text)) }}
            />
            <FlatList
                data={data}
                renderItem={({ item, i }) => (
                    <TouchableOpacity onPress={() => { setQuery(item); setData([]); props.setVar(item); }}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
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
        "1": "Go to artist for a dance party",
        "2": "Your signature dish",
        "3": "Last show you binged on Netflix",
        "4": "Craziest travel story"
    };

    var class_years = {};
    var date = new Date();
    var current_year = date.getFullYear();
    var counter = 1;
    for (var i = current_year; i <= current_year + 6; i++) {
        console.log(counter.toString());
        class_years[counter.toString()] = i;
        counter++;
    }

    const [image, setImage] = useState(null);
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

    const schools = ["Rutgers", "Rowan", "Rochester Institute of Technology", "NYU"];
    const locations = ["NYC", "New Brunswick", "Upstate NY"];


    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text>Build profile screen{"\n"}</Text>

                <Text>{"\n"}</Text>

                <SchoolAutocomplete placeholder="School" setVar={setSchool} mylist={schools} />

                <Text>{"\n"}</Text>

                <ImagePickerExample image={image} setimage={setImage} />
                <Text>{"\n"}*Date of birth*</Text>

                <Text> {"\n"}Class year</Text>
                <MyPicker options={class_years} setclassyear={setclassyear} />

                <Text>{"\n"}</Text>
                <Text>For mobile:</Text>
                <GooglePlacesInput />
                <LocAutocomplete placeholder="Location" setVar={setloc} mylist={locations} />

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
                <Text>{"\n"}</Text>
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
