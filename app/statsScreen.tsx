import Box from "@/components/homeBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function(){
  //display details
  const[TotalRide,setTotalRide]=useState(0); //number of rides
  const[profit,setProfit]=useState(0);// overall profit  
  const[Distance,setDistance]=useState(0);//total  distance
  const[Earnings,setEarnings]=useState(0);//earnings
  const[PetrolUsed,setPetrolUsed]=useState(0);//petrol used
  const[PetrolCost,setPetrolCost]=useState(0);//petrol cost
  const[Average,setAverage]=useState(0)//average mileage
  
  useFocusEffect(
    useCallback(()=>{
      const load=async ()=>{
        
      try{
        let data=await AsyncStorage.getItem("rideDetails");
        
        if(data){
          let rides=JSON.parse(data);
          
          
          
       
          //total rides 
            setTotalRide(rides.length);
        


          // total distance
          const  totalDistance=rides.reduce((sum,ride)=>
            sum+ride.distance,0  
          );
          setDistance(totalDistance);
          

          //total earnings 
          const totalEarnings=rides.reduce((sum,item)=>
            sum+item.amount,0
          )
          setEarnings(totalEarnings);


          //total profit
          const totalProfit=rides.reduce((sum,item)=>
            sum+item.profit,0
          )
          setProfit(totalProfit)


          //total petrol  used
          const totalPetrol=rides.reduce((sum,item)=>
            sum+item.petrolUsed,0
          )
          setPetrolUsed(totalPetrol);

          //total petrol cost
          const totalPetrolCost=rides.reduce((sum,item)=>
            sum+item.petrolCost,0
          )
          setPetrolCost(totalPetrolCost);
          
          
          //average mileage
          const averageMileage=totalPetrol > 0 ? (totalDistance/totalPetrol) :0;
          setAverage(averageMileage); 
 
        }
    }
        catch(error){
          console.log(error)
        }
      }
      load()
    },[])
  )
  




    return(

        <SafeAreaView style={{flex:1}}>
            <ScrollView  style={{flex:1}} contentContainerStyle={{alignItems:'center',justifyContent:'space-evenly',padding:20}}>
                
                <Text style={styles.title}>📊 Overall Statistics</Text>
                
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
                           text2="total"
                        />
                
                          <Box  
                          icons="speedometer"          
                          iconColor="white"
                          iconBg="#3B82F6" 
                          text1="Total Distance"
                          value={Distance.toFixed(1)}
                          iconSize={28}
                          boxBg="#EFF6FF"
                          prefix=""
                          suffix="km"
                           text2="total"
                        />  
                        </View> 
                 
                
                      <View style={styles.displayBox}>
                        <Box  
                          icons="fuel"          
                          iconColor="white"
                          iconBg="#4CAF50"
                          text1="Fuel Cost"
                          value={PetrolCost.toFixed(1)}
                          iconSize={28}
                          boxBg="#F1F8E9"
                          prefix="₹ "
                          suffix=""
                           text2="total"
                          />
                
                          <Box  
                          icons="wallet"          
                          iconColor="white"
                          iconBg="#8B5CF6"
                          text1="Total Earnings"
                          value={Earnings.toFixed(1)}
                          iconSize={28}
                          boxBg="#F5F3FF"
                          prefix="₹ "
                          suffix=""
                          text2="total"
                        />  
                        </View> 
                
                       <View style={styles.displayBox}>
                        <Box  
                          icons="trending-up"          
                          iconColor="white"
                          iconBg="#F59E0B"
                          text1="Net Profit"
                          value={profit.toFixed(1)}
                          iconSize={28}
                          boxBg="#FFFBEB"
                           prefix="₹ "
                           suffix=""
                          text2="total"
                        />
                
                          <Box  
                          icons="gas-station"          
                          iconColor="white"
                          iconBg="#EF4444"
                          text1="Total Fuel"
                          value={PetrolUsed.toFixed(1)}
                          iconSize={28}
                          boxBg="#FEF2F2"
                          prefix=""
                          suffix="L"
                           text2="total"
                
                        />  
                        </View> 

                      <View style={styles.displayBox}>
                
                          <Box  
                          icons="meter-gas"          
                          iconColor="white"
                          iconBg="#EF4444"
                          text1="Average Mileage"
                          value={Average.toFixed(1)}
                          iconSize={28}
                          boxBg="#FEF2F2"
                          prefix=""
                          suffix="km/L"
                          text2="total"
                         
                
                        />  
                        </View> 
                
            </ScrollView>
        </SafeAreaView>
    )
}

const  styles=StyleSheet.create({
    displayBox:{
    minHeight:200,
    width:'100%',
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
   },
   title:{
    fontSize:22,
    marginVertical:30,
    fontWeight:'bold'
   }

})