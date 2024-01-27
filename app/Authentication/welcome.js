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
      <StatusBar style="dark" />
      <View style={styles.InputsCont}>
        <View>
          {/* <Text>heell</Text> */}
          <Image
            source={require("../../assets/houses/homeImages.png")}
            style={styles.welcomeImage}
          />
        </View>
        <View style={styles.welcomeBottomContents}>
          <View>
            <Text  style={styles.welcomeTitle}>Find Trusted Houses and Tenant</Text>
            <Text style={styles.welcomeDescription}>
              Easily connect with trustworthy tenants or find reliable houses
              using our mobile app, Secure, verified listings ensure a seamless
              and trustworthy housing experience.
            </Text>
          </View>
          <View>
            {loading ? (
              <ActivityIndicator
                style={styles.ActivityIndicatorStyle}
                size="large"
                color="#D43E27"
              />
            ) : (
              <CustomButton
                onPress={() => router.push('/Authentication/subscription')}
                buttonName="Get Started"
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Welcome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeBottomContents: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
},
welcomeTitle: {
    textAlign:'center',
    fontSize:20,
    fontWeight:'900',
    paddingVertical:20
},
welcomeDescription: {
    fontSize:16,
    paddingVertical:20,
    textAlign:'justify',
    paddingHorizontal:20

},
  InputsCont: {
    flex: 1,
  },
  welcomeImage: {
    width: "100%",
    height: 450,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    zIndex: 1,
    // margin:20,
    objectFit: "cover",
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
