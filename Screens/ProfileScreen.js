import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../Colors';
import Avator from '../Components/Avator';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ route }) => {
  const defaultDp = "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833576.jpg"
  const [dp, setDp] = useState(defaultDp);
  const navigation = useNavigation();
  const { uname, email, phone, about } = route.params;
  const [name, setUname] = useState(uname)
  const [nAbout, setNAbout] = useState(about)
  const [nEmail, setNEmail] = useState(email)
  const [nPhone, setNPhone] = useState(phone)
  console.log(uname, email, phone)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={{ flexDirection: 'row', marginLeft: 25, marginTop: 25, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={{  marginLeft: 10, fontWeight: 'bold',fontSize:18 }}>Edit Profile</Text>
      </View>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>

        <View style={{ position: 'relative' }}>
          <Avator style={{
            marginTop: 30,

          }} w={100} h={100} i={dp} />
          <TouchableOpacity onPress={() => { }} style={styles.fab}>
            <FontAwesome name="camera" size={12} color="white" />
          </TouchableOpacity>
        </View>


      </View>
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
        <View>
          <Text style={{  marginLeft: 10, fontWeight: 'bold' ,fontSize:18}}>Username</Text>
          <View style={styles.inputContainer}>
            <Ionicons style={{ marginRight: 10 }} name="person" size={22} color={Colors.secondary} />
            <TextInput onChange={(e) => { setUname(e) }} value={name} style={styles.txt_box} placeholder='Enter new Username' />
          </View>
        </View>
      </View>

      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 15 }}>
        <View>
          <Text style={{  marginLeft: 10, fontWeight: 'bold',fontSize:18 }}>About</Text>
          <View style={styles.inputContainer}>

            <MaterialCommunityIcons style={{ marginRight: 10 }} name="message-text-outline" size={22} color={Colors.secondary} />
            <TextInput onChange={(e) => { setNAbout(e) }} value={nAbout} style={styles.txt_box} placeholder='Enter new Username' />
          </View>
        </View>
      </View>

      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 15 }}>
        <View>
          <Text style={{  marginLeft: 10, fontWeight: 'bold',fontSize:18 }}>Email</Text>
          <View style={styles.inputContainer}>
            <Entypo style={{ marginRight: 10 }} name="email" size={22} color={Colors.secondary} />

            <TextInput onChange={(e) => { setNEmail(e) }} value={nEmail} style={styles.txt_box} placeholder='Enter new Username' />
          </View>
        </View>
      </View>
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 15 }}>
        <View>
          <Text style={{  marginLeft: 10, fontWeight: 'bold',fontSize:18 }}>Phone Number</Text>
          <View style={styles.inputContainer}>

            <Feather style={{ marginRight: 10 }} name="smartphone" size={22} color={Colors.secondary} />
            <TextInput onChange={(e) => { setNPhone(e) }} value={phone} style={styles.txt_box} placeholder='Enter new Username' />
          </View>
        </View>
      </View>


      <TouchableOpacity style={{ backgroundColor: Colors.primary, marginTop: 30, marginLeft: 20, marginRight: 20, padding: 15,marginBottom:20, borderRadius: 10 }}>
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'condensedBold' }}>Save Changes</Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  fab: {
    width: 30,
    height: 30,
    borderRadius: 100,
    alignSelf: 'flex-end',
    bottom: 0,
    position: 'absolute',
    backgroundColor: Colors.primary,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    borderColor: 'black',
    width: '100%',
    borderRadius: 15,
    flexDirection: 'row',
    position: 'relative',
    borderWidth: 1,
    marginTop: 10,
    alignItems: 'center',
    padding: 12,

  },
  txt_box: {
    marginLeft: 15,
   
    width: '100%',
    marginRight: 30,
    maxWidth: 300,
  },
})