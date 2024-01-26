import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";

const ProfileInputs = ({inputPlaceholder,inputIcon,Placeholder,InputConfiguration}) => {
  return (
        <View style={styles.SingleInputCont}>
          <StatusBar style="dark" />
          
          <View>
            <Text style={styles.InputsPlaceholder}>{Placeholder}</Text>
            <TextInput
              style={styles.Inputs}
              // value={'goldnsss'}
              // editable={false}
              // placeholder={inputPlaceholder}
              {...InputConfiguration}
            />
            
          </View>
          <View style={styles.InputIconCont}>
          <FontAwesome style={styles.IconStyle} name={inputIcon} size={20} />
          </View>
          
        </View>
  );
};

export default ProfileInputs;
const styles = StyleSheet.create({
  SingleInputCont: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#F4F4F4",
    width: '90%',
    margin:8,
    // overflow:"hidden",
},
Inputs:{
    color: "black",
    // fontWeight:'bold',
    fontSize:18,
    paddingBottom: 12,
    paddingHorizontal: 12,
    width: 290,
  },
  InputsPlaceholder:{
    color: "black",
    // fontWeight:'bold',
    fontSize:10,
    paddingHorizontal: 12,
    paddingTop: 12,
    // width: 500,
  },
IconStyle:{
  color: '#D43E27'
},
InputIconCont:{
  zIndex:1,
  justifyContent:'center',
  alignItems:'center',
  width:40
}
});
