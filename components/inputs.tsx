import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { KeyboardTypeOptions, StyleSheet, TextInput, TextInputAutoCapitalize, View } from "react-native";

type InputsProps = {
  icons: keyof typeof MaterialCommunityIcons.glyphMap;
  placeholder: string;
  iconColor:string;
  iconBg:string;
  value:string;
  autoCapitalize?:TextInputAutoCapitalize;
  keyboardType?: KeyboardTypeOptions;
  onChangeText:(text:string)=> void;
   multiline?: boolean;
  numberOfLines?: number;
};

export default function  Inputs({
    icons,
    placeholder,
    iconColor,
    iconBg,
    keyboardType,
    value,
    multiline,
    numberOfLines,
    autoCapitalize,
    onChangeText
}:InputsProps){
  
    const size=30;

    return(
        <View style={styles.input_box}>
            <View style={[styles.icon,{backgroundColor:iconBg}]}>
                <MaterialCommunityIcons  name={icons} size={size}  color={iconColor}  />
            </View>
            <TextInput  multiline={multiline} numberOfLines={numberOfLines}  keyboardType={keyboardType} style={[styles.input,multiline && {minHeight: 120,textAlignVertical: "top",paddingTop: 15,},
  ]}  value={value}  onChangeText={onChangeText} placeholder={placeholder}  placeholderTextColor={"gray"}  autoCapitalize={autoCapitalize}/>
        </View>
    )
}


const styles=StyleSheet.create({
    input_box:{
        width:'100%',
        alignItems:'center',
        justifyContent:'space-evenly',
        flexDirection:'row',
        borderRadius:10,
        padding:10,
        paddingVertical:10,
        gap:10,
    },
    icon:{
        padding:8,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        borderWidth:0.2,
        backgroundColor:'red'
    },
    input:{
        minHeight:60,
        flex:1,
        borderRadius:10,
        borderWidth:0.5,
        fontSize:18,
        fontWeight:'600',
        paddingHorizontal:15,
    }
})