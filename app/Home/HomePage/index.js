import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  RefreshControl
} from "react-native";
import House from "../../../components/recentHouses/House";
import { Link, useRouter, Redirect, useLocalSearchParams } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Search from "../../../components/Inputs/Search";
import axios from "axios";
import HouseRow from "../../../components/recentHouses/HouseRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import cons

import { useState, useEffect } from "react";

RECENT_HOUSES = "https://hoseventuresapi.verta.rw/houses/houseDetailsLimit.php";
GET_ALL_HOUSES = "https://hoseventuresapi.verta.rw/houses/houseDetails.php";

const HomePage = () => {
  const router = useRouter();
  const {LoginUserId}=useLocalSearchParams();
  
  const [redirectLoading, setRedirectLoading] = useState(true);
  const [fetchRecentHouses, setFetchRecentHouses] = useState([]);
  const [allHouses, setAllHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parentId, setParentId] = useState(LoginUserId?LoginUserId:null);
  // const [parentId, setParentId] = useState()
  const getUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem("userId");
      if (userData !== null) {
        setParentId(userData);
      }
      console.log("ParentId1: ",parentId)
      // setRedirectLoading(false);
    } catch (error) {
      console.log(error);
      setRedirectLoading(false);
    }
  };
  

 

  const recentHouses = async () => {
    try {
      setLoading(true);
      const response = await axios.post(RECENT_HOUSES);
      if (response.status == 200) {
        setFetchRecentHouses(response.data.data);
      } else {
        setFetchRecentHouses(null);
      }
    } catch (error) {
      console.log(error);
      console.log("Error on get recent houses");
      // router.replace("/Authentication/Login");
    } finally {
      setLoading(false);
    }
  };

  const getAllHouses = async () => {
    try {
      setLoading(true);
      const UpdateResponse = await axios.post(GET_ALL_HOUSES);
      if (UpdateResponse.status == 200) {
        setAllHouses(UpdateResponse.data.data);
      } else {
        setAllHouses(null);
      }
    } catch (error) {
      console.log(error);
      console.log("Error on all houses");
    }finally{
      setLoading(false);
    }
  };
  const onRefresh = () => {
    recentHouses()
    getAllHouses()
  };

  useEffect(() => {
    onRefresh();
      console.log("userId:" ,parentId);
      console.log("userId:" ,parentId);
    // }
  }, [parentId]);

  // setTimeout(()=>{
  //   onRefresh();
  // }, 200000)

  return (
    // parentId?
  // return (
    
    <FlatList
      data={[{ key: "NewHouseList" }, { key: "HousesList" }]}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => {
        if (item.key === "NewHouseList") {
          return (
            <View>
              <View style={styles.topNavigationMenu}>
                <View><Text>Location</Text><Text><Ionicons name="location" size={14} color="black" />Kigali, Rwanda</Text></View>
                <View><Ionicons name="notifications-outline" size={24} color="black" /></View>
              </View>
              <View style={styles.searchContainer}>
              <Search inputIcon="search"  Placeholder="Search..." 
          />
              </View>
              <View style={styles.topNavigationMenu2}>
                <Pressable style={styles.topNavMenuBtnActive}>
                <FontAwesome name="home" size={24} color="#fff" />
                <Text  style={styles.topNavMenuBtnTextActive}> House</Text>
                </Pressable>
                <Pressable style={styles.topNavMenuBtn}>
                <MaterialIcons name="apartment" size={24} color="#000" />
                <Text style={styles.topNavMenuBtnText}> Appartment</Text>
                </Pressable>
              </View>
              <View style={styles.topNavigationMenu3}>
                <Text style={styles.menu3Text} >Recent House</Text>
                <Text style={styles.menu3TextLink}>See All</Text>
              </View>
              
              <View style={styles.ScrollViewContiner}>
                <View style={styles.RecentHouseContents}>
                    <FlatList
                    style={styles.housesContainer}
                      horizontal={true}
                      data={fetchRecentHouses}
                      keyExtractor={(item) => item.HouseId.toString()}
                      renderItem={({ item }) => (
                        <House
                          houseImage={item.HouseImg?item.HouseImg:'notFound.png'}
                          housePrice={item.Price}
                          Location={item.Location}
                          rating={item.Rating}
                          key={item.HouseId}
                          Title={item.Title}
                          onPress={() =>
                            router.push(
                              `Home/HomePage/ChildDetails?HouseId=${item.HouseId}`
                            )
                          }
                        />
                      )}
                    />
                </View>
              </View>
            </View>
          );
        } else if (item.key === "HousesList") {
          return (
            <View >
              <View style={styles.topNavigationMenu3}>
                <Text style={styles.menu3Text} >Best For You</Text>
                <Text style={styles.menu3TextLink}>See All</Text>
              </View>
              <View>
                {fetchRecentHouses ? (
                  <FlatList
                  style={styles.housesContainer}
                    horizontal={false}
                    data={fetchRecentHouses}
                    keyExtractor={(item) => item.HouseId.toString()}
                    renderItem={({ item }) => (
                      <HouseRow
                        houseImage={item.HouseImg?item.HouseImg:'notFound.png'}
                        housePrice={item.Price}
                        Location={item.Location}
                        rating={item.Rating}
                        key={item.HouseId}
                        Title={item.Title}
                        onPress={() =>
                          router.push(
                            `Home/HomePage/ChildDetails?HouseId=${item.HouseId}`
                          )
                        }
                      />
                    )}
                  />
                ) : ( allHouses ?
                  <View style={styles.NoChildAttendanceContainer}>
                    <Text style={styles.NoChildFoundText}>No data found</Text>
                  </View>
                  : <View style={styles.NoChildFoundContainer}>
                  <Text style={styles.NoChildFoundText}>No data found</Text>
                </View>
                )}
              </View>
            </View>
          );
        }
      }}
      refreshControl={<RefreshControl 
        refreshing={loading}
        onRefresh={onRefresh} />}
    />
  // :<Redirect href={"/Authentication/Login"}/> 
  )
};

