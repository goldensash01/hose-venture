import { Stack } from "expo-router";
import { Modal } from "react-native";
export default ()=>{
    return <Stack>
        <Stack.Screen 
        name="index"
        options={{
        // presentation:'modal',
        headerShown:false,
        }}
        />
    </Stack> 
}