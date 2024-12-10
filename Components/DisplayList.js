import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DisplayList = ({user}) => {
  return (
    <View>
      <Text>{user.email}</Text>
    </View>
  )
}

export default DisplayList

const styles = StyleSheet.create({})