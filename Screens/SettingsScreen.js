import { Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fserv } from '../services/firebaseService'
import Entypo from '@expo/vector-icons/Entypo';
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Colors } from '../Colors'
import RequestedProfilesScreen from './RequestedProfilesScreen';



const SettingsScreen = ({usrData}) => {
    const navigation = useNavigation()

   
    function handleSignout() {
        signOut(fserv.mauth)
        onAuthStateChanged(fserv.mauth, (usr) => {
           navigation.navigate("RegisterScreen")
            
        })

    }

    return (
        <SafeAreaView style={styles.main_container}>

            <Text style={{textAlign:'center',fontSize:24,marginBottom:20,marginTop:20,marginBottom:10,fontWeight:'bold'}}>Settings</Text>

            <TouchableOpacity
                style={styles.contact}
                onPress={() => {
                    navigation.dispatch(StackActions.push("ProfileScreen",{
                        uname:usrData.get("username"),
                        email:usrData.get("email"),
                        phone:usrData.get("phonenumber"),
                        about:usrData.get("about")
                    }))
                }}
            >
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={{ uri: usrData.get("profilePic")?usrData.get("profilePic"):"https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833576.jpg" }} />
                    {/* {item.online && <View style={styles.onlineBadge} />} */}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{usrData.get("username")}</Text>
                    <Text style={styles.message}>{usrData.get("about")}</Text>
                </View>
                <Text style={styles.time}>Edit</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.contact}
                onPress={() => {
                  navigation.dispatch(StackActions.push("RequestedProfilesScreen"))
                }}
            >
               
                <View style={styles.textContainer}>
                    <Text style={{...styles.name,fontWeight:'condensedBold'}}>View Requested Profiles</Text>
                    
                </View>
                <Entypo name="chevron-right" size={24} color={Colors.primary} />
            </TouchableOpacity>

            <Button onPress={() => { handleSignout() }} title='Signout' />
        </SafeAreaView>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    main_container: {
        margin: 20,
        
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
    time: { color: Colors.primary, fontSize: 15 }, container: { flex: 1, marginTop: 20 },
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
    time: { color: Colors.primary, fontSize: 17,fontWeight:400 },
});