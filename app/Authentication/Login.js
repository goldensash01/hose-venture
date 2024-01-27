import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Linking , TouchableOpacity, ActivityIndicator, Image, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import Input from "../../components/Inputs/inputs";
import CustomButton from "../../components/Buttons/button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import { Link, Redirect, useRouter } from "expo-router";

const API_URL="https://hoseventuresapi.verta.rw/Authentication/Login.php";


const Login = () => {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [parentId, setParentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  getUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem("userId");
        setParentId(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);
  // const [parentId, setParentId]=useState(
  //   getUserId()?parentId:null
  // );

  const LoginUser = async () =>{
    if (!emailOrPhone) {
      setShowSuccessMessage(true);
      setResponseMessage("Email or Phone required");
      // Alert.alert("All inputs are required");
    }else if(!password){
      setShowSuccessMessage(true);
      setResponseMessage("Password required");
    } else {
      try {
        setLoading(true); // Set loading to true when login starts 
        const response = await axios.post(API_URL, {
          emailPhone: emailOrPhone,
          password: password,
        });
        if (response.status === 200) {
          if (parentId !== null) {
            getUserId();
          } else {
            await AsyncStorage.setItem('userId', response.data.data.UserId);
            await AsyncStorage.setItem('token', response.data.data.UniqueId);
          }
          setResponseMessage("Login successful");
          setShowSuccessMessage(true);

          setTimeout(() => {
            // After 2 seconds, navigate to the home page
            router.replace(`/Home/HomePage?LoginUserId=${response.data.data.parentId}`);
          }, 1000);
        } else {
          setLoginError(true);
          setResponseMessage('Login failed');
        }
      } catch (error) {
        console.log(error);
        setLoginError(true);
        setResponseMessage('Login failed');
      } finally {
        setLoading(false); // Set loading to false when login is finished (success or failure)
      }
    }
  }
  
  return (
  parentId? <Redirect href={`/Home/HomePage?LoginUserId=${parentId}`}/> :
    <ScrollView style={styles.container}>
       <StatusBar style="dark" />
      <View style={styles.InputsCont}>
      <View>
            <Image
            source={require('../../assets/hose.png')}
            style={styles.Logo}
            />
        </View>
        <View style={styles.TitleCont}>
            <Text  style={styles.Title}>Welcome Back To</Text>
            <Text  style={styles.Title}>Hose Ventures</Text>
        </View>
        {showSuccessMessage ? (
          <View style={styles.successMessageContainer}>
            <Text style={styles.successMessage}>{responseMessage}</Text>
          </View>
        ): loginError ? (
          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorMessage}>{responseMessage}</Text>
          </View>):null }
        <Input inputIcon="phone" Placeholder="Email Or Phone"
        InputConfiguration={{
          // secureTextEntry:true,
          onChangeText:(val)=>setEmailOrPhone(val)
        }} 
        value={emailOrPhone}
         />
        {/* <PasswordInput/> */}
        <Input inputIcon="lock"  Placeholder="Password" 
        value={password} 
        InputConfiguration={{ 
          secureTextEntry:true,
          onChangeText:(val)=>setPassword(val)
        }}
          />
        
        <View>
           
        {loading ?  <ActivityIndicator style={styles.ActivityIndicatorStyle}size="large" color="#D43E27" /> :  <CustomButton onPress={LoginUser} buttonName="Login" /> }
        {/* {loading ?  <ActivityIndicator style={styles.ActivityIndicatorStyle}size="large" color="#47B84D" /> :  <CustomButton onPress={LoginUser} buttonName="Login" /> } */}
        </View>
        <View style={styles.HaveAccountText}>
            <Text style={styles.Text1}>Don't have an account?</Text>
            <Pressable><Text onPress={()=>router.replace("/Authentication/SignUp")} style={styles.Text2}> Sign Up</Text></Pressable>
        </View>
        {/* <View style={styles.HaveAccountText}>
            <Pressable><Text onPress={()=>Linking.openURL("https://parent.schoolflow.rw/forgot-password.php")} style={styles.Text2}>Forgot password?</Text></Pressable>
        </View> */}
      </View>
        {/* <View style={styles.LogoText}>
            <Image
            source={require('../../assets/schoolflow-Text.png')}
            style={styles.LogoTextImage}
            />
        </View> */}
    </ScrollView>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor: "green q",
  },
  InputsCont: {
        flex: 1,
      marginTop: 50,
      backgroundColor: "#fff",
    alignItems: "center",
  },
  Logo:{
    // width:150,
    height:50,
    margin:20,
    objectFit:'contain'
  },
  LogoText:{
    position:"fixed",
    marginTop:70,
    alignSelf:'center',
  },
  LogoTextImage:{
    height:20,
    objectFit:'contain',
  },
  Title:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:24,
    // padding:10
  },
  TitleCont:{
    marginVertical:20
  },
  Button:{
    backgroundColor:'red',
  },
  HaveAccountText:{
    display:'flex',
    flexDirection:'row',
    margin:10,
  },
  Text1:{
    fontSize:18,
  },
  Text2:{
    fontSize:18,
    color:'#D43E27',
    fontWeight:'bold'
  },
  ActivityIndicatorStyle:{
    marginVertical:20
  },
  errorMessageContainer: {
    width:'80%',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  
  errorMessage: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  successMessageContainer: {
    width:'80%',
    backgroundColor: "#D43E27",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  successMessage: {
    color: "white",
    textAlign: "center",
  },

});
