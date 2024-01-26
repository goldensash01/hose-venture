import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native'
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useRouter,  useLocalSearchParams } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import ButtonRed from '../../../components/Buttons/buttonRed';



export default function ItemDetails() {
  const router = useRouter();
  const {}=useLocalSearchParams();
  const GET_HOUSE="https://hoseventuresapi.verta.rw/houses/getSingleHouse.php";
//   const REMOVE_CHILD="https://api.schoolflow.rw/students/deleteStudent.php";
  
  const [houseData,setHouseData]=useState([]);
  const [loading, setLoading] = useState(false);
  const {StudentId,ParentId}=useLocalSearchParams();

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
        houseId: 1,
        // childId: StudentId,
      });
      if (response.status === 200) {
        // console.log(response.data);
        setHouseData(response.data.data);

        console.log(houseData);
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
      {loading ? (
      <ActivityIndicator size="large" color="#CF0404" />
    ) : (
      // houseData[0].map((item) => (
      <View>
        <View>
          <View style={styles.imageDetails}><Text>hihi</Text></View>
        <Image
            source={{uri:`https://hoseventuresapi.verta.rw/images/houses/1.jpg`}}
            style={styles.houseImageTitle}
            />
        </View>
        <ScrollView horizontal={true} style={styles.ScrollViewContiner}>
          <View style={styles.imageContainer}></View>
          <View style={styles.imageContainer}></View>
          <View style={styles.imageContainer}></View>
          <View style={styles.imageContainer}></View>
        </ScrollView>

        <View style={styles.HouseDetailsRow}>
          <View style={styles.HouseDetails}></View>
          <View style={styles.HouseDetails}></View>
          <View style={styles.HouseDetails}></View>
        </View>

        <View>
          <Text>{houseData.Title}</Text>
          <Text>{houseData.Description}</Text>
        </View>
        <View>
          <Text>Ratings</Text>
        </View>
              
        <View style={styles.buttonsContainer}>
          <ButtonRed buttonName="REMOVE STUDENT" onPress={()=>console.log('hii')}/>
          <Text style={styles.BackBtn} onPress={()=>router.back()}>Home</Text>
        </View>
      </View>
      // ))
      )}
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  ScrollViewContiner: {
    padding:10,
  },
  StudentNames:{
    padding:5,
    textTransform:'capitalize',
  },
  houseImageTitle: {
    height:380,
    borderBottomRightRadius: 100,
    objectFit:'cover',
    backgroundColor:'silver'
  },
  SchoolName:{
    fontSize:16,
    fontWeight:'bold',
    padding:10
  },
  StudentDetailsContainer:{
    backgroundColor:'#fff',
    borderRadius:20,
    width:'80%',
    justifyContent:'center',
    alignSelf:'center',
    padding:20,
  },
  StudentDetails:{
    padding:5
  },
  buttonsContainer:{
    padding:10,
    justifyContent:'center',
    alignItems:'center'
  },
  BackBtn:{
    fontWeight:'bold',
    fontSize:16,
    padding:10
  },
  imageDetails:{
    position:'absolute',
    zIndex:1,
    backgroundColor:'red',
    bottom:0,
    height:'30%',
    width:'60%',
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
  },
  imageContainer:{
    width:100,
    height:70,
    marginHorizontal:10,
    borderRadius:10,
    backgroundColor:'green'
  },
  HouseDetails:{
    width:80,
    height:50,
    // marginHorizontal:10,
    // borderRadius:10,
    backgroundColor:'green'
  },
  HouseDetailsRow:{
    borderRadius:20,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  }
});
