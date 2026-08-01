import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type  ButtonProps={
    icons:keyof typeof MaterialCommunityIcons.glyphMap;
    iconColor:string;
    iconSize:number;
    Bg:string;
    txt:string;
    txtSize:number;
    disabled:boolean;
    onPress:()=>void
}
export default  function Button({
icons,iconSize,iconColor,Bg,txt,onPress,txtSize,disabled
}:ButtonProps){
    return(
        <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.box,{backgroundColor:disabled  ? "gray":Bg}]} >
            <Text style={[styles.txt,{fontSize:txtSize}]}>{txt}</Text>
            <MaterialCommunityIcons  name={icons} color={iconColor} size={iconSize} />
        </TouchableOpacity>
    )
}



const  styles=StyleSheet.create({
    box:{
        minHeight:60,
        width:"80%",
        alignItems:'center',
        borderRadius:10,
        justifyContent:'center',
        gap:10,
        padding:10,
        flexDirection:'row',
        
    },
    txt:{
        fontSize:28,
        color:'white',
        textTransform:'capitalize',
        fontWeight:'700'
    }
})