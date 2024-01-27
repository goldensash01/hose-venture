import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

export default function NotificationContainer({
  fullname,reviewDate,stars,reviewDescription
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
              {fullname}
            </Text>
            <Text style={styles.dateReviewed}>
              {reviewDate}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.StudentNames}>
          <Ionicons name="star" size={15} color="gold" /> {stars}
          </Text>
        </View>
      </View>
      <View style={styles.Description}>
        <Text>{reviewDescription}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  NotificationContainer: {
    backgroundColor: "white",
    borderColor:'#000',
    borderWidth:1,
    marginHorizontal: 10,
    marginBottom: 5,
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
