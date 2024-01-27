import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function index() {
  // const [isLoggedIn,setIsLoggedIn] = useState(false);
  // const [userId,setUserId] = useState('');

  // useEffect(()=>{
  //   getUserId = async () => {
  //     try {
  //       const userData = await AsyncStorage.getItem("userId");
  //       if (userData !== null) {
  //         // console.log("userData: ",userData)
  //         setIsLoggedIn(true);
  //         setUserId(userData)
  //         // setState({user:userData})
  //       }
  //       console.log("error1")
  //     } catch (error) {
  //       router.replace("/Authentication/Login");
  //       console.log(error);
  //       console.log("error2")
  //     }
  //   };
  // })
  
  // setIsLoggedIn(false);
  return (
    <Redirect href={"/Authentication/welcome"}/>      
    // isLoggedIn?<Redirect href={"/Home/HomePage"}/>:<Redirect href={"/Authentication/Login"}/>      
    // isLoggedIn?console.log(userId):console.log(userId)
    // console.log(isLoggedIn,userId)
    // console.log()
  )
}