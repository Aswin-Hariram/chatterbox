import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import SetupProfile from './Screens/SetupProfile';
import ProfileScreen from './Screens/ProfileScreen';
import RequestedProfilesScreen from './Screens/RequestedProfilesScreen';
import { fserv } from './services/firebaseService';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';


export default function App() {
 const [lstatus,setStatus] = useState(false)


  const Stack = createNativeStackNavigator()

  useEffect(()=>{
    onAuthStateChanged(fserv.mauth,(usr)=>{
      if(usr){
       setStatus(true)
          
      }
    })
  },[])
  console.log(lstatus)
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName={lstatus?'HomeScreen':'RegisterScreen'} screenOptions={{headerShown:false}} >
     <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
     <Stack.Screen name='LoginScreen' component={LoginScreen} />
     <Stack.Screen name='HomeScreen' component={HomeScreen} />
     <Stack.Screen name='SetupProfile' component={SetupProfile} />
     <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
     <Stack.Screen name='RequestedProfilesScreen' component={RequestedProfilesScreen} />
     </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
