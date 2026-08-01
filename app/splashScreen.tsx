import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen(){

  useEffect(()=>{
    const timer=setTimeout(async()=>{
      const login_detail=await AsyncStorage.getItem('login');
      if(login_detail==='true'){
        router.replace('/(tabs)');
      }
      else{
      router.replace('/entryScreen')
      }
    },3000);

    return()=>{ 
      clearTimeout(timer)
    }
  },[])


  return(
    <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <View style={styles.c1}>
      <Image source={require('../assets/images/main_logo.png')} style={{height:400,width:'95%',borderRadius:10,borderColor:'yellow',borderWidth:3}}/>
      </View>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
  c1:{
    minHeight:500,
    padding:10,
    width:"100%",
    alignItems:"center",
    justifyContent:'space-evenly',
    borderRadius:20
  }
})