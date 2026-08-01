import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type BoxProps={
    icons:keyof typeof MaterialCommunityIcons.glyphMap;
    iconColor:string;
    iconBg:string;
    iconSize:number;
    text1:string;
    text2:string;
    value:number;
    boxBg:string;
    suffix:string;
    prefix:string;
}
export default  function  Box({
iconBg,iconSize,text2,iconColor,icons,text1,value,boxBg,suffix,prefix
}:BoxProps){
    return(
        <TouchableOpacity style={[styles.b1,{backgroundColor:boxBg}]}>
           <View style={[styles.icon,{backgroundColor:iconBg}]}>
            <MaterialCommunityIcons name={icons} size={iconSize}  color={iconColor}/>
            </View> 
            <Text style={styles.h2}>{text1}</Text>
            <Text style={styles.num}>{prefix}{value} {suffix}</Text>
            <Text style={styles.h3}>{text2}</Text>

        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    b1:{
        minHeight:180,
        width:'45%',
        alignItems:'flex-start',
        justifyContent:'space-evenly',
        padding:10,
        paddingLeft:20,
        backgroundColor:'white',
        borderRadius:10,
        elevation:8
    },
    icon:{
        padding:10,
        backgroundColor:'yellow',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    h3:{
        fontSize:14,
        fontWeight:'700',
        color:'gray'
    },
    num:{
        fontSize:25,
        fontWeight:'bold'
    },
    h2:{
        fontSize:18,
        fontWeight:'600'
    }  
})