import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";

const Search = ({inputPlaceholder,inputIcon,Placeholder,InputConfiguration}) => {
  return (
        <View style={styles.SingleInputCont}>
          <StatusBar style="dark" />
          <View style={styles.InputIconCont}>
          <FontAwesome style={styles.IconStyle} name={inputIcon} size={24} />
          </View>
          <View>
            {/* <Text style={styles.InputsPlaceholder}>{}</Text> */}
            <TextInput
              style={styles.Inputs}
              editable
              placeholder={Placeholder}
              {...InputConfiguration}
            />
            
          </View>
          
          
        </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  SingleInputCont: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    width: '90%',
    margin:8,
    // overflow:"hidden",
},
Inputs:{
    color: "black",
    // fontWeight:'bold',
    fontSize:18,
    padding: 12,
    // paddingHorizontal: 12,
    width: 270,
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
  color: '#000'
},
InputIconCont:{
  zIndex:1,
  justifyContent:'center',
  alignItems:'center',
  width:40
}
});