export default HomePage;

const styles = StyleSheet.create({
  HomepageContainer: {
    flex: 1,
    display: "flex",
  },
  NoChildFoundContainer:{
    display:'flex',
    backgroundColor:'#FFCAA7',
    borderRadius:10,
    width:'80%',
    marginVertical:20,
    alignSelf:'center'
  },
  NoChildAttendanceContainer:{
    display:'flex',
    backgroundColor:'#96F19B',
    borderRadius:10,
    width:'80%',
    marginVertical:20,
    alignSelf:'center'
  },
  NoChildFoundText:{
    padding:10,
    textAlign:'center',
    fontWeight:'bold'
  },
  continer: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    display: "flex",
  },
  ScrollViewContiner: {
    display:'flex',
    flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
  },
  mychildrenTitle: {
    textAlign: "center",
    fontSize: 24,
    padding: 10,
    fontWeight: "bold",
  },
  RecentHouseContents: {
    width: "95%",
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  flatListItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 10,
    color: "red",
  },
  ActivityIndicatorStyle: {
    marginVertical: 20,
    marginHorizontal: 50,
  },
  HiddenParentId:{
    display:'none'
  },
  housesContainer:{
    padding:10,
    // marginLeft:20
  },
  AddChildrensContainer:{
    paddingVertical:10
  },
  topNavigationMenu:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10
  },
  topNavigationMenu2:{
    backgroundColor:'#F7F7F7',
    alignSelf:'center',
    display:'flex',
    flexDirection:'row',
    margin:10,
    borderRadius:20,

  },
  topNavMenuBtnActive:{
    backgroundColor:'#D43E27',
    paddingHorizontal:20,
    paddingVertical:7,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    display:'flex',
    flexDirection:'row',
  },
  topNavMenuBtn:{
    paddingHorizontal:20,
    paddingVertical:7,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    display:'flex',
    flexDirection:'row',  
  },
  topNavMenuBtnTextActive:{
    color:'#fff'
  },
  topNavMenuBtnText:{
    color:'#000'
  },
  searchContainer:{
    // backgroundColor:'silver',
    justifyContent:'center',
    display:'flex',
    alignContent:'center'
  },
  topNavigationMenu3:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
    paddingVertical:20
  },
  menu3TextLink:{
    color:'#D43E27',
    fontWeight:'bold'
  },
  menu3Text:{
    // color:'#D43E27',
    fontWeight:'bold',
    fontSize:16
  },
});
