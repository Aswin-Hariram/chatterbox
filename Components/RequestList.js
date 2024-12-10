import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { fserv } from '../services/firebaseService'
import { Colors } from '../Colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const RequestList = ({ data, setAllData }) => {


    async function handleAcceptReject(type) {
        const docRef = doc(fserv.db, `User/${fserv.mauth.currentUser.uid}/Friends`, data.uid);
        try {

            await updateDoc(docRef, { type: type,read:"read",status:type==="Accept"?true:false });

            const docRef1 = doc(fserv.db, `User/${data.uid}/Friends`, fserv.mauth.currentUser.uid);
            await updateDoc(docRef1, { type: type,read:"read",status:type==="Accept"?true:false });

            console.log("Successfully Updated...");



            setAllData((prevData) => prevData.filter((item) => item.uid !== data.uid));
        } catch (error) {
            console.error("Error rejecting request:", error);
        }
    }
    return (
        <View style={{ marginTop: 15 }}>
       
            <View style={styles.contact}>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={{ uri: data.profilePic ? data.profilePic : "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833576.jpg" }} />
                    {/* {item.online && <View style={styles.onlineBadge} />} */}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{data.username}</Text>
                    <Text style={styles.message}>{data.about}</Text>
                </View>
             
                <TouchableOpacity onPress={() => {
                    Alert.alert("Reject Request", `Do you want to remove the ${data.username} request?`, [
                        {
                            text: "Yes",
                            onPress: () => { handleAcceptReject("Unsent") }
                        },
                        {
                            text: "No",
                        }
                    ])
                }} style={{ borderWidth: 0.5, borderRadius: 50, padding: 10, backgroundColor: "#fa6649", borderColor: 'white' }}>
                    <AntDesign name="close" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RequestList

const styles = StyleSheet.create({
    container: { flex: 1, marginTop: 10 },
    header: { fontSize: 24, fontWeight: 'condensedBold', marginBottom: 20, color: 'black', textAlign: 'center', },
    contact: {
        flexDirection: 'row',
        alignItems: 'center',

        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginLeft: 20,
        marginRight: 20

    },
    avatarContainer: { position: 'relative' },
    avatar: { width: 65, height: 65, borderRadius: 50, marginRight: 10 },
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