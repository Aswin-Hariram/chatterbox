import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import { Modal, ActivityIndicator } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ChatList from './ChatList'
import AddFriend from './AddFriend'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../Colors'
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import NotificationScreen from './NotificationScreen';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { fserv, firebase } from '../services/firebaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const HomeScreen = () => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false)

    const Tab = createBottomTabNavigator();
    const [usr, setUsr] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log("Home Loaded.....")
        fetch = async () => {
            setLoading(true)
            getDoc(doc(fserv.db, "User", fserv.mauth.currentUser.uid))
                .then((snap) => {
                    if (snap.exists) {
                        let uname = snap.get("username")
                        setUsr(snap)

                        if (snap.get("req")) {
                            setVisible(true)

                        }
                        if (!uname) {
                            navigation.navigate("SetupProfile")
                        }
                        setLoading(false)

                    }
                })
                .catch((err) => { setLoading(false) })
        }
        fetch()
    }, [])

    if (loading) {
        return <SafeAreaView style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
        </SafeAreaView>

    }
    else {
        return (




            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    margin: 20,
                    borderRadius: 20,
                    bottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    height: 60,

                },
                tabBarShowLabel: true
            }}>
                <Tab.Screen name="ChatList" component={ChatList} options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, focused }) => (<FontAwesome name="home" size={24} color={focused ? Colors.primary : Colors.secondary} />)
                }} />
                <Tab.Screen name="AddFriend" children={() => <AddFriend usrData={usr} />} options={{
                    tabBarLabel: "Search",
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name="person-add-alt-1" size={24} color={focused ? Colors.primary : Colors.secondary} />
                    )
                }} />
                <Tab.Screen name="NotificationScreen" children={() => <NotificationScreen visible={visible} setVisible={setVisible} />} options={{
                    tabBarLabel: "Notification",
                    tabBarIcon: ({ color, focused }) => {

                        if (!visible) {
                            return <Ionicons name="notifications-sharp" size={24} color={focused ? Colors.primary : Colors.secondary} />
                        }
                        else {
                            return <MaterialIcons name="notifications-active" size={24} color="red" />
                        }


                    }
                }} />
                <Tab.Screen name="SettingsScreen" children={() => <SettingsScreen usrData={usr} />} options={{
                    tabBarLabel: "Setting",
                    tabBarIcon: ({ color, focused }) => (<Feather name="settings" size={24} color={focused ? Colors.primary : Colors.secondary} />)
                }} />


            </Tab.Navigator>



        )
    }
}

export default HomeScreen

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        backgroundColor: "#333",
        padding: 20,

        borderRadius: 10,
        alignItems: "center",
    },
    text: {
        color: "#fff",
        marginTop: 10,
        fontSize: 16,
    },
})





