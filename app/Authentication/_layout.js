import { Stack } from "expo-router";
export default ()=>{
    return(
        <Stack>
            <Stack.Screen 
        name="Login" options={{
        headerShown:false,
        }}
        />
        <Stack.Screen 
        name="SignUp" options={{
        headerShown:false,
        }}
        />
        </Stack>
    )
};