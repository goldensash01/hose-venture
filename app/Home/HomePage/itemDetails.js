import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { Link, useRouter, Redirect, router, useLocalSearchParams } from "expo-router";
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

  const DeleteChild = async ()=>{
    try{
    const response= await axios.post(REMOVE_CHILD,{
      userid: ParentId,
      childId: StudentId,
    });
    if (response.status == 204) {
      router.replace("Home/HomePage/");
    } else {
      Alert.alert("Student Not Removed");
    }
      }catch(error){
        console.log(error)
      }
  }



  const getSingleHouse = async () => {
    try {
      setLoading(true);
      const response = await axios.post(GET_HOUSE, {
        HouseId: 9,
        // childId: StudentId,
      });
      if (response.status === 200) {
        // console.log(response.data);
        setHouseData(response.data.data);
        // console.log(childDetails);
      } else {
        Alert.alert("no data found");
      }
    } catch (error) {
      console.log(error);
      console.log(ParentId);
      router.replace("Home/HomePage/");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // getChildDetails();
  }, []);
  return (
    
    <ScrollView>
      {loading ? (
      <ActivityIndicator size="large" color="#47B84D" />
    ) : (
      childDetails.map((item) => (
      <View key={item.studentId}>
        <View>
          <Text style={styles.mychildrenTitle} >My Children</Text>
        </View>
        <View style={styles.ScrollViewContiner}>
          <View>
          <FontAwesome name="user-circle" size={50} color="#47B84D" />
          </View>
          <View >
            <Text style={styles.SchoolName}>{item.schoolName}</Text>
          </View>
        </View>
        
        <View style={styles.StudentDetailsContainer}>
            <Text style={styles.StudentNames}>Names: {item.fName} {item.lName}</Text>
            <Text style={styles.StudentDetails}>Student ID: {item.studentSchoolId}</Text>
            <Text style={styles.StudentDetails}>Trade: {item.trade}</Text>
            <Text style={styles.StudentDetails}>Gender: {item.Gender}</Text>
        </View>
        
        <View style={styles.buttonsContainer}>
          <ButtonRed buttonName="REMOVE STUDENT" onPress={DeleteChild}/>
          <Text style={styles.BackBtn} onPress={()=>router.back()}>Home</Text>
        </View>
      </View>
      ))
      )}
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  ScrollViewContiner: {
    justifyContent: "center",
    alignItems: "center",
  },
  StudentNames:{
    padding:5,
    textTransform:'capitalize',
  },
  mychildrenTitle: {
    textAlign: "center",
    fontSize: 24,
    padding: 10,
    fontWeight: "bold",
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
  }
});
