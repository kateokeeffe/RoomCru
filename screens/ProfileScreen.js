import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import BottomTabNavigator from '../navigation/BottomTabNavigator.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';

function DefaultView(props) {
    const navigation = props.navigation;
    return (
        <View style={styles.container}>
            <Text>Welcome! This will be the profile screen.</Text>
            <Button title="Edit Profile" onPress={() => {
                navigation.navigate("Edit Profile")
            }} />
            <Text id="name">Name</Text>
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
    const isEditScreen = props.edit_screen;
    const no_profile = props.no_profile;
    if (isEditScreen !== 1 && no_profile === 1) {
        return (
            <BuildProfileView navigation={props.navigation} />
        );
    } else if (isEditScreen !== 1 && no_profile === 0) {
        return (
            <DefaultView navigation={props.navigation} />
        );
    }
}

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

export default function ProfileScreen({ route, navigation }) {

    return (
        <View>
            <ProfileView navigation={navigation} edit_profile={0} no_profile={1} />
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
