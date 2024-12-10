import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avator from '../Components/Avator'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import person from "../assets/person.png"
import { Colors } from '../Colors';
import * as ImagePicker from 'expo-image-picker'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TextInput } from 'react-native';
import { ref } from 'firebase/storage'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { fserv, storage } from '../services/firebaseService';
import { getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const SetupProfile = () => {
    const formatDate = (date) => `${String(date.getDate()).padStart(2, '0')} ${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`;
    const [showDate, setShowDate] = useState(false)
    const [today, setToday] = useState(formatDate(new Date()))
    const [modalVisible, setModalVisible] = useState(false);
    const defaultDp = "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833576.jpg"
    const [dp, setDp] = useState(defaultDp);
    const [curBlob, setBlob] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const navigation = useNavigation()
    function onChange(e, selectedDate) {
        setShowDate(false)

        setToday(formatDate(selectedDate))
        console.log(today)
    }

     const saveToFirestore = async (url) => {
        console.log(url)
       const doc_ref =  doc(fserv.db,"User",fserv.mauth.currentUser.uid)
       setDoc(doc_ref,{
        username:username,
        phonenumber:"+91"+phone,
        dob:today,
        profilePic:url

       },{merge:true})
       .then(()=>{
        console.log("doneee")
        navigation.reset({
            index:0,
            routes: [{ name: "HomeScreen" }], 
        })
       })
       .catch((err)=>{
        console.log(err)
       })
    }
    function valid(){
        if(username.length===0){
            alert("Username cannot be empty")
            return false;
        }
        return true
    }

    function handleSubmit() {


        if (valid) {
            try {
                if(curBlob.length===0){
                    saveToFirestore('');
                }
                else{
                    const storageRef = ref(storage, fserv.mauth.currentUser.email + "/" + (new Date().getTime()))
                const upload = uploadBytesResumable(storageRef, curBlob)
                upload.then((snap) => {
                    getDownloadURL(upload.snapshot.ref).then(async (url) => {
                        saveToFirestore(url);
                    })
                })
                }
            }
            catch (err) {
                console.log(err)
            }
        }

    }

    const saveImage = async (image) => {

        try {
            setDp(image)
            const res = await fetch(image)
            const bl = await res.blob()
            setBlob(bl)
            setModalVisible(false)
        }
        catch (err) {
            alert(err.message);
        }
    }
    async function openGallery() {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });
            if (!result.canceled) {
                await saveImage(result.assets[0].uri)

            }
        }
        catch (err) {
            alert("Error uploading image: " + err.message)
            setModalVisible(false)
        }
    }
    async function openCamera() {
        try {
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.front,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,

            });
            if (!result.canceled) {
                await saveImage(result.assets[0].uri)

            }
        }
        catch (err) {
            alert("Error uploading image: " + err.message)
            setModalVisible(false)
        }
    }

    return (
        <SafeAreaView style={styles.conatiner}>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}

            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Profile Picture</Text>

                        <TouchableOpacity style={styles.option} onPress={() => {
                            console.log("Open Camera");
                            openCamera();
                            setModalVisible(false);
                        }}>
                            <FontAwesome name="camera" size={24} color={Colors.primary} />
                            <Text style={styles.optionText}>Open Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.option} onPress={() => {
                            console.log("Open Gallery");
                            openGallery();
                            setModalVisible(false);
                        }}>
                            <MaterialIcons name="photo-library" size={24} color={Colors.primary} />
                            <Text style={styles.optionText}>Open Gallery</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.option} onPress={() => {
                            console.log("Remove Picture");
                            Alert.alert("Are you sure", "Do you want to remove the picture?", [
                                {
                                    text: "Yes",
                                    onPress: () => { setDp(defaultDp) }
                                },
                                {
                                    text: "No",
                                    onPress: () => { }
                                }
                            ])
                            setModalVisible(false);
                        }}>
                            <MaterialIcons name="delete" size={24} color="red" />
                            <Text style={[styles.optionText, { color: "red" }]}>Remove Picture</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.option, styles.cancelButton]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ fontSize: 35, fontWeight: 'condensedBold' }}>Create Profile</Text>
                    <View style={{ position: 'relative' }}>
                        <Avator style={{
                            marginTop: 30,

                        }} w={150} h={150} i={dp} />
                        <TouchableOpacity onPress={() => { setModalVisible(true) }} style={styles.fab}>
                            <FontAwesome name="camera" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.box}>
                    <MaterialIcons name="person" size={24} color={Colors.secondary} />

                    <TextInput onChangeText={(e) => { setUsername(e) }} placeholder="Username" style={{ fontSize: 18, marginLeft: 15 }} />

                </View>
                <View style={styles.box}>
                    <MaterialIcons name="phone-android" size={24} color="black" />
                    <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: 'condensedBold' }}>+91</Text>
                    <TextInput onChangeText={(e) => { setPhone(e) }} inputMode='numeric' placeholder="Phone number" style={{ marginLeft: 8, fontSize: 18 }} />

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'condensedBold' }}>D.O.B. </Text>
                    {
                        Platform.OS === 'ios' && <RNDateTimePicker onChange={onChange}  maximumDate={new Date()} value={new Date()} />
                    }
                    {
                        Platform.OS === 'android' &&
                        <View>
                            <TouchableOpacity onChange={onChange}  onPress={() => (setShowDate(true))} style={{
                                backgroundColor: "#E2E2E2",
                                padding: 8,
                                borderRadius: 8,
                                justifyContent: 'center'
                            }}>
                                <Text style={{ fontSize: 15, fontWeight: 'condensedBold' }}> {today}</Text>
                            </TouchableOpacity>
                            {showDate && <RNDateTimePicker onChange={onChange} maximumDate={new Date()} value={new Date()} />}
                        </View>
                    }

                </View>
                <TouchableOpacity onPress={handleSubmit} style={{
                    alignSelf: 'baseline',
                    marginTop: 35,
                    width: '100%',
                    backgroundColor: Colors.primary,
                    padding: '15',
                    borderRadius: 7,
                    bottom: 10,
                }}>
                    <Text style={{ color: "white", fontSize: 15, textAlign: 'center' }}>Submit</Text>
                </TouchableOpacity>

            </View>



        </SafeAreaView>
    )
}

export default SetupProfile

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,

        margin: 30,

    },
    fab: {
        width: 60,
        height: 60,
        borderRadius: 100,
        alignSelf: 'flex-end',
        bottom: 0,
        position: 'absolute',
        backgroundColor: Colors.primary,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {

        borderColor: 'black',
        width: '100%',
        borderRadius: 15,
        flexDirection: 'row',
        position: 'relative',
        borderWidth: 1,
        alignContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        padding: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    optionText: {
        fontSize: 16,
        marginLeft: 10,
    },
    cancelButton: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 16,
        color: Colors.secondary,
    },
})