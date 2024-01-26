import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Image, Pressable, Alert } from "react-native";
import Input from "../../../components/Inputs/inputs";
// import Input from "../../components/Inputs/inputs";
import CustomButton from "../../../components/Buttons/button";
import { Link,useLocalSearchParams,useRouter } from "expo-router";
import { useState } from "react";
import axios from "axios";

ADD_STUDENT_API_URL="https://api.schoolflow.rw/students/AddStudent.php"

const AddStudent = () => {
    const router=useRouter();
    const {ParentId}=useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [responseMessage, setResponseMessage] = useState('')
    const AddStudent = async () => {
      if (!ParentId || !studentId) {
        setResponseMessage("Enter Card or Student Id");
      } else {
    try {
      setLoading(true);
      const AddStudentResponse = await axios.post(ADD_STUDENT_API_URL, {
        StudentId:studentId,
        parentId: ParentId
      });
      if (AddStudentResponse.status == 201) {
        // console.log("Student Added");
        setResponseMessage("Student Successfully Added");
        setTimeout(() => {
          // After 2 seconds, navigate to the home page
          router.replace("Home/HomePage/");
        }, 1000);
        // setLatestUpdate(UpdateResponse.data.data);
      } else if (AddStudentResponse.status == 204) {
        // console.log("Student Added");
        setResponseMessage("Student Not Found");
        // setLatestUpdate(UpdateResponse.data.data);
      } else if (AddStudentResponse.status == 202) {
        // console.log("Student Added");
        setResponseMessage("Children already added");
        // setLatestUpdate(UpdateResponse.data.data);
      } else {
        setResponseMessage("Student Not Added");
        // setLatestUpdate(null);
      }
    } catch (error) {
      console.log(error);
      console.log(studentId);
      console.log(ParentId);

      // Alert.alert("Failed","Student Not Added");
      console.log("Student Not Added");
    }finally{
      setLoading(false);
    }
  }
  };
  return (
    <ScrollView style={styles.container}>
       
      <View style={styles.InputsCont}>
      <View>
            <Image
            source={require('../../../assets/schoolflow-Icon.png')}
            style={styles.Logo}
            />
        </View>
        
        <View style={styles.TitleCont}>
            <Text  style={styles.Title}>Add Student</Text>
        </View>
        {
          responseMessage?
          <View style={styles.AddStudentNotification}>
            <Text style={styles.AddStudentNotificationText}>{responseMessage}</Text>
          </View>
          :null
        }
        <Input inputIcon="address-card"  
        InputConfiguration={{
          onChangeText:(val)=>setStudentId(val)
        }}
         inputPlaceholder="Student Id or Card Id" />

        <View>
            <CustomButton onPress={AddStudent} buttonName="Add"/>
        </View>
        <Pressable onPress={()=>router.back()} style={styles.HaveAccountText}>
            <Text style={styles.Text2}>Close</Text>
        </Pressable>
      </View>
        {/* <View style={styles.LogoText}>
            <Image
            source={require('../../../assets/schoolflow-Text.png')}
            style={styles.LogoTextImage}
            />
        </View> */}
    </ScrollView>
  );
};

export default AddStudent;
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
    width:60,
    height:60,
    margin:20
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
    color:'#47B84D',
    fontWeight:'bold'
  },
  AddStudentNotification:{
    backgroundColor:'#96F19B',
    padding:10,
    width:'80%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  AddStudentNotificationText:{
    fontSize:16
  }

});
