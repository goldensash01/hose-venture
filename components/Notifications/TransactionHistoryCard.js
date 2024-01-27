import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TransactionCard({pName,sName,date,amount}) {
  return (
    <View style={styles.NotificationContainer}>
          <View style={styles.titleGroup}>
            <View style={styles.StudentNamesIcon}><MaterialCommunityIcons name="bank-transfer" size={24} color="white" /></View>
            
          </View>
          
          <View style={styles.textGroup1}>
          <View style={styles.TimeInTimeOut}>
            <View><Text style={styles.TransactionTitle}>From: {pName} </Text></View>
            <View><Text style={styles.TransactionBody}>To: {sName} </Text></View>
            <View><Text style={styles.TransactionBody}>{date}</Text></View>
          </View>
          <View style={styles.textGroup2}>
            <Text style={styles.Amount}>+{amount} RWF</Text>
          </View>
          </View>
        </View>
  )
}
const styles=StyleSheet.create({
    NotificationContainer:{
      backgroundColor:'white',
      display:'flex',
      flexDirection:'row',
      margin:10,
      padding:10,
      borderRadius:10
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
      textGroup1:{
        // backgroundColor:'orange',
        flexDirection:'row',
        width:'90%',
        paddingHorizontal:10,
        justifyContent:'space-between'
      },
      textGroup:{
        padding:5,
        alignItems:'center',
        flexDirection:'row',
        alignContent:'center',
      },
      textGroup2:{
        
        // backgroundColor:'red',
        alignItems:'center',
        alignSelf:'center',
        flexDirection:'column'
      },
      timeOut:{
        color:'red',
        fontWeight:'bold'
      },
      TransactionTitle:{
        color:'#000',
        fontWeight:'bold',
        fontSize:15
      },
      TransactionBody:{
        color:'#000',
        fontWeight:'200'
      },
      Amount:{
        color:'#000',
        fontWeight:'bold',
        fontSize:18,
        textAlign:'right'
      },
})