import { ActivityIndicator, Alert, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { fserv } from '../services/firebaseService'
import { Colors } from '../Colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import NotificationList from '../Components/NotificationList'
import { FlatList } from 'react-native'
import noNotification from '../assets/welcome.png'

const NotificationScreen = ({ visible, setVisible }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false)

  const fetch = async () => {
    const ref = collection(fserv.db, "/User/" + fserv.mauth.currentUser.uid + "/Friends")
    const q = query(ref, where("read", "==", "unread"), where("type", "==", "Received"), where("status", "==", false))

   onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const createdTime = doc.get("time") ? doc.get("time").toMillis() : 0; 
        usersData.push({
          id: doc.id,
          created: createdTime, 
          ...data
        })

      });
      usersData.sort((a, b) => b.created - a.created);

      setData(usersData)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (visible) {
      updateDoc(doc(fserv.db, "User", fserv.mauth.currentUser.uid), {
        req: false
      }).then(() => {
        setVisible(false)
        console.log("updated")
      })

    }



    fetch()
  }, [])

  handleRefresh = () => {
    setRefresh(true)
    fetch()
    handleRefresh(false)
  }
  if (data.length > 0) {
    return (
      <SafeAreaView style={{ backgroundColor: Colors.bg, flex: 1, marginTop: 20 }}>


        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 23, marginTop: 20 }}>Notifications</Text>

        {
          loading && <ActivityIndicator size={'large'} />

        }

        {!loading &&
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            refreshing={refresh}
            onRefresh={handleRefresh}
            renderItem={({ item }) => (

              <NotificationList
                data={item}
                allData={data}
                setAllData={setData} // Pass setData to allow updates
              />

            )}
          />

        }




      </SafeAreaView>

    )

  }
  else {
    return (
      <SafeAreaView style={{ backgroundColor: Colors.bg, flex: 1, marginTop: 20 }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 23, marginTop: 20 }}>Notifications</Text>
        <Text style={{ textAlign: 'center', fontWeight: 'condensed', fontSize: 14, marginTop: 300 }}>No Notifications found</Text>
      </SafeAreaView>
    )
  }
}

export default NotificationScreen

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