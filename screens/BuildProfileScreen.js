import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import { TextInput } from 'react-native';

import ProfileScreen from './ProfileScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { LinkingTabsConfig } from '../navigation/LinkingTabsConfig.js';
import { ScrollView } from 'react-native-gesture-handler';
import CheckboxGroup from 'react-native-checkbox-group';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-community/picker';
import * as ImagePicker from 'expo-image-picker';


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
    const options = {
        "1": "Go to artist for a dance party",
        "2": "Your signature dish",
        "3": "Last show you binged on Netflix",
        "4": "Craziest travel story"
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text>Build profile screen</Text>
                <UserInput id="first_name" placeholder="First Name" />
                <br />
                <Text></Text>
                <UserInput id="last_name" placeholder="Last Name" />
                <br />

                <MyImagePicker />
                <br />
                <Text></Text>
                <UserInput id="school" placeholder="School" />
                <br />
                <Text></Text>
                <UserInput id="age" placeholder="Age" />
                <br />
                <Text></Text>
                <UserInput id="class_year" placeholder="Class year" />
                <br />
                <Text></Text>
                <UserInput id="location" placeholder="Location" />
                <br />

                <Text>Pick four prompts</Text>
                <br />
                <MyPrompt options={options} />
                <br />
                <MyPrompt options={options} />
                <br />
                <MyPrompt options={options} />
                <br />
                <MyPrompt options={options} />
                <br />
                <Button title="Save" onPress={() => {
                    navigation.navigate("Profile")
                }} />
            </ScrollView>
        </View>
    );
}


function MyPrompt(props) {
    const options = props.options;
    const [selected, setSelected] = useState(options["1"]);
    return (
        <View>
            <Picker
                selectedValue={selected}
                style={{ height: 50, width: 300 }}
                onValueChange={(itemValue, itemIndex) =>
                    setSelected(itemValue)
                }>
                {Object.keys(options).map((key) => {
                    return (<Picker.Item label={options[key]} value={key} key={key} />) //if you have a bunch of keys value pair
                })}
            </Picker>
            <UserInput />
        </View>
    );
}

function UserInput(props) {

    const [value, onChangeText] = React.useState(props.placeholder);

    return (
        <TextInput {...props}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            defaultValue={value}
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
