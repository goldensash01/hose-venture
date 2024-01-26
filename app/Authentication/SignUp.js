import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, ScrollView, Image, Pressable, ActivityIndicator } from "react-native";
import Input from "../../components/Inputs/inputs";
import CustomButton from "../../components/Buttons/button";
import axios from "axios";

import { Link, useRouter } from "expo-router";
import { useState } from "react";

const API_URL ="https://api.schoolflow.rw/Authentication/createAccount.php"

const SignUp = () => {
  const router=useRouter();

  const [fname,setFname]=useState('');
  const [lname,setLname]=useState('');
  const [phone,setPhone]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [coPassword,setCoPassword]=useState('');
  const [loading, setLoading] = useState(false);

  // const [responseStatus,setResponseStatus]=useState('');
  const [responseMessage,setResponseMessage]=useState('');
  
  const displayCreedentials = async ()=>{
    
    if(password != coPassword){
      setResponseMessage("password not matching");
      // Alert.alert("password not matching");
    }else if(!fname || !lname || !phone || !email || !password || !coPassword ){
      setResponseMessage("All inputs are required");
      // Alert.alert("All inputs are required");
    }else{
try{
  setLoading(true);
      const response = await axios.post(API_URL, {
        fname:fname,
          lname:lname,
          phone:phone,
          email:email,
          password:password
      });
      if(response.data.status==201){
        setResponseMessage("Account Successfully Created");
        setTimeout(() => {
        router.replace("/Authentication/Login")
      }, 1000);
      }else{
        setResponseMessage(response.data.message);
      }
    }catch(error) {
      setResponseMessage("Account not created");
      console.log(error)
        // Alert.alert('Error', 'Failed to insert user');
      }finally{
        setLoading(false);
      }
}
  }
  return (
    <ScrollView style={styles.container}>
       
      <View style={styles.InputsCont}>
      <View>
            <Image
            source={require('../../assets/hose.png')}
            // source={require('../../assets/home-svgrepo-com.svg')}
            style={styles.Logo}
            />
        </View>
        <View style={styles.TitleCont}>
            <Text  style={styles.Title}>Sign Up</Text>
        </View>
        {responseMessage ? (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{responseMessage}</Text>
        </View>
      ) : null}
        {/* </View> */}
        <Input inputIcon="user" Placeholder="Full Username" 
        InputConfiguration={{
          onChangeText:(value)=>setFname(value)
        }}
        />
        
        <Input inputIcon="phone" InputConfiguration={{
          keyboardType: 'phone-pad',
          onChangeText:(value)=>setPhone(value)
        }} Placeholder="Phone"/>


        <Input inputIcon="envelope" Placeholder="Email" 
        InputConfiguration={{
          keyboardType: 'email-address',
          onChangeText:(value)=>setEmail(value)
        }}/>
        <Input inputIcon="lock" Placeholder="Password" InputConfiguration={{
          secureTextEntry:true,
          onChangeText:(value)=>setPassword(value)
        }}/>
        <Input inputIcon="lock" InputConfiguration={{
          secureTextEntry:true,
          onChangeText:(value)=>setCoPassword(value)
        }} Placeholder="Re-Type Password"/>
        <View style={styles.TemsAndConditions}>
        <Text>
          By using Hose Ventures mobile application, you acknowledge that you have read, understood, 
          and agree to Our</Text> 
          <Text
              style={styles.AppVersionButton}
              onPress={() =>
                console.log('hi')
              }
            >Terms and Conditions </Text><Text>and</Text><Text
            style={styles.AppVersionButton}
            onPress={() => console.log('hi')
            }
          > Privacy Policy. </Text>
        </View>
        <View>
        {loading ?  <ActivityIndicator style={styles.ActivityIndicatorStyle}size="large" color="#D43E27" /> :  <CustomButton onPress={displayCreedentials} buttonName="Sign Up" /> }
          
        </View>
        <View style={styles.HaveAccountText}>
            <Text style={styles.Text1}>Have an account?</Text>
            <Pressable><Text onPress={()=>router.replace("/Authentication/Login")} style={styles.Text2}> Login</Text></Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor: "green q",
  },
  InputsCont: {
        flex: 1,
      marginTop: 10,
      backgroundColor: "#fff",
    alignItems: "center",
  },
  Logo:{
    height:50,
    margin:20,
    objectFit:'contain'
  },
  LogoText:{
    position:"fixed",
    marginTop:40,
    marginBottom:100,
    alignSelf:'center',
  },
  LogoTextImage:{
    height:20,
    objectFit:'contain',
  },
  Title:{
    fontWeight:'bold',
    fontSize:20,
    padding:10
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
  errorMessageContainer: {
    backgroundColor: '#D43E27',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width:'80%'
  },
  errorMessage:{
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  TemsAndConditions:{
    marginVertical:10,
    width:'80%',
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  AppVersionButton: {
    fontWeight: "bold",
    color: "#D43E27",
  },

});
