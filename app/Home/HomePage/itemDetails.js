import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  StatusBar
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import ButtonRed from "../../../components/Buttons/buttonRed";
import NotificationContainer from "../../../components/Notifications/NotificationContainer";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


export default function ItemDetails() {
  const router = useRouter();
  const {HouseId} = useLocalSearchParams();
  const GET_HOUSE =
    "https://hoseventuresapi.verta.rw/houses/getSingleHouse.php";
  //   const REMOVE_CHILD="https://api.schoolflow.rw/students/deleteStudent.php";

  const [houseData, setHouseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { StudentId, ParentId } = useLocalSearchParams();

  // const DeleteChild = async ()=>{
  //   try{
  //   const response= await axios.post(GET_HOUSE,{
  //     houseId:9
  //   });
  //   if (response.status == 204) {
  //     // router.replace("Home/HomePage/");
  //   } else {
  //     Alert.alert("Student Not Removed");
  //   }
  //     }catch(error){
  //       console.log(error)
  //     }
  // }

  const getSingleHouse = async () => {
    try {
      setLoading(true);
      const response = await axios.post(GET_HOUSE, {
        houseId: HouseId,
        // childId: StudentId,
      });
      if (response.status === 200) {
        // console.log(response.data);
        setHouseData(response.data.data);

        // console.log(houseData);
      } else {
        Alert.alert("no data found");
      }
    } catch (error) {
      console.log(error);
      console.log(ParentId);
      // router.replace("Home/HomePage/");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSingleHouse();
  }, []);
  return (
    // <View></View>
    <ScrollView>
      <StatusBar backgroundColor={'#D43E27'} />
      <View>
        <View>
          
          <View style={styles.BackBtnContainer}>
            <Text onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#fff" /></Text>
          </View>
          <View style={styles.AddToFavorites}>
            <Text onPress={() => console.log('add to favorite')}><Ionicons name="heart-outline" size={24} color="#fff" /></Text>
          </View>
          <View style={styles.imageDetails}>
            <View>
            <Text style={styles.detailTitle}>{houseData.Title}</Text>
            <Text style={styles.detailLocation}>{houseData.Location}</Text>
            </View>
            <View style={styles.itemPrice}>
              <Text style={styles.itemPriceText}>{houseData.Price} USD/Month</Text>
              <Text style={styles.ratingColor}><Ionicons name="star" size={15} color="gold" /> 4.2</Text>
            </View>
          </View>
          <Image
            source={{
              uri: `https://hoseventuresapi.verta.rw/images/houses/${houseData.HouseImg}`,
            }}
            style={styles.houseImageTitle}
          />
        </View>
        <ScrollView horizontal={true} style={styles.ScrollViewContiner}>
          <View>
          <Image
            source={{
              uri: `https://hoseventuresapi.verta.rw/images/houses/${houseData.HouseImg}`,
            }}
            style={styles.imageContainer}
          />
          </View>
          <View>
          <Image
            source={{
              uri: `https://hoseventuresapi.verta.rw/images/houses/${houseData.HouseImg}`,
            }}
            style={styles.imageContainer}
          />
          </View>
          <View>
          <Image
            source={{
              uri: `https://hoseventuresapi.verta.rw/images/houses/${houseData.HouseImg}`,
            }}
            style={styles.imageContainer}
          />
          </View>
          <View>
          <Image
            source={{
              uri: `https://hoseventuresapi.verta.rw/images/houses/${houseData.HouseImg}`,
            }}
            style={styles.imageContainer}
          />
          </View>
          </ScrollView>

        <View style={styles.HouseDetailsRow}>
        <Text style={styles.houseTinyDetails}><FontAwesome name="bed" size={16} color="#fff" />  4 beds</Text>
        <Text style={styles.houseTinyDetails}><MaterialCommunityIcons name="shower" size={16} color="#fff" />  2 baths</Text>
        <Text style={styles.houseTinyDetails}><AntDesign name="areachart" size={16} color="#fff" />  100m area</Text>
        </View>

        <View>
          <Text style={styles.Title}>{houseData.Title}</Text>
          <Text style={styles.Description}>{houseData.Description}</Text>
        </View>
        <View>
          <Text style={styles.Title}>Ratings</Text>
        </View>
        <View>
          <NotificationContainer />
        </View>
        <View>
          <Text style={styles.Title}>House Owner</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ScrollViewContiner: {
    padding: 10,
    marginTop:10,
    marginBottom:40
  },
  StudentNames: {
    padding: 5,
    textTransform: "capitalize",
  },
  houseImageTitle: {
    height: 380,
    borderBottomRightRadius: 90,
    objectFit: "cover",
    backgroundColor: "silver",
  },
  SchoolName: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  StudentDetailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    padding: 20,
  },
  StudentDetails: {
    padding: 5,
  },
  buttonsContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  BackBtn: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 10,
  },
  imageDetails: {
    paddingVertical:10,
    justifyContent:'space-between',
    position: "absolute",
    zIndex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    // opacity: 0.5,
    bottom: 0,
    height: "30%",
    width: "60%",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  detailTitle: {
    color: "#fff",
    fontWeight: "900",
    paddingHorizontal: 20,
    fontSize: 16,
  },
  detailLocation: {
    color: "#fff",
    paddingHorizontal: 20,
    fontSize: 14,
  },
  itemPrice: {
    flexDirection:'row',
    justifyContent:'space-between',
    // zIndex:3,
    color: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: 14,
  },
  imageContainer: {
    width: 90,
    height: 65,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "'rgba(52, 52, 52, 0.8)'",
  },
  HouseDetails: {
    width: 80,
    height: 50,
    // marginHorizontal:10,
    // borderRadius:10,
    backgroundColor: "'rgba(52, 52, 52, 0.8)'",
  },
  HouseDetailsRow: {
    padding:20,
    alignSelf:'center',
    backgroundColor:'#D43E27',
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-evenly",
    width:'80%',
    alignItems: "center",
    flexDirection: "row",
  },
  BackBtnContainer: {
    display:'flex',
    flexDirection:'row',
    position: "absolute",
    zIndex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: 10,
  },
  AddToFavorites: {
    right:0,
    display:'flex',
    flexDirection:'row',
    position: "absolute",
    zIndex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: 10,
  },
  houseTinyDetails: {
    color:'#fff'
  },
  Title: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 20,
  },
  Description: {
    fontSize: 12,
    paddingHorizontal: 30,
  },
  itemPriceText: {
    color:'#fff',
    fontWeight:'bold',
    fontSize:17
  },
  ratingColor: {
    color:'#fff'
  },
});
