import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter, Redirect, useLocalSearchParams } from "expo-router";

export default function HouseRow({Title,Location,houseImage,housePrice,rating,onPress}){
  const router = useRouter();
  return (
    <View>
      <Pressable onPress={()=>router.push('/Home/HomePage/itemDetails')} style={styles.childComponentCont}>
        <View>
        <Image
           source={{uri:`https://hoseventuresapi.verta.rw/images/houses/${houseImage}`}}
           style={styles.childComponent}
            />
            </View>
        <View style={styles.OptionsContainer}>
        <Text style={styles.Title}>{Title}</Text>
          <View style={styles.LocRate}>
          <Text style={styles.itemDescription}>{Location}</Text>
          <Text style={styles.itemDescription}><Ionicons name="star" size={15} color="gold" /> {rating}</Text>
          </View>
          <View style={styles.LocRate2}>
          <Text style={styles.Price}>{housePrice}</Text>
          <Text style={styles.currency}> RWF/Month</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  childComponentCont: {
    display: "flex",
    justifyContent: "center",
    flexDirection:'row',
    alignItems: "center",
    // width: 150,
  },
  childNames:{
    textTransform:'capitalize',
    textAlign:'left'
  },
  childComponent: {
    height: 120,
    width: 190,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "silver",
    borderRadius: 10,
    margin: 5,
    objectFit:'cover'
  },
  Title: {
    fontWeight:'bold',
    paddingHorizontal:10,
    paddingVertical:2
  },
  LocRate: {
    paddingVertical:2,
    paddingHorizontal:15,
    width:190,
    // backgroundColor:'silver',
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center'
    
  },
  LocRate2: {
    display:'flex',
    flexDirection:'row',
    paddingHorizontal:10,
    paddingVertical:2,
  },
  Price: {
    display:'flex',
    flexDirection:'row',
    color:'#D43E27',
    fontWeight:'bold'
  },
  currency: {
    display:'flex',
    flexDirection:'row'
  },
});
