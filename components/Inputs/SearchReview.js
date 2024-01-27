import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable } from "react-native";

const SearchReview = ({inputPlaceholder,inputIcon,Placeholder,onPress,InputConfiguration}) => {
  return (
        <View style={styles.SingleInputCont}>
          <StatusBar style="dark" />
          
          <View>
            <Text style={styles.InputsPlaceholder}>{Placeholder}</Text>
            <TextInput
              style={styles.Inputs}
              editable
              placeholder={inputPlaceholder}
              {...InputConfiguration}
            />
            
          </View>
          <Pressable onPress={onPress} style={styles.InputIconCont}>
          <FontAwesome style={styles.IconStyle} name={inputIcon} size={24} color={'#fff'} />
          </Pressable>
          
        </View>
  );
};

export default SearchReview;
const styles = StyleSheet.create({
  SingleInputCont: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    width: '80%',
    margin:8,
    // overflow:"hidden",
},
Inputs:{
    color: "black",
    // fontWeight:'bold',
    fontSize:18,
    paddingBottom: 12,
    paddingHorizontal: 12,
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
  color: '#fff'
},
InputIconCont:{
  borderTopRightRadius:10,
  borderBottomRightRadius:10,
  zIndex:1,
  justifyContent:'center',
  alignItems:'center',
  width:60,
  backgroundColor:'#D43E27'
}
});
