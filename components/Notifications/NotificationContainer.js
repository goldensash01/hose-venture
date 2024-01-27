import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

export default function NotificationContainer({
  fName,
  lName,
  Date,
  TimeIn,
  TimeOut,
}) {
  return (
    <View style={styles.NotificationContainer}>
      <View style={styles.titleGroup}>
        <View style={styles.StudentNamesIcon}>
          <View>
            <AntDesign name="user" size={20} color="#000" />
          </View>
          <View>
            <Text style={styles.reviewOwner}>
              Golden Sash Munyankindi{fName} {lName}
            </Text>
            <Text style={styles.dateReviewed}>
              2 Month ago{fName} {lName}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.StudentNames}>
          <Ionicons name="star" size={15} color="gold" /> 7/10
          </Text>
        </View>
      </View>
      <View style={styles.Description}>
        <Text>Upon entering the rented house, I couldn't help but be captivated by its charming character and cozy atmosphere. The exterior exuded a welcoming aura with its well-maintained garden and a quaint porch that seemed perfect for enjoying a morning coffee.</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  NotificationContainer: {
    backgroundColor: "white",
    borderColor:'#000',
    borderWidth:1,
    margin: 10,
    padding: 10,
  },
  TimeInTimeOut: {
    display: "flex",
    flexDirection: "column",
  },
  StudentNames: {
    textTransform: "capitalize",
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
  reviewOwner: {
    textTransform: "capitalize",
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
  dateReviewed: {
    textTransform: "capitalize",
    // fontWeight: "bold",
    paddingHorizontal: 5,
    fontSize:10
  },
  StudentNamesIcon: {
    display:'flex',
    flexDirection:'row'
  },
  titleGroup: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 5,
    alignItems: "start",
  },
  textGroup: {
    padding: 5,
    alignItems: "center",
    flexDirection: "row",
    alignContent: "center",
  },
  textGroup2: {
    alignItems: "center",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  timeOut: {
    color: "red",
    fontWeight: "bold",
  },
  timeIn: {
    color: "#47B84D",
    fontWeight: "bold",
  },
  Description: {
    paddingHorizontal:10,
    paddingVertical:5,
  },
  
});
