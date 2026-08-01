import Button from "@/components/button";
import Inputs from "@/components/inputs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { calculateLastRide } from "./calculations";

export  default function StartRide(){

    useFocusEffect(
        useCallback(()=>{
            const load=async()=>{
            
            let km=await AsyncStorage.getItem("startKmTemp");
            let timeString=await AsyncStorage.getItem("startTimeTemp");
            
            const starttime = timeString ? new Date(timeString) : new Date();
            // let time=starttime.toLocaleTimeString([], {
            //  hour: "2-digit",
            // minute: "2-digit",
            // });
            
            
            setStartKm(km ? km :"");
            console.log((km));
            setStartTime(starttime);
          
            if(km){
            setBtn1(true);
            }
            else{
                setBtn1(false);
            }

        }
            load();
        },[])
    )

    const[startKm,setStartKm]=useState('');
    const[btn1,setBtn1]=useState(false);
    const[startTime,setStartTime]=useState(new Date());
    const[showStartTimePicker,setShowStartTimePicker]=useState(false);
    const[startError,setStartError]=useState('');

    const[endKm,setEndKm]=useState('');
     const[btn2,setBtn2]=useState(false);
    const[endTime,setEndTime]=useState(new Date());
    const[showEndTimePicker,setShowEndTimePicker]=useState(false);
    const[endError,setEndError]=useState('');

    const[errorMsg,setErrorMsg]=useState('');
    const[notes,setNotes]=useState('');
    const[amount,setAmount]=useState('');


    const onStartTime = (event,selectedDate)=>{
        setShowStartTimePicker(false);
        if(selectedDate){
            setStartTime(selectedDate);
        }
    }

    const  handleStart=async()=>{
        if(!startKm || !startTime){
            setStartError("Fill all the  fields");
            return
        }
        else{
            setBtn1(true);
            setStartError("");
            let  startTimeString=startTime.toISOString();
            await AsyncStorage.setItem("startKmTemp",startKm);
            await AsyncStorage.setItem("startTimeTemp",startTimeString);
        }
    }
    const  handleEnd=()=>{
        if(!endKm|| !endTime){
            setEndError("Fill all the  fields");
            return
        }
        else{
            setBtn2(true);
            setEndError("");
        }
    }


    //save button function
    const handleSave=async()=>{
        if(!startKm || !startTime || !endKm || !endTime ||!amount ){
            setErrorMsg("Fill Start and End details");
            return
        }
        else if(Number(startKm)>=Number(endKm))
        {
            setErrorMsg('End km must be greater than start km');
            return
        }
        else{
            let Udata=await AsyncStorage.getItem('userDetails');
            let Vehicledata=   Udata  ? JSON.parse(Udata) :{}

            let mileage=Vehicledata.mileage;
            let petrolPrice=Vehicledata.petrolPrice;
            
            const caldata=calculateLastRide(Number(startKm),Number(endKm),Number(amount),Number(petrolPrice),Number(mileage));
            let profit=caldata.profit;
            let distance=caldata.totalDistance;
            let petrolCost=caldata.fuelCost;
            let petrolUsed=caldata.fuelUsed;

            //creating object of  ride details
            const rideDetails={
                  id: Date.now().toString(),
                  skm: Number(startKm),
                  stime: startTime.toISOString(),
                  ekm: Number(endKm),
                  etime: endTime.toISOString(),
                  amount:Number(amount),
                  notes,
                  date: new Date().toISOString(),
                  mileage:Number(mileage),
                  petrolPrice:Number(petrolPrice),
                  profit:Number(profit),
                  distance:Number(distance),
                  petrolCost:Number(petrolCost),
                  petrolUsed:Number(petrolUsed)
            }

            //getting old ride details
            let  data  = await AsyncStorage.getItem("rideDetails");
            //converting  data into  object  if  exists 
            let  oldRides = data ? JSON.parse(data) : []  ;
            console.log(typeof(oldRides));
            //adding new rides at the end  of exisiting rides  
            oldRides.unshift(rideDetails)
            //saving the total ride details to  async storage as json  string
            await  AsyncStorage.setItem("rideDetails",JSON.stringify(oldRides));
            
            //removing temporary start  details
            await AsyncStorage.removeItem("startKmTemp");
            await AsyncStorage.removeItem("startTimeTemp");

            Alert.alert("Success","saved ride");
            console.log("Total ride details",oldRides);
            router.navigate('/(tabs)');
            

        }
    }
    

    const onEndTime=(event,selectedDate)=>{
        setShowEndTimePicker(false);
        if(selectedDate){
            setEndTime(selectedDate);
        }
    }



    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView  style={{flex:1}}  contentContainerStyle={{paddingBottom:100,alignItems:'center',backgroundColor:'white',justifyContent:'space-evenly',padding:10,gap:10}}>
                
                <View style={styles.header}>
                    <Image  source={require('../assets/images/addRide.png')} style={{height:200,width:'100%'}}/>
                    <Text  style={{fontSize:16,fontWeight:'600',color:"gray"}}>Track your ride details and earnings</Text>
                </View>

                


                <View style={styles.startRide}>
                    <Text style={[styles.title,{color:"#4CAF50"}]}>Start Ride</Text>
                    <Text style={[styles.subtitle]}>Enter start details</Text>
                    
                    <Inputs
                     icons="speedometer-medium"
                     iconBg="#4CAF50"
                     iconColor="white"
                     value={startKm}
                     onChangeText={setStartKm}
                     keyboardType="number-pad"
                     placeholder="Enter odometer KM e.g,15201"
                     />


                    <View style={styles.selectTime}>
                    <MaterialCommunityIcons  name="clock"  color={"#4CAF50"}  size={38}/> 
                    <TouchableOpacity style={styles.selectTimeinput} onPress={()=>{setShowStartTimePicker(true)}} >
                        <Text style={styles.timeText}>
                            {startTime.toLocaleTimeString([],{
                                hour:'2-digit',
                                minute:'2-digit'
                            })}
                        </Text>

                    </TouchableOpacity>
                    </View>
                    {showStartTimePicker && (
                      <DateTimePicker
                        value={startTime}
                        mode="time"
                        display="default"
                        is24Hour={false}
                        onChange={onStartTime}/>
                    )}

                    <Text  style={styles.errorTxt}>{startError}</Text>    

                    <Button
                    icons="play-box"
                    iconSize={25}
                    iconColor="white"
                    Bg="#4CAF50"
                    txtSize={20}
                    txt="Start Ride"  
                    onPress={handleStart}
                    disabled={btn1}
                    />
                </View>


                {/* end  ride */}
                <View style={styles.endRide}>
                    <Text style={[styles.title,{color:"#F59E0B"}]}>End Ride</Text>
                    <Text style={[styles.subtitle]}>Enter end details</Text>
                    
                    <Inputs
                     icons="speedometer-medium"
                     iconBg="#F59E0B"
                     iconColor="white"
                     value={endKm}
                     onChangeText={setEndKm}
                     keyboardType="number-pad"
                     placeholder="Enter odometer KM e.g,15201"
                     />
                  
                    <View style={styles.selectTime}>
                    <MaterialCommunityIcons  name="clock"  color={"#F59E0B"}  size={38}/> 
                    <TouchableOpacity style={styles.selectTimeinput} onPress={()=>{setShowEndTimePicker(true)}} >
                        <Text style={styles.timeText}>
                            {endTime.toLocaleTimeString([],{
                                hour:'2-digit',
                                minute:'2-digit'
                            })}
                        </Text>
                    </TouchableOpacity>
                    </View>

                    {showEndTimePicker && (
                      <DateTimePicker
                        value={endTime}
                        mode="time"
                        display="default"
                        is24Hour={false}
                        onChange={onEndTime}/>
                    )}

                    <Text style={styles.errorTxt}>{endError}</Text>    
                    
                    
                    <Button
                    icons="pause-box"
                    iconSize={25}
                    iconColor="white"
                    Bg="#F59E0B"
                    txtSize={20}
                    onPress={handleEnd}
                    txt="End Ride"
                    disabled={btn2}
                    />

                </View>


                {/* trip Amount */}
                <View style={styles.amount}>
                <Inputs  
                icons="cash"                 
                iconBg="white"
                iconColor="pink"
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter trip Fair (amount)"
                keyboardType="number-pad"
                />
                </View>
    

                {/* additional  notes */}
                <View style={styles.notes}>
                <Inputs  
                icons="book"                 
                iconBg="white"
                iconColor="blue"
                value={notes}
                onChangeText={setNotes}
                placeholder="Add Notes (optional)"
                />
                </View>

                <Text style={styles.errorTxt}>{errorMsg}</Text> 

                <Button
                txt="Save Ride"
                icons="content-save-all"
                Bg="#69dad0"
                txtSize={20}
                onPress={handleSave}
                iconSize={20}
                iconColor="white"
            />

            </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    header:{
        minHeight:250,
        width:'100%',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    startRide:{
        minHeight:350,
        width:'100%',
        alignItems:'center',
        padding:10,
        paddingVertical:20,
        justifyContent:'space-evenly',
        borderRadius:20,
        marginBottom:40,
        borderWidth:0.5
    },
    endRide:{
        minHeight:350,
        width:'100%',
        alignItems:'center',
        padding:10,
        paddingVertical:20,
        justifyContent:'space-evenly',
        borderRadius:20,
        borderWidth:0.5
    },
    title:{
        fontSize:22,
        fontWeight:'bold',
        textTransform:'capitalize'
    },
    subtitle:{
        fontSize:16,
        fontWeight:'bold',
        color:'gray',
        textTransform:'capitalize'
    },
    notes:{
        minHeight:120,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        borderWidth:0.5,
        marginVertical:10,
        borderRadius:20
    },
    amount:{
        minHeight:120,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        borderWidth:0.5,
        marginTop:30,
        borderRadius:20    
    },
    selectTime:{
        alignItems:"center",
        justifyContent:'space-evenly',
        borderRadius:10,
        flexDirection:'row',      
        width:'100%',
        gap:10,
        minHeight:60
    },
    selectTimeinput:{
        minHeight:60,
        width:"80%",
        alignItems:'flex-start',
        paddingHorizontal:20,
        justifyContent:'center',
        borderRadius:10,
        borderWidth:0.5
    },
    timeText:{
        fontWeight:'bold',
        fontSize:16
    },
    errorTxt:{
        color:'red',
        fontWeight:'bold',
        marginVertical:10,
        fontSize:16
    }

})