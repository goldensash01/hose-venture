import {
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import ProfileInputs from "../../../components/Inputs/inputs";


PROFILE_INFO = "https://hoseventuresapi.verta.rw/users/getSingleUser.php";

export default function Account() {
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState([]);
  const [redirectLoading, setRedirectLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const getUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem("userId");
      setParentId(userData);
    } catch (error) {
      router.replace("/Authentication/Login");
      console.log(error);
    }
  };
  const [parentId, setParentId] = useState(getUserId() ? parentId : null);

  const RemoveItem = async () => {
    try {
      AsyncStorage.removeItem("userId");
      setParentId(null);
      router.replace("/Authentication/Login");
    } catch (exception) {
      console.log(exception);
    }
  };
  const GetUserInfo = async () => {
    try {
      setLoading(true);
      const Response = await axios.post(PROFILE_INFO, {
        userId: parentId,
      });
      if (Response.status == 200) {
        setProfileInfo(Response.data.data);
      } else {
        setProfileInfo(null);
        Alert.alert("no data found");
      }
    } catch (error) {
      console.log(error);
      console.log("Error on Profile screen");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetUserInfo();
    // console.log(parentId)
  }, [parentId]);
  return (
    (  loading?<ActivityIndicator/>:
    <ScrollView style={styles.ProfileStyles}>
    
    
      <View style={styles.Title}>
        <View style={styles.ProfileImageContainer}>
          <View>
          <Image source={{uri:`https://hoseventuresapi.verta.rw/images/profile/${profileInfo.ImgName}`}}
          style={styles.ProfileImage}
          />
          </View>
          <View>
            <Text style={styles.username}>{profileInfo.FullName}</Text>
            <Text style={styles.UserId}>{profileInfo.UniqueId}</Text>
          </View>
        </View>
      </View>
      <View style={styles.ProfileData}>
      <View>
        <ProfileInputs
        inputIcon="user"  Placeholder="Full name" size="14"
        InputConfiguration={{ 
          value:profileInfo.FullName,
          editable:false
        }}
        />
      </View>
      <View>
        <ProfileInputs
        inputIcon="envelope"  Placeholder="Email" size="14"
        InputConfiguration={{ 
          value:profileInfo.Email,
          editable:false
        }}
        />
      </View>
      <View>
        <ProfileInputs
        inputIcon="phone"  Placeholder="Phone number" size="14"
        InputConfiguration={{ 
          value:profileInfo.Phone,
          editable:false
        }}
        />
      </View>
      <View style={styles.LogOutContainer}>
        <Text style={styles.LogOut} onPress={RemoveItem}>
          Sign Out
        </Text>
      </View>
      </View>
      
    </ScrollView>
  )
  );
}

const styles = StyleSheet.create({
  Title: {
    // backgroundColor:'#',
    paddingTop:20,
    paddingBottom:10,
  },
  TitleText: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 23,
  },
  TitleText2: {
    fontWeight: "500",
    color: "#7B7E82",
    fontSize: 23,
  },
  ProfileStyles: {
    // justifyContent:'center',
    flex: 1,
  },
  ProfileDetail: {
    display: "flex",
    padding: 10,
    paddingHorizontal: 20,
  },
  DetailIcon: {
    backgroundColor: "#CBFFCE",
    padding: 10,
    borderRadius: 1000,
    marginRight: 10,
  },
  profileTitle: {
    fontWeight: "bold",
    marginVertical: 10,
  },
  username:{
    fontSize:18,
    textAlign:'center',
    fontWeight:'bold',
    marginVertical:2
  },
  UserId:{
    textAlign:'center',
    fontWeight:'bold',
    marginVertical:2
  },
  UserDetailsContainer: {
    justifyContent: "center",
  },
  UserDetails: {
    fontSize: 16,
  },
  ProfileDetailBotton: {
    flexDirection: "row",
  },
  LogOutContainer:{
    borderRadius:10,
    backgroundColor: "#E3E3E3",
    marginTop:50,
    marginHorizontal:20,
    width:'30%',
  },
  LogOut: {
    textAlign:'center',
    padding:10,
    fontSize: 16,
    color: "#000",
    // color: "#FF6466",
    fontWeight:'bold'
    
  },
  ProfileImageContainer: {
    // flexDirection: "row",
    alignItems: "center",
    
  },
  ProfileImage: {
    borderWidth:4,
    borderColor:'#D43E27',
    padding: 20,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 1000,
    width:150,
    height:150,
  },
  ParentNames: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  ProfileData: {
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  childComponent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "silver",
    borderRadius: 10,
    margin: 5,
    objectFit:'cover'
  },

});
