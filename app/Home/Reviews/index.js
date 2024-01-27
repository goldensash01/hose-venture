import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Link, useRouter, Redirect, useLocalSearchParams } from "expo-router";
import NotificationContainer from "../../../components/Notifications/NotificationContainer";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Search from "../../../components/Inputs/Search";
import axios from "axios";
import HouseRow from "../../../components/recentHouses/HouseRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchReview from "../../../components/Inputs/SearchReview";
// import cons

import { useState, useEffect } from "react";
const GET_USER_REVIEW_API =
  "https://hoseventuresapi.verta.rw/reviewTenants/getSingleTenantReview.php";

export default function Notifications() {
  const router = useRouter();
  const [userReview, setUserReview] = useState([]);
  const [redirectLoading, setRedirectLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [parentId, setParentId] = useState(null);
  const [userUniqueId, setUserUniqueId] = useState(null);

  const getUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem("userId");
      if (userData !== null) {
        setParentId(userData);
      }
      setRedirectLoading(false);
    } catch (error) {
      console.log(error);
      setRedirectLoading(false);
    }
  };

  useEffect(() => {
    if (parentId === null && !redirectLoading) {
      router.replace("/Authentication/Login");
    }
  }, [parentId, redirectLoading]);

  const getUserReview = async () => {
    try {
      setLoading(true);
      const UpdateResponse = await axios.post(GET_USER_REVIEW_API, {
        uniqueId: userUniqueId,
      });
      if (UpdateResponse.status == 200) {
        setUserReview(UpdateResponse.data.data);
        console.log(UpdateResponse.data.data);
      } else {
        setLatestUpdate(null);
      }
    } catch (error) {
      console.log(error);
      console.log("Error on Latest update");
    } finally {
      setLoading(false);
    }
  };
  const onRefresh = () => {
    getUserId();
    // getLatestUpdate();
  };
  useEffect(() => {
    onRefresh();
    // getLatestUpdate();
  }, [parentId]);

  return (
    <FlatList
      data={[{ key: "NewHouseList" }, { key: "HousesList" }]}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => {
        if (item.key === "NewHouseList") {
          return (
            <View>
              <View style={styles.topNavigationMenu}>
                <View>
                  <Text>Location</Text>
                  <Text>
                    <Ionicons name="location" size={14} color="black" />
                    Kigali, Rwanda
                  </Text>
                </View>
                <View>
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="black"
                  />
                </View>
              </View>
              <View style={styles.searchContainer}></View>
              <View style={styles.topNavigationMenu2}>
                <Pressable style={styles.topNavMenuBtnActive}>
                  <FontAwesome name="home" size={24} color="#fff" />
                  <Text style={styles.topNavMenuBtnTextActive}>
                    {" "}
                    Check Tenant
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => router.push("Home/Reviews/addReview")}
                  style={styles.topNavMenuBtn}
                >
                  <MaterialCommunityIcons
                    name="comment-edit-outline"
                    size={24}
                    color="#000"
                  />
                  <Text style={styles.topNavMenuBtnText}> Add Review</Text>
                </Pressable>
              </View>
              <View style={styles.topNavigationMenu3}>
              <SearchReview
                      onPress={getUserReview}
                      inputIcon="search"
                      Placeholder={"Enter Tenant Id"}
                      InputConfiguration={{
                        // secureTextEntry:true,
                        onChangeText: (val) => setUserUniqueId(val),
                      }}
                    />
                
              </View>

              <View>
                
              <FlatList
                  style={styles.housesContainer}
                  horizontal={false}
                  data={userReview}
                  keyExtractor={(item) => item.ReviewId.toString()}
                  renderItem={({ item }) => (
                    
                    <NotificationContainer
                      fullname={item.FullName}
                      reviewDate={item.ReviewDate}
                      stars={item.Stars}
                      reviewDescription={item.Review}
                    />
                  )}
                />
              </View>
            </View>
          );
        }
      }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    />
  );
}
const styles = StyleSheet.create({
  HomepageContainer: {
    flex: 1,
    display: "flex",
  },
  emptySpace: {
    backgroundColor:'#D43E27',
  },
  NoChildFoundContainer: {
    display: "flex",
    backgroundColor: "#FFCAA7",
    borderRadius: 10,
    width: "80%",
    marginVertical: 20,
    alignSelf: "center",
  },
  NoChildAttendanceContainer: {
    display: "flex",
    backgroundColor: "#96F19B",
    borderRadius: 10,
    width: "80%",
    marginVertical: 20,
    alignSelf: "center",
  },
  NoChildFoundText: {
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  continer: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    display: "flex",
  },
  ScrollViewContiner: {
    display: "flex",
    flexDirection: "column",
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
    width: "80%",
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
  HiddenParentId: {
    display: "none",
  },
  childrensContainer: {
    padding: 10,
  },
  AddChildrensContainer: {
    paddingVertical: 10,
  },
  topNavigationMenu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  topNavigationMenu2: {
    backgroundColor: "#F7F7F7",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    margin: 10,
    borderRadius: 20,
  },
  topNavMenuBtnActive: {
    backgroundColor: "#D43E27",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  topNavMenuBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  topNavMenuBtnTextActive: {
    color: "#fff",
  },
  topNavMenuBtnText: {
    color: "#000",
  },
  searchContainer: {
    // backgroundColor:'silver',
    justifyContent: "center",
    display: "flex",
    alignContent: "center",
  },
  topNavigationMenu3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  menu3TextLink: {
    color: "#D43E27",
    fontWeight: "bold",
  },
  menu3Text: {
    // color:'#D43E27',
    fontWeight: "bold",
    fontSize: 16,
  },
});
