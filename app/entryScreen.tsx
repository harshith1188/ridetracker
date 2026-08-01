import Button from "@/components/button";
import CheckBox from "@/components/checkBox";
import Inputs from "@/components/inputs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Label } from "@react-navigation/elements";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default  function  EntryScreen(){


    const [selectedVehicle, setSelectedVehicle] = useState("");
    const[name,setName]=useState('');
    const[regnum,setRegnum]=useState('');
    const[vname,setVname]=useState('');
    const[mileage,setMileage]=useState('');
    const[errortxt,setErrortxt]=useState('');
    const[petrol,setPetrol]=useState('');

    const handleGo=async()=>{
        
        const regExp = /^[A-Z]{2}[0-9]{2}[A-Z]{1,3}[0-9]{4}$/;

          if(!name||!regnum||!selectedVehicle||!vname ||!mileage|| !petrol){
            setErrortxt("Fill all the fields");
        }
        else if(!regExp.test(regnum)){
            setErrortxt('invalid registration number');
        }
        else{
            const user_details={
                name:name,
                registerNumber:regnum,
                vehicle:selectedVehicle,
                vName:vname,
                mileage:mileage,
                petrolPrice:petrol,
            }
            await AsyncStorage.setItem("userDetails",JSON.stringify(user_details));
            await AsyncStorage.setItem('login','true');
            router.replace('/(tabs)');
        }
    }


    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex:1}} contentContainerStyle={{paddingTop:30,paddingBottom:100,gap:30,alignItems:'center',justifyContent:'space-evenly',padding:20,}}>

            {/* header image */}
            <View style={styles.header}>
            <Image source={require('../assets/images/entry.png')} style={{borderRadius:10,height:250,width:"100%"}}/>    
            </View>             

            {/* Full Name */}
            <View style={styles.c1}>
               <Label  style={styles.labels}>Full Name</Label> 
              <Inputs 
               icons="account"
               placeholder="Enter Your full name"
               iconBg="#F9FAFB"
               iconColor="#ff3907"
               value={name}
               onChangeText={setName}
               />
            </View>

            {/* vehicle  category */}
            <View style={styles.c2}>
               <Label style={styles.labels}>vehicle category</Label> 
              <ScrollView  horizontal={true} style={styles.checkboxesScroll} contentContainerStyle={{  padding:10,gap:30,alignItems:'center'}}>
                <CheckBox 
                //  iconColor="#FDCB2E"
                iconColor="black"
                 iconSize={45}
                 icons="scooter"
                 Bg="#ffffffdc"
                 Txt="Scooty"
                selected={selectedVehicle === "Scooty"}
                onPress={()=>setSelectedVehicle("Scooty")} 
               />         
                 <CheckBox
                iconColor="black"
                 iconSize={45}
                 icons="bike" 
                 Bg="#ffffffdc"
                 Txt="Bike"
                 selected={selectedVehicle === "Bike"}
                 onPress={() => setSelectedVehicle("Bike")}
               
                 />         
                 <CheckBox
                iconColor="black"
                 iconSize={45}
                 icons="car" 
                 Bg="#ffffffdc"
                 Txt="car"
                 selected={selectedVehicle === "Car"}
                 onPress={() => setSelectedVehicle("Car")}
               
                 />         
                
                 <CheckBox
                iconColor="black"
                 iconSize={45}
                 icons="rickshaw" 
                 Bg="#ffffffdc"
                 Txt="rikshaw"
                selected={selectedVehicle === "Rickshaw"}
                 onPress={() => setSelectedVehicle("Rickshaw")}
    
                 />         
                 </ScrollView>
            </View>


            {/* registration number */}
            <View style={styles.c3}>
                <Label style={styles.labels}>vehicle Number plate</Label> 
              <Inputs 
               icons="registered-trademark"
               placeholder="Example : KA05JK1234"
               iconBg="#F9FAFB"
               iconColor="#ff3907"
                value={regnum}
                onChangeText={setRegnum} 
                 autoCapitalize="characters"
               />        
            </View>

            {/* vehicle  model/ name */}
            <View style={styles.c3}>
            <Label style={styles.labels}>vehicle Name</Label> 
              <Inputs 
               icons="scooter"
               placeholder="Enter your vehicle name"
               iconBg="#F9FAFB"
               iconColor="#ff3907"
                value={vname}
               onChangeText={setVname}

               />        
               <Text style={{color:"gray",fontWeight:'700',marginLeft:10}}>Example: Ntorq 125, Activa 5G, Splendor, Pulsar 220</Text>
            </View>

                {/* vehicle  mileage */}
               <View style={styles.c3}>
            <Label style={styles.labels}>vehicle Mileage</Label> 
              <Inputs 
               icons="fuel"
               placeholder="Enter your vehicle Mileage"
               iconBg="#F9FAFB"
               iconColor="#ff3907"
               value={mileage}
               onChangeText={setMileage}
               keyboardType="number-pad"     
               />        
               <Text style={{color:"gray",fontWeight:'700',marginLeft:10}}>Example: 35 KM/L or 40 KM/L</Text>
            </View>

            {/* Petrol  price */}
               <View style={styles.c3}>
            <Label style={styles.labels}>Petrol  Price</Label> 
              <Inputs 
               icons="gas-station"
               placeholder="Enter petrol price"
               iconBg="#F9FAFB"
               iconColor="#ff3907"
               value={petrol}
               onChangeText={setPetrol}
               keyboardType="number-pad"     
               />        
               <Text style={{color:"gray",fontWeight:'700',marginLeft:10}}>Example: ₹110 / L or  ₹100 / L</Text>
            </View>

            {/* error display text */}
            <Text style={styles.error}>{errortxt}</Text>
            
            {/* save button */}
           <Button 
           icons="arrow-right-thick"
           iconColor="white"
           iconSize={30}
           txt="Go"
           Bg="#ffc107ad"
           onPress={handleGo}
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
    justifyContent:'space-evenly',
   },
    c1:{
        minHeight:100,
        width:'100%',
        padding:10,
        paddingVertical:20,
        alignItems:'flex-start',
        justifyContent:'center',
        borderRadius:20,
        borderWidth:0.2,
    },
    labels:{
        fontSize:18,
        marginLeft:20,
        fontWeight:'bold',
        textTransform:'capitalize'
    },
    c2:{
        minHeight:250,
        width:'100%',
        padding:10,
        paddingVertical:20,
        alignItems:'flex-start',
        justifyContent:'center',
        borderRadius:20,
        borderWidth:0.2,
    },
    checkboxesScroll:{
        padding:10,
    },
    c3:{
        minHeight:100,
        width:'100%',
        padding:10,
        paddingVertical:20,
        alignItems:'flex-start',
        justifyContent:'center',
        borderRadius:20,
        borderWidth:0.2,
    },
    error:{
        color:'red',
        fontSize:18,
        fontWeight:'bold'
    }

})