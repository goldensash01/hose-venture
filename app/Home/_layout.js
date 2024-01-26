import { Tabs } from "expo-router";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default ()=>{
    return(
        <Tabs
        screenOptions={{
            headerStyle:{
                backgroundColor:'red'
            },
            // tabBarActiveBackgroundColor:'#E4FFE6',
            tabBarActiveTintColor:'#D43E27',
            headerShown:false,
        }}
        >
            <Tabs.Screen
            name="HomePage"
            options={{
                tabBarIcon:({color})=>(<Feather name="home" size={24} color={color} />),
                title:'Discover'
            }}
            />
             <Tabs.Screen
            name="Favorite"
            options={{
                // presentation:'modal',
                tabBarIcon:({color})=>(<Ionicons name="heart-outline" size={24} color={color}/>),
                title:'Favorite'
                
            }}
            />
            <Tabs.Screen
            name="Property"
            options={{
                tabBarIcon:({color})=>(<MaterialIcons name="apartment" size={24} color={color} />),
                title:'Property'
            }}
            />
            <Tabs.Screen
            name="Reviews"
            options={{
                tabBarIcon:({color})=>(<Feather name="star" size={24} color={color} />),
                title:'Reviews'
            }}
            />
           
            <Tabs.Screen
            name="Profile"
            options={{
                // presentation:'modal',
                tabBarIcon:({color})=>(<MaterialCommunityIcons name="account-circle-outline" size={24} color={color} />),
                title:'Account'
                
            }}
            />
            
        </Tabs>
    );
};