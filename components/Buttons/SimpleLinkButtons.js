import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'

export default function SimpleLinkButtons({onPress,BtnName}) {
  return (
    <Pressable onPress={onPress}>
        <View style={styles.EditStudentButton}>
        <View>
          <Text>{BtnName}</Text>
        </View>
        <View><Ionicons name="chevron-forward-outline" size={24} color="black" /></View>
        </View>
    </Pressable>
  )
}

const styles=StyleSheet.create({
    EditStudentButton:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        paddingHorizontal:20,
        backgroundColor:'#fff'
      }
})