import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ChildDetailedAttendance() {
    const router = useRouter();
    const {LoginUserId}=useLocalSearchParams();
  return (
    <View>
        <Text onPress={() => router.replace("Home/Notifications/")}>goback</Text>
      <Text>childDetailedAttendance</Text>
    </View>
  )
}

const styles=StyleSheet.create({

})