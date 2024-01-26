import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import { router, useLocalSearchParams } from 'expo-router'

const YOUTUBE = 'https://www.youtube.com';
const Comfirmation = () => {
  const {Link}=useLocalSearchParams();

    return <WebView source={{ uri: Link }} style={{ flex: 1 }} />;
}

export default Comfirmation

const styles = StyleSheet.create({})