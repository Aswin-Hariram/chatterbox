import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import welcome from "../assets/welcome.png"
import { Colors } from '../Colors'

const Avator = ({style,w,h,i}) => {

  
  return (
    <View style={style}>
        
        <Image source={{uri:i}} style={{
        width: w,
        height: h,
        objectFit: 'cover',
        borderRadius:100,
        borderWidth:1,
        shadowOffset:100,
        shadowColor:Colors.secondary,
        zIndex:1,
        borderColor:Colors.secondary,
        
      }} />
    </View>
  )
}

export default Avator

const styles = StyleSheet.create({})