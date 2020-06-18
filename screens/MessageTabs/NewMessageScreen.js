import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import * as firebase from "firebase";

async function getChatsAndMessages(userID, chats, setChats, messages, setMessages) {
    var chatIDs = [];
    var promise = await firebase.database().ref("chats/").once('value').then(function (snapshot) {
        for (const key in snapshot.val()) {
            console.log("key: ", key);
            console.log("key as string", key.toString());
            var keyAsString = key.toString();
            const chat = snapshot.val()[key];
            const user1ID = chat["user1ID"].toString().trim();
            const user2ID = chat["user2ID"].toString().trim();
            if (user1ID === userID || user2ID === userID) {
                var Me = userID.toString().trim();
                var MyContact = userID;

                if (user1ID === userID) {
                    MyContact = chat["user2ID"];
                } else {
                    Me = chat["user2ID"];
                }

                setChats({
                    ...chats, [key]:
                        {
                            "Me": Me,
                            "MyContact": MyContact,
                            "timeCreated": chat["timeCreated"],
                            "read": chat["read"]
                        }
                });
                chatIDs.push(keyAsString); // add chatID to list
            }
        }
    });

    messageDict = {};
    promise = await firebase.database().ref("messages/").once('value').then(function (snapshot) {
        for (const key in snapshot.val()) {
            const message = snapshot.val()[key];
            const currentChatID = message["chatID"];
            if (chatIDs.includes(currentChatID)) {
                if (messageDict[currentChatID]) { // there are messages from this chat exist yet
                    var value = messageDict[currentChatID]; // get list of messages already saved in dict

                    value.push({
                        "authorID": message["authorID"],
                        "content": message["content"],
                        "read": message["read"],
                        "timestamp": message["timestamp"]
                    });
                    messageDict[currentChatID] = value;
                } else { // no messages from this chat yet
                    messageDict[currentChatID] = {
                        "authorID": message["authorID"],
                        "content": message["content"],
                        "read": message["read"],
                        "timestamp": message["timestamp"]
                    };
                }
            }
        }
    });

    console.log("messageDict: ", messageDict);

    for (const key in messageDict) {
        setMessages({
            ...messages, [key]:
                messageDict[key]
        });
    }
}

export default function NewMessageScreen() {

    var userId = ""; // user ID
    const [chats, setChats] = useState({});
    const [messages, setMessages] = useState({});

    const displayChatInfo = [];
    const displayMessageInfo = [];

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            userId = user.uid;

            console.log("hello " + userId);

            // get chats
            getChatsAndMessages(userId, chats, setChats, messages, setMessages);

        } else {
            // No user is signed in.
            navigation.navigate("Login");
        }
    });

    //console.log(chats);
    //console.log(messages);
    // convert chat and message info to lists
    for (key in messages) {
        displayChatInfo.push(chats[key]);
        displayMessageInfo.push(messages[key]);
    }

    //console.log("displayChatInfo", displayChatInfo);
    console.log("displayMsgInfo", displayMessageInfo);


    return (
        <View style={styles.container}>
            <Text>Welcome! This will be the NEW message screen.</Text>

            <FlatList
                data={displayMessageInfo}
                renderItem={({ item }) => <Item content={item.content}
                />}
            />
        </View>
    );
};

function Item({ content }) {
    return (
        <View>
            <Text>{content}</Text>
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
