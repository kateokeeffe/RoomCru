import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import * as firebase from "firebase";

function addChatInfo(userID, key, chat, chats, setChats, chatIDs, setChatIDs) {

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
                    "ChatID": key,
                    "Me": Me,
                    "MyContact": MyContact,
                    "timeCreated": chat["timeCreated"],
                    "read": chat["read"]
                }
        });
        setChatIDs(chatIDs.concat(key.toString()));
    }
}

function addMessageInfo(key, messageID, message, messages, setMessages) {
    if (messages[key]) { // there are messages from this chat already
        var value = messages[key]; // get list of messages already saved in dict

        value.push({
            "messageID": messageID,
            "authorID": message["authorID"],
            "content": message["content"],
            "read": message["read"],
            "timestamp": message["timestamp"]
        });
        setMessages({
            ...messages, [key]:
                value
        });
    } else { // no messages from this chat yet
        setMessages({
            ...messages, [key]:
                [{
                    "messageID": messageID,
                    "authorID": message["authorID"],
                    "content": message["content"],
                    "read": message["read"],
                    "timestamp": message["timestamp"]
                }]
        });
    }
}

export default function NewMessageScreen() {

    var userId = ""; // user ID
    const [chats, setChats] = useState({});
    const [messages, setMessages] = useState({});
    const [chatIDs, setChatIDs] = useState([]);

    const displayChatInfo = [];
    const displayMessageInfo = [];

    var isPopulated = false;

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            userId = user.uid;

            //console.log("hello " + userId);

            firebase.database().ref("chats/").once('value').then(function (snapshot) {
                //testFunc(snapshot.val()["1"], setChats);
                //setChats(snapshot.val()["1"]);
                for (const key in snapshot.val()) {
                    addChatInfo(userId, key, snapshot.val()[key], chats, setChats, chatIDs, setChatIDs);
                }
            });

            firebase.database().ref("messages/").once('value').then(function (snapshot) {
                var numChildren = snapshot.numChildren();
                console.log("numChildren: ", numChildren);
                for (key in snapshot.val()) {
                    //console.log("key: ", key);
                    //console.log("snapshot val: ", snapshot.val()[key]);
                    if (numChildren == 0) {
                        break;
                    }
                    if (chatIDs.includes(snapshot.val()[key]["chatID"])) { // if message is in a relevant chat
                        addMessageInfo(snapshot.val()[key]["chatID"], key, snapshot.val()[key], messages, setMessages);
                    }
                    numChildren--;
                }
            });

            /* console.log("chats", chats);
            console.log("messages", messages); */

            // get chats
            /* if (!isPopulated) {
                getChats(userId, chats, setChats, chatIDs, setChatIDs);
                getMessages(chatIDs, setChatIDs, messages, setMessages);
                isPopulated = true;
            } */
        } else {
            // No user is signed in.
            navigation.navigate("Login");
        }
    });

    // console.log(chats);
    // console.log(messages);
    // convert chat and message info to lists
    /* for (key in messages) {
        displayChatInfo.push(chats[key]);
        displayMessageInfo.push(messages[key]);
    } */

    //console.log("displayChatInfo", displayChatInfo);
    //console.log("displayMsgInfo", displayMessageInfo);


    return (
        <View style={styles.container}>
            <Text>Welcome! This will be the NEW message screen.</Text>

            <FlatList
                data={displayMessageInfo}
                keyExtractor={(item) => item.messageID}
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
