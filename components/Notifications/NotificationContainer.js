import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function NotificationContainer({fName,lName,Date,TimeIn,TimeOut}) {
  return (
    <View style={styles.NotificationContainer}>
          <View style={styles.titleGroup}>
            <View style={styles.StudentNamesIcon}><AntDesign name="user" size={20} color="white" /></View>
            <View><Text style={styles.StudentNames}>{fName} {lName}</Text></View>
          </View>
          <View style={styles.textGroup}>
            <View><Text>Date: </Text></View>
            <View><Text>{Date}</Text></View>
          </View>
          <View style={styles.TimeInTimeOut}>
          <View style={styles.textGroup}>
            <View><Text style={styles.timeIn}>Time In: </Text></View>
            <View><Text style={styles.timeIn}>{TimeIn}</Text></View>
          </View>
          <View style={styles.textGroup2}>
            <View style={styles.textGroup}>
            <View><Text style={styles.timeOut}>Time Out: </Text></View>
            <View><Text style={styles.timeOut}>{TimeOut}</Text></View>
            </View>
          </View>
          </View>
        </View>
  )
}
const styles=StyleSheet.create({
    NotificationContainer:{
      backgroundColor:'white',
        // borderColor:'#47B84D',
        // borderWidth:1,
        margin:10,
        padding:10
      },
      TimeInTimeOut:{
        display:'flex',
        flexDirection:'column'
      },
      StudentNames:{
        textTransform:'capitalize',
        fontWeight:'bold',
        fontSize:16,
        paddingVertical:5,
        paddingHorizontal:10
      },
      StudentNamesIcon:{
        backgroundColor:'#47B84D',
        borderRadius:10,
        padding:3
      },
      titleGroup:{
        // fontWeight:'bold',
        flexDirection:'row',
        alignContent:'center',
        // backgroundColor:'#D9D9D9',
        padding:5,
        alignItems:'center'
      },
      textGroup:{
        padding:5,
        alignItems:'center',
        flexDirection:'row',
        alignContent:'center',
      },
      textGroup2:{
        // padding:5,
        alignItems:'center',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between',
      },
      timeOut:{
        color:'red',
        fontWeight:'bold'
      },
      timeIn:{
        color:'#47B84D',
        fontWeight:'bold'
      },
})