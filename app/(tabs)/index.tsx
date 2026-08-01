import Button from "@/components/button";
import Box from "@/components/homeBox";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTodayRides } from "../calculations";

export default  function HomeScreen(){

const[userName,setUserName]=useState('Captian');
const[regNumber,setregNumber]=useState('');
const[vehicleName,setVehcileName]=useState('');


//ride  details
const[TotalRide,setTotalRide]=useState(0);
const[profit,setProfit]=useState(0);
const[distance,setDistance]=useState(0);
const[amount,setAmount]=useState(0);

//display details
const[todayDistance,setTodayDistance]=useState(0);
const[todayEarnings,setTodayEarnings]=useState(0);
const[todayProfit,setTodayProfit]=useState(0);
const[todayPetrolUsed,setTodayPetrolUsed]=useState(0);
const[todayPetrolCost,setTodayPetrolCost]=useState(0);

  useFocusEffect(
    useCallback(()=>{

      const load=async()=>{
        //getting user data
        let user_data=await AsyncStorage.getItem('userDetails');
        if(user_data){
          var details=JSON.parse(user_data);
          setUserName(details.name);
          setVehcileName(details.vName);
          setregNumber(details.registerNumber);
        }



      try{
        let data=await AsyncStorage.getItem("rideDetails");
        
        if(data){
          let rides=JSON.parse(data);
          
          //getting  tdys rides

          const todayRides=getTodayRides(rides);

          //total rides today
            setTotalRide(todayRides.length);
        
          //todays total distance
          const  totalDistance=todayRides.reduce((sum,ride)=>
            sum+ride.distance,0  
          );
          setTodayDistance(totalDistance);
          

          //total earnings today
          const totalEarnings=todayRides.reduce((sum,item)=>
            sum+item.amount,0
          )
          setTodayEarnings(totalEarnings);


          //today profit
          const totalProfit=todayRides.reduce((sum,item)=>
            sum+item.profit,0
          )
          setTodayProfit(totalProfit)

          //today petrol  used
          const totalPetrol=todayRides.reduce((sum,item)=>
            sum+item.petrolUsed,0
          )
          setTodayPetrolUsed(totalPetrol);

          //today petrol cost
          const totalPetrolCost=todayRides.reduce((sum,item)=>
            sum+item.petrolCost,0
          )
          setTodayPetrolCost(totalPetrolCost);




            if(todayRides.length > 0){
              
              let lastRide=todayRides[todayRides.length-1];
              
              
              // setLastRide(lastRide);
             
              setAmount(lastRide.amount);
              setProfit(lastRide.profit);
              setDistance(lastRide.distance);

            }
        }
      }
       catch(error){
        console.log(error);
      }
    };
      load()
    },[])
  )


  return(
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{flex:1}}  contentContainerStyle={{paddingBottom:150,alignItems:'center',justifyContent:'center',padding:20}}>
        
        {/* header image */}
        <View style={styles.header}>
        <Image  source={require('../../assets/images/home_logo.png')} resizeMode="cover" style={{height:250,width:'100%'}}  />
          <Text style={styles.Title}>Hello, {userName}! <MaterialCommunityIcons name="hand-wave" color={"orange"} size={28}/></Text>
          <Text style={styles.subtitle}>Here's your overview for today</Text>
          <Text style={styles.subtitle2}>{vehicleName}  {regNumber}</Text>
        </View>
      

       <View style={styles.displayBox}>
        <Box  
          icons="briefcase"          
          iconColor="white"
          iconBg="#FBBF24" 
          text1="Today's Trips"
          value={TotalRide}
          iconSize={28}
          boxBg="#FEFCE8"
          prefix=""
          suffix=""
          text2="today"
        />

          <Box  
          icons="speedometer"          
          iconColor="white"
          iconBg="#3B82F6" 
          text1="Total Distance"
          value={todayDistance.toFixed(1)}
          iconSize={28}
          boxBg="#EFF6FF"
          prefix=""
          text2="today"
          suffix="km"
        />  
        </View> 
 

      <View style={styles.displayBox}>
        <Box  
          icons="fuel"          
          iconColor="white"
          iconBg="#4CAF50"
          text1="Fuel Cost"
          value={todayPetrolCost.toFixed(1)}
          iconSize={28}
          boxBg="#F1F8E9"
          prefix="₹ "
          text2="today"
          suffix=""
          />

          <Box  
          icons="wallet"          
          iconColor="white"
          iconBg="#8B5CF6"
          text1="Total Earnings"
          value={todayEarnings.toFixed(1)}
          iconSize={28}
          boxBg="#F5F3FF"
          prefix="₹ "
          text2="today"
          suffix=""
         
        />  
        </View> 

       <View style={styles.displayBox}>
        <Box  
          icons="trending-up"          
          iconColor="white"
          iconBg="#F59E0B"
          text1="Net Profit"
          value={todayProfit.toFixed(1)}
          iconSize={28}
          boxBg="#FFFBEB"
           prefix="₹ "
           text2="today"
           suffix=""
         
        />

          <Box  
          icons="gas-station"          
          iconColor="white"
          iconBg="#EF4444"
          text1="Total Fuel"
          value={todayPetrolUsed.toFixed(1)}
          iconSize={28}
          boxBg="#FEF2F2"
          prefix=""
          text2="today"
          suffix="L"
         

        />  
        </View> 

      {/* last ride details */}

    <View style={styles.lastRideMain}>
    <Text style={{fontSize:20,fontWeight:'600'}}>Recent Rides</Text>
      <View style={styles.lastRide}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="scooter" size={28} color={"white"}/>
        </View>
        <View style={styles.text}>
        <Text style={{fontSize:16,color:'gray',fontWeight:'700'}}>Today</Text>
        <Text style={{fontSize:18,fontWeight:'700'}}>{distance}Km | ₹{amount}</Text>
        </View>
        <View style={styles.amount}>
        <Text style={{fontSize:18,fontWeight:'700',color:'white'}}>₹{profit.toFixed(0)}</Text>
        <Text style={{fontSize:14,color:'white',fontWeight:'700'}}>Profit</Text>
        </View>
      </View>
     <Text style={{fontSize:18,color:'#F59E0B',fontWeight:'600'}}  onPress={()=>{router.navigate('/(tabs)/rideHistoryScreen')}} >See All <MaterialCommunityIcons name="arrow-right" size={18} /></Text> 
    </View>  


    <View style={styles.btn}>
      <TouchableOpacity style={styles.addRide} onPress={()=>{router.navigate("/addRideScreen")}} >
        <MaterialCommunityIcons name="plus-circle" size={40}  color="#F59E0B"/>
        <Text style={{fontWeight:'bold'}}>Add Ride</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addFuel}  onPress={()=>{router.navigate('/addFuel')}} >
        <MaterialCommunityIcons name="gas-station-in-use" size={40}  color="#EF4444"/>
        <Text style={{fontWeight:'bold'}}>Add Fuel</Text>
      </TouchableOpacity>
    </View>

    <Button 
     icons="arrow-right-bold"
     iconColor="yellow"
     iconSize={28}
     Bg="orange"
     onPress={()=>{router.navigate('/statsScreen')}}
     txtSize={20}
     txt="see stats"
    />
      </ScrollView>
    </SafeAreaView>
  )
}


const  styles=StyleSheet.create({

  header:{
    minHeight:280,
    width:'100%',
    marginBottom:20,
    backgroundColor:'white',
    alignItems:'flex-start',
    justifyContent:"flex-start",
   },
   Title:{
    fontSize:25,
    top:180,
    left:20,
    fontWeight:'bold',
    position:'absolute',
   },
   subtitle:{
    fontSize:16,
    top:220,
    left:20,
    color:'gray',
    fontWeight:'700',
    position:'absolute',
   },
   subtitle2:{
    fontSize:14,
    top:250,
    left:20,
    color:'#3B82F6',
    fontWeight:'700',
    position:'absolute',
   },
   displayBox:{
    minHeight:200,
    width:'100%',
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
   },
   
   lastRideMain:{
    marginTop:30,
    minHeight:120,
    width:"100%",
    padding:20,
    alignItems:'flex-start',
    justifyContent:'center',
    backgroundColor:'white',
    borderRadius:10,
    elevation:8,
    gap:10
   },


   lastRide:{
    minHeight:100,
    width:"100%",
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    backgroundColor:'white',
    borderRadius:10,
    gap:30
   },

   icon:{
    padding:10,
    borderRadius:10,
    backgroundColor:"#F59E0B"
   },
   text:{
    padding:10,
    alignItems:'flex-start',
    paddingHorizontal:10,
    gap:10,
    justifyContent:'space-evenly'
   },
   amount:{
    alignItems:'flex-start',
    justifyContent:'space-evenly',
    backgroundColor:"#4CAF50",
    padding:10,
    paddingHorizontal:30,
    borderRadius:20
   },
   btn:{
    minHeight:150,
    width:'100%',
    padding:20,
    marginTop:30,
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row'
   },
   addRide:{
    minHeight:120,
    width:'45%',
    backgroundColor:"white",
    elevation:10,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'space-evenly',
    padding:10
   },
    addFuel:{
    minHeight:120,
    width:'45%',
    backgroundColor:"white",
    elevation:10,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'space-evenly',
    padding:10
   }




 
})