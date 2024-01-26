import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Pressable } from "react-native";

const CustomButton = ({onPress,buttonName}) => {
  return (
          <Pressable onPress={onPress} style={styles.Button}>
            <Text style={styles.ButtonText}>{buttonName}</Text>
          </Pressable >
  );
};

export default CustomButton;
const styles = StyleSheet.create({
    Button:{
        backgroundColor:'#000',
        borderRadius:40,
        padding:15,
        width:230,
        margin:10,
    },
    ButtonText:{
        textAlign:'center',
        fontSize:16,
        fontWeight:'bold',
        color:'#fff'
    },
});
