import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ProfileScreen() {


const[userdetails,setUserdetails]=useState('');


useFocusEffect(
    useCallback(()=>{
        const load=async()=>{
           
          let Udata=await AsyncStorage.getItem("userDetails");
          
          let details=Udata ? JSON.parse(Udata)  : [];
          setUserdetails(details);          
        }
        load()

    },[])
)


  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}} contentContainerStyle={{alignItems:"center",justifyContent:'space-evenly', paddingBottom:150,padding:20}}>
        {/* Header */}

        <Text style={styles.heading}>Profile</Text>

        {/* Avatar */}

        <View style={styles.avatarContainer}>
          <MaterialCommunityIcons
            name="account-circle"
            size={110}
            color="#FACC15"
          />

          <Text style={styles.userName}>
            {userdetails.name || "Loading..."}
          </Text>

          <Text style={styles.subTitle}>
            Ride Tracker User
          </Text>
        </View>

        {/* Details Card */}

        <View style={styles.card}>

          {/* Name */}


          <View style={styles.row}>
            <MaterialCommunityIcons
              name="account-outline"
              size={28}
              color="#f7c707"
            />

            <View style={styles.textContainer}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>
                {userdetails.name || "Loading..."}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Vehicle Name */}

          <View style={styles.row}>
            <MaterialCommunityIcons
              name="bike"
              size={26}
              color="#60A5FA"
            />

            <View style={styles.textContainer}>
              <Text style={styles.label}>Vehicle Name</Text>
              <Text style={styles.value}>
                {userdetails.vName || "Loading..."}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Vehicle Number */}

          <View style={styles.row}>
            <MaterialCommunityIcons
              name="card-text-outline"
              size={26}
              color="#A78BFA"
            />

            <View style={styles.textContainer}>
              <Text style={styles.label}>Vehicle Number</Text>
              <Text style={styles.value}>
                {userdetails. registerNumber || "Loading..."}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

                    {/* Mileage */}

          <View style={styles.row}>
            <MaterialCommunityIcons
              name="speedometer"
              size={26}
              color="#22C55E"
            />

            <View style={styles.textContainer}>
              <Text style={styles.label}>Mileage</Text>
              <Text style={styles.value}>
                {userdetails.mileage
                  ? `${userdetails.mileage} km/L`
                  : "Loading..."}
              </Text>
            </View>
          </View>

        <View style={styles.divider} />

        {/* Vehicle category */}

          <View style={styles.row}>
            <MaterialCommunityIcons
              name="motorbike"
              size={26}
              color="#22C55E"
            />

            <View style={styles.textContainer}>
              <Text style={styles.label}>category</Text>
              <Text style={styles.value}>
                {userdetails.vehicle||"Loading..."}
              </Text>
            </View>
          </View>



          <View style={styles.divider} />

          {/* Petrol Price */}

          <View style={styles.row}>
            <MaterialCommunityIcons
              name="gas-station"
              size={26}
              color="#F97316"
            />

            <View style={styles.textContainer}>
              <Text style={styles.label}>Petrol Price</Text>
              <Text style={styles.value}>
                {userdetails.petrolPrice
                  ? `₹${userdetails.petrolPrice} / L`
                  : "Loading..."}
              </Text>
            </View>
          </View>

        </View>

        {/* Edit Button */}

        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          onPress={() => {router.navigate("/editScreen")}}
        >
          <MaterialCommunityIcons
            name="pencil-outline"
            size={22}
            color="#0F172A"
          />

          <Text style={styles.editButtonText}>
            Edit Details
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
 
  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: "orange",
    marginTop: 20,
    marginBottom: 25,
  },

  avatarContainer: {
    alignItems: "center",
    backgroundColor:'white',
    width:'100%',
    padding:20,
    borderRadius:20,
    elevation:9,
    marginBottom: 30,
  },

  userName: {
    color: "black",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },

  subTitle: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight:'bold',
    marginTop: 4,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    width:'100%',
    elevation:10,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
  },

  textContainer: {
    marginLeft: 18,
    flex: 1,
  },

  label: {
    color: "black",
    fontSize: 13,
    marginBottom: 4,
  },

  value: {
    color: "black",
    fontSize: 17,
    fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: "#334155",
  },

  editButton: {
    marginTop: 30,
    backgroundColor: "#FACC15",
    height: 56,
    width:'60%',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 4,
  },

  editButtonText: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 10,
  },
});