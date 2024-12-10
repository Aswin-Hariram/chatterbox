import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import person from "../assets/person.png"
import { Colors } from '../Colors';
import { collection, CollectionReference, doc, FieldValue, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { fire, fserv } from '../services/firebaseService';
import { StackActions, useNavigation } from '@react-navigation/native';
import RequestedProfilesScreen from '../Screens/RequestedProfilesScreen';

const ListItem = ({ item, usrData }) => {
    const [friend, setFriend] = useState(item.friend)
   
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.contact}

        >
            <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={{ uri: item.profilePic ? item.profilePic : "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833576.jpg" }} />
                {item.online && <View style={styles.onlineBadge} />}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.username}</Text>
                <Text style={styles.message}>{item.about}</Text>
            </View>
            {friend==='' && <Text style={styles.time} onPress={() => {
                {
                    Alert.alert("Add friend", "Do you want to add " + item.username + " to your chat list?", [
                        {
                            text: "Yes",
                            onPress: () => {
                                setFriend('sent')
                                setDoc(doc(fserv.db, "/User/" + fserv.mauth.currentUser.uid + "/Friends", item.uid), {
                                    status: false,
                                    uid: item.uid,
                                    time: new Date(),
                                    type: "Sent",
                                    username: item.username,
                                    profilePic: item.profilePic,
                                    about: item.about,
                                    read: "read"
                                })
                                    .then(() => {
                                        console.log("added1")
                                        setDoc(doc(fserv.db, "/User/" + item.uid + "/Friends", fserv.mauth.currentUser.uid), {
                                            status: false,
                                            uid: fserv.mauth.currentUser.uid,
                                            time: new Date(),
                                            type: "Received",
                                            username: usrData.get("username"),
                                            profilePic: usrData.get("profilePic"),
                                            about: usrData.get("about"),
                                            read: "unread"
                                        })
                                            .then(() => {
                                                doc_ref = doc(fserv.db, "User", fserv.mauth.currentUser.uid)
                                                updateDoc(doc_ref, {
                                                    req: true
                                                })

                                                doc_ref = doc(fserv.db, "User", item.uid)
                                                updateDoc(doc_ref, {
                                                    req: true
                                                })
                                            })
                                    })

                                    .catch((e) => {
                                        console.log(e)
                                    })
                            }
                        },
                        {
                            text: "No"
                        }
                    ])
                }
            }}>Invite</Text>}
            {friend==='sent' && <Text style={styles.time} onPress={()=>{
                Alert.alert("Remove request","Do you want to remove request",[
                    {
                        text:"Yes",
                        onPress:()=>{
                            navigation.dispatch(StackActions.push("RequestedProfilesScreen"))
                        }
                    },{
                        text:"No",
                        onPress:()=>{}
                    }
                ])
            }}>Requested</Text>}
            {friend==='rec' && <Text onPress={()=>{
                navigation.navigate("NotificationScreen")
            }} style={styles.time}>view notification</Text>}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: { flex: 1, marginTop: 20 },
    header: { fontSize: 24, fontWeight: 'condensedBold', marginBottom: 20, color: 'black', textAlign: 'center', },
    contact: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,

    },
    avatarContainer: { position: 'relative' },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
    onlineBadge: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4CAF50',
        position: 'absolute',
        bottom: 0,
        right: 5,
        borderWidth: 2,
        borderColor: '#fff',
    },
    textContainer: { flex: 1 },
    name: { fontWeight: 'bold', color: 'black', fontSize: 15 },
    message: { color: '#7D7D7D' },
    time: { color: Colors.primary, fontSize: 15 },
});
export default ListItem