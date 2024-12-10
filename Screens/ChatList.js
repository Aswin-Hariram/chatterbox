import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { fserv } from '../services/firebaseService';
import { getDoc } from 'firebase/firestore';

const contacts = [
  { id: '1', name: 'Phillip Franci', message: 'Hey, it’s been a while...', time: '10:00 am', online: true },
  { id: '2', name: 'Alfredo Saris', message: 'Good Morning!', time: '08:00 am', online: false },
  { id: '3', name: 'Tatiana Dorwart', message: 'Okay, thanks!', time: '06:10 am', online: true },
  // Add more contacts
];

const ChatList = ({ navigation }) => {



  return <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Messages</Text>
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.contact}
          onPress={() => {
            Alert.alert("Add to chat", "Do you want " + "to your chat list?", [
              {
                text: "Yes",
                onPress: () => {

                },
              },
              {
                text:"No",
                onPress:()=>{

                
                }
              }
            ])
          }}
        >
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{ uri: 'https://via.placeholder.com/50' }} />
            {item.online && <View style={styles.onlineBadge} />}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </TouchableOpacity>
      )}
    />
  </SafeAreaView>
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f7f8fc' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#3A3D47' },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
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
  name: { fontWeight: 'bold', color: '#3A3D47' },
  message: { color: '#7D7D7D' },
  time: { color: '#A5A5A5', fontSize: 12 },
});

export default ChatList;
