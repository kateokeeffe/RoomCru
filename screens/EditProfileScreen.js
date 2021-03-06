import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import { TextInput } from 'react-native';

import ProfileScreen from './ProfileScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { LinkingTabsConfig } from '../navigation/LinkingTabsConfig.js';
import { ScrollView } from 'react-native-gesture-handler';
import CheckboxGroup from 'react-native-checkbox-group';
import { useState, useEffect } from 'react';
//import Dialog, { DialogContent } from 'react-native-popup-dialog';

export default function EditProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text></Text>
                <UserInput id="first_name" placeholder="First Name" />
                <br />
                <Text></Text>
                <UserInput id="last_name" placeholder="Last Name" />
                <br />

                <Text id="photo">Photo</Text>
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
                <Text></Text>
                <UserInput id="prompt1" placeholder="Prompt 1" />
                <br />
                <Text></Text>
                <UserInput id="prompt2" placeholder="Prompt 2" />
                <br />
                <Text></Text>
                <UserInput id="prompt3" placeholder="Prompt 3" />
                <br />

                <MyMultChoice />

                <Button title="Save" onPress={() => {
                    navigation.navigate("Profile")
                }} />
            </ScrollView>
        </View>
    );
};

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

// return warning if length of selected is greater than 1
function handleSelection(selected) {
    /* if (selected.length > 1) {
        //Alert.alert("Warning", "You can only choose one gender", [], []);
        return (
            <Dialog
                shouldUpdate={true}
                visible={true}
                onTouchOutside={() => {
                    { visible: false };
                }}
            >
                <DialogContent>
                    {"You cannot choose more than one gender."}
                </DialogContent>
            </Dialog>
        );
    } */
}

function MyMultChoice() {

    const [maleChecked, setMaleChecked] = useState(false);
    const [femaleChecked, setfemaleChecked] = useState(false);
    const [nbChecked, setNbChecked] = useState(false);
    const [otherChecked, setOtherChecked] = useState(false);

    return (
        <View>
            <CheckboxGroup
                callback={(selected) => { handleSelection(selected) }}
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
                    },
                    {
                        label: " Other",
                        value: 4,
                        selected: otherChecked
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
