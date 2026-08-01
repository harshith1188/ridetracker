import Button from "@/components/button";
import Inputs from "@/components/inputs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
export  default  function Edit(){

      const [selectedVehicle, setSelectedVehicle] = useState("");
        const[name,setName]=useState('');
        const[regnum,setRegnum]=useState('');
        const[vname,setVname]=useState('');
        const[mileage,setMileage]=useState('');
        const[errortxt,setErrortxt]=useState('');
        const[petrol,setPetrol]=useState('');

        const category=[
            {label:"Scooty",value:'scooty'},
            {label:"Bike",value:'bike'},
            {label:"car",value:'car'},
            {label:"Auto-Rikshaw",value:'rikshaw'},
        ]

    useFocusEffect(
        useCallback(()=>{
            const load=async()=>{
                let Data=await AsyncStorage.getItem('userDetails');
                let uData=Data ? JSON.parse(Data) : [];
                setName(uData.name);
                setMileage(uData.mileage);
                setPetrol(uData.petrolPrice);
                setVname(uData.vName);
                setRegnum(uData.registerNumber);
                setSelectedVehicle(uData.vehicle);
            }
            load();
        },[])
    )

    const handleSave=async()=>{
        if(!name|| !mileage ||  !petrol || !selectedVehicle ||  !regnum  || !vname){
            setErrortxt("Fill all the  details");
            return
        }
        else
        {   

            setErrortxt('');
            try{
            const data={
                name:name,
                vName:vname,
                registerNumber:regnum,
                vehicle:selectedVehicle,
                mileage:mileage,
                petrolPrice:petrol,
            }
            setErrortxt("Saved succesfully");
            await AsyncStorage.setItem("userDetails",JSON.stringify(data));
            router.navigate("/profileScreen");
        }
        catch(error){
            console.log(error);
            setErrortxt("Failed to save data")
        }
        
        }
    }



        return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView  style={{flex:1}}  contentContainerStyle={{alignItems:'center',justifyContent:'center',padding:20,paddingBottom:30}}>
                <View style={styles.main}>
                <Text style={styles.title}>Edit Profile</Text>
                <Text style={styles.subTitle}>Enter the user details</Text>
                <Inputs 
                icons="account"
                iconColor="white"
                iconBg="orange"
                placeholder=""
                value={name}
                onChangeText={setName}
                />
                 <Inputs 
                icons="motion-outline"
                iconColor="white"
                iconBg="pink"
                placeholder=""
                value={vname}
                onChangeText={setVname}
                />
               <Inputs 
                icons="gas-station-in-use"
                iconColor="white"
                iconBg="red"
                placeholder=""
                value={petrol}
                onChangeText={setPetrol}
                />
                <Inputs 
                icons="speedometer"
                iconColor="white"
                iconBg="green"
                placeholder=""
                value={mileage}
                onChangeText={setMileage}
                />
                <Inputs 
                icons="registered-trademark"
                iconColor="white"
                iconBg="purple"
                placeholder=""
                value={regnum}
                onChangeText={setRegnum}
                />

                <Dropdown  
                 valueField={"value"}
                 labelField={"label"}
                 data={category}
                 style={styles.dd}
                 value={selectedVehicle}
                 placeholder="Select Vehicle Type"
                 onChange={(item) => {
                 setSelectedVehicle(item.value)}}
                 />
                 
                <Text style={styles.errTxt}>{errortxt}</Text>    

                <Button 
                 icons="content-save"
                 iconColor="white"
                 iconSize={30}
                 Bg="#3abd06fd"
                 txt="save"
                 txtSize={20}
                 onPress={handleSave}
                /> 
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles=StyleSheet.create({
    main:{
        minHeight:400,
        width:'100%',
        paddingVertical:30,
        alignItems:'center',
        justifyContent:'space-evenly',
        padding:10,
        borderRadius:10,
        marginTop:100,
        backgroundColor:'white',
        elevation:10
    },

    title:{
        fontSize:35,
        fontWeight:'bold'
    },
    subTitle:{
        fontSize:16,
        color:'gray',
        marginBottom:50,
        fontWeight:'bold'
    },
    dd:{
        minHeight:60,
        width:'80%',
        marginVertical:20,
        padding:20,
        borderWidth:0.5,
        borderRadius:10
    },
    errTxt:{
        color:'red',
        fontSize:14,
        fontWeight:'bold',
        marginVertical:20
    }

})