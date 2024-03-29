import { Stack, useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
// import { useLocalSearchParams } from 'expo-router'

export default ()=>{
    // const {id,name}=useLocalSearchParams();
    const router = useRouter()
    return (<Stack
        screenOptions={{
            tabBarActiveBackgroundColor:'#E4FFE6',
            tabBarActiveTintColor:'#47B84D',
        }}
    >

        <Stack.Screen name="index" 
        options={{
                headerShown:false,
        }}
    />
        <Stack.Screen name="itemDetails" 
        options={{
            headerLeft:()=>(<Ionicons name="ios-chevron-back-outline" size={24} color="black" onPress={()=>router.back()}/>),
            // title:null     
            headerShown:false,
    }}/>
        
    </Stack> )
}