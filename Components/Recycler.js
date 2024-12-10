import React, { useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import person from "../assets/person.png"
import { Colors } from '../Colors';
import ListItem from './ListItem';


const Recycler = ({ contacts,usrData }) => {

  return (
    <SafeAreaView style={styles.container} >
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
         
          <ListItem  item={item} usrData={usrData}/>
        )}
      />
    </SafeAreaView >
  );



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

export default Recycler;
