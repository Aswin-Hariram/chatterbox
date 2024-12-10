import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import welcome from '../assets/welcome.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../Colors';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { fserv } from '../services/firebaseService';


const LoginScreen = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


  function valid(){
  
    if(email.length===0){
      alert("Invalid email address");
     
      return false
    }
    else if(pass.length===0){
      alert("Invalid password");
      return false
    }
    
   return true
  }

  function handleLogin(){
    if(valid()){
        signInWithEmailAndPassword(fserv.mauth,email,pass).then((usr_cred)=>{
            if(usr_cred){
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  }
    return (
        <SafeAreaView style={styles.parentContainer}>
        
            <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate("RegisterScreen") }} style={styles.arrow}>
                <Ionicons name="arrow-back-sharp" size={27} color="black" />
            </TouchableOpacity>
                <Text style={{ fontSize: 35, fontWeight: 'condensedBold' }}>Login</Text>
                <Image source={welcome} style={{
                    width:200,
                    height:200,
                    objectFit:'contain',
                }}/>


                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={24} color={Colors.secondary} />
                    <TextInput onChangeText={(e)=>{setEmail(e)}} style={styles.txt_box} placeholder='Enter your email address' />
                </View>
                <View style={styles.inputContainer}>
                    <Feather name="lock" size={23} color={Colors.secondary} />
                    <TextInput onChangeText={(e)=>{setPass(e)}} style={styles.txt_box} placeholder='Enter your password' secureTextEntry={true} />
                </View>
                
                

                <TouchableOpacity onPress={handleLogin} style={styles.btn}>
                    <Text style={{ color: 'white' }}>Login</Text>
                </TouchableOpacity>

                <Text onPress={() => { navigation.navigate("RegisterScreen") }} style={{ marginTop: 20 }}>Dont have an account? click here</Text>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    arrow: {
        position: 'absolute',
        top: 25, // Adjust to place it at the top
        left: 25, // Add this to position it from the left edge
        zIndex: 1, // E
        

    },
    parentContainer: {
       
        flex: 1,

    },
    container: {
        flex: 1,
        height:'100%',
        alignItems: 'center',
        paddingStart: 35,
        paddingEnd: 35,
        justifyContent: 'center',
        position:'relative',
        backgroundColor: 'white'
    },
    inputContainer: {
        borderColor: 'black',
        width: '100%',
        borderRadius: 15,
        flexDirection: 'row',
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