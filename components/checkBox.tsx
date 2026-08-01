import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
 
type checkBoxProps={
    icons:keyof typeof MaterialCommunityIcons.glyphMap;
    iconColor:string;
    iconSize:number;
    Bg:string;
    Txt:string;
    selected:boolean;
    onPress:()=>void
}


export default  function CheckBox({
icons,iconColor,iconSize,Bg,Txt,onPress,selected
}:checkBoxProps){

    return(
        <TouchableOpacity style={[styles.box,{backgroundColor:Bg,borderColor:selected ? "#FDCB2E" : "#D1D5DB",borderWidth:selected ? 2:1}]} onPress={onPress} >
            <MaterialCommunityIcons name={icons} size={iconSize}  color={selected ? "#FDCB2E" :iconColor }  />
            <Text style={styles.txt}>{Txt}</Text>
        </TouchableOpacity>
    )
}

const  styles=StyleSheet.create({
    box:{
        minHeight:150,
        width:130,
        backgroundColor:'gray',
        alignItems:'center',
        justifyContent:'space-evenly',
        borderRadius:10,
        borderWidth:1
    },
    txt:{
        fontSize:18,
        textTransform:'capitalize',
        fontWeight:'700'
    }
})