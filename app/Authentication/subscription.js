import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import Input from "../../components/Inputs/inputs";
import CustomButton from "../../components/Buttons/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { Link, Redirect, useRouter } from "expo-router";

const API_URL = "https://hoseventuresapi.verta.rw/Authentication/Login.php";

const Welcome = () => {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
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

  return parentId ? (
    <Redirect href={`/Home/HomePage?LoginUserId=${parentId}`} />
  ) : (
    <ScrollView style={styles.container}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    >
      <StatusBar style="dark"/>
      <View style={styles.LimitContainer}>
      <View style={styles.InputsCont}>
        <View>
          {/* <Text>heell</Text> */}
          <Image
            source={require("../../assets/subscription.png")}
            style={styles.welcomeImage}
          />
        </View>
        
      </View>
      <View   style={styles.skipButton}>
            {loading ? (
              <ActivityIndicator
                style={styles.ActivityIndicatorStyle}
                size="large"
                color="#D43E27"
              />
            ) : (
              <CustomButton
                onPress={() => router.push('/Authentication/Login')}
                buttonName="Login"
              />
            )}
            <Text style={styles.buysubscription}>Buy Subscription</Text>
            
          </View>
      </View>
    </ScrollView>
  );
};

export default Welcome;
const styles = StyleSheet.create({
  welcomeImage: {
    marginTop:20,
    height:600,
    width:'100%',
    // zIndex: 1,
    // margin:20,
    alignItems:'center',
    justifyContent:'center',
    objectFit: "contain",
  },
  container:{
    backgroundColor:'#FFFFFF'
  },
  buysubscription:{
    color:'#CF0404',
    fontWeight:'bold',
    marginVertical:10,
    marginBottom:100
  },
  skipButton:{
    justifyContent:'center',
    alignItems:'center'
  },
  LimitContainer: {
    flex:1,
  },
  LogoText: {
    position: "fixed",
    marginTop: 70,
    alignSelf: "center",
  },
  LogoTextImage: {
    height: 20,
    objectFit: "contain",
  },
  Title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },
  Button: {
    backgroundColor: "red",
  },
  HaveAccountText: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
  Text1: {
    fontSize: 18,
  },
  Text2: {
    fontSize: 18,
    color: "#D43E27",
    fontWeight: "bold",
  },
  ActivityIndicatorStyle: {
    marginVertical: 20,
  },
  errorMessageContainer: {
    width: "80%",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  errorMessage: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  successMessageContainer: {
    width: "80%",
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
