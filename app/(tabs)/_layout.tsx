import { Tabs } from 'expo-router';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const size=30;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle:{
          minHeight:100,
          position:'absolute',
          marginBottom:50,
          borderRadius:10,
          width:'90%',
          marginLeft:20,
          alignItems:'center',
          paddingTop:20,
          elevation:9,
          backgroundColor:"#ffff",
          borderWidth:2,
          borderColor:'orange'
        },
        tabBarLabelStyle:{fontSize:12,fontWeight:'bold'}
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarActiveTintColor:'green',
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="rideHistoryScreen"
        options={{
          tabBarActiveTintColor:'orange',
          title: 'Ride History',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="motorbike" color={color} />,
        }}
      />
      <Tabs.Screen
        name="petrolHistoryScreen"
        options={{
          tabBarActiveTintColor:'red',
          title: 'Petrol History',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="gas-station" color={color} />,
        }}
      />
         <Tabs.Screen
        name="profileScreen"
        options={{
          tabBarActiveTintColor:'red',
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="account" color={color} />,
        }}
      />
   
    </Tabs>
  );
}
