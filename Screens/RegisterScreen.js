import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import welcome from '../assets/register.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../Colors';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { fserv } from '../services/firebaseService';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';


//
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setCPass] = useState('');
  const emailRef = useRef(null);
  
  useEffect(()=>{
    onAuthStateChanged(fserv.mauth,(usr)=>{
      if(usr){
        navigation.reset({
          index:0,
          routes: [{ name: "HomeScreen" }], 
        })
          
      }
    })
   
  },[])

  async function saveToFirestore(){
    let usr =fserv.mauth.currentUser;
    const data = {
        email:usr.email,
        uid:usr.uid,
        about:"New user to chatterbox",
        status:"Online"
    }
   let usr_uid = usr.uid;
    const doc_ref = doc(collection(fserv.db,"User"),usr_uid);
   await setDoc(doc_ref,data).then((value)=>{
      console.log(value)
      
    })
    .catch((err)=>{console.log(err)})
     

  
  }

  function valid(){
  
    if(email.length===0){
      alert("Invalid email address");
     
      return false
    }
    else if(pass.length===0){
      alert("Invalid password");
      return false
    }
    else if(cpass.length===0){
      alert("Invalid confirm password");
      return false
    }
    else if(cpass!==pass){
      alert("Confirm password does not match");
      return false
    }
   return true
  }
  function handleRegister(){
    
    if(valid()){
      createUserWithEmailAndPassword(fserv.mauth,email,pass)
        .then((usr_cred)=>{
          if(usr_cred){
            console.log(usr_cred)
           
             saveToFirestore();
           
          }
        })
        .catch((err)=>{console.log(err)})
      
      
    }
  }

  return (
    <SafeAreaView style={styles.container}>
     
      <Text style={{ fontSize: 35, fontWeight: 'condensedBold' }}>Register</Text>
      <Image source={welcome} style={{
        width: 250,
        height: 250,
        objectFit: 'contain'
      }} />


      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color={Colors.secondary} />
        <TextInput useRef={emailRef} onChangeText={(e)=>{setEmail(e)}} value={email} style={styles.txt_box} placeholder='Enter your email address' />
        {
          email.length!==0&&<TouchableOpacity style={{ position: 'absolute', right: 15 }} >
          <AntDesign onPress={(e)=>{
            console.log("clear pressed")
            setEmail("");
            
          }} name="closecircle" size={24} color={Colors.secondary} />
        </TouchableOpacity>
        }
      </View>
      <View style={styles.inputContainer}>
        <Feather name="lock" size={23} color={Colors.secondary} />
        <TextInput onChangeText={(e)=>{setPass(e)}} style={styles.txt_box} placeholder='Create password' secureTextEntry={false} />
      </View>
      <View style={styles.inputContainer}>
        <Feather name="lock" size={23} color={Colors.secondary} />
        <TextInput onChangeText={(e)=>{setCPass(e)}} style={styles.txt_box} placeholder='Confirm password' />
      </View>


      <TouchableOpacity onPress={handleRegister} style={styles.btn}>
        <Text style={{ color: 'white' }}>Register</Text>
      </TouchableOpacity>

      <Text onPress={() => { navigation.navigate('LoginScreen') }} style={{ marginTop: 20 }}>Already have an account? click here</Text>

        
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingStart: 35,
    paddingEnd: 35,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  inputContainer: {
    borderColor: 'black',
    width: '100%',
    borderRadius: 15,
    flexDirection: 'row',
    position: 'relative',
    borderWidth: 1,
    marginTop: 15,
    alignItems: 'center',
    padding: 11,

  },
  btn: {
    backgroundColor: Colors.primary,
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
    padding: 15,

  },
  txt_box: {
    marginLeft: 15,
    fontSize: 16,
  },
})