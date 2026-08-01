import PetrolCard from "@/components/petrolCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getLastMonth, getThisMonth, getThisWeek, getTodayPetrol, getYesterdayPetrol } from "../calculations";

export default function RideHistory() {
  const [pHistory, setPHistory] = useState([]);//flatlist  array state
  const[selectedTab,setSelectedTab]=useState("All");//diabled  states for buttons
  const[allPHistory,setAllPHistory]=useState([]);//getting all the petrol details
  const[mileage,setMileage]=useState(0);  
useFocusEffect(
  useCallback(()=>{
 
 const load=async()=>{
  let petrolData=await  AsyncStorage.getItem("FuelHistory");
  if(petrolData){
    let petrolHistory =JSON.parse(petrolData);
    //saving  all rides  in rides state
    setAllPHistory(petrolHistory);

    //calculating range
const vdata=await AsyncStorage.getItem("userDetails");
  if(vdata){
    let vehicle=JSON.parse(vdata);
    setMileage(vehicle.mileage);
  }


}
  else{
    alert("No Fuel history")
  }

  
}

  load()

  },[])
)


 const  handletdy=async()=>{

    //getting tdy rides
    const todayPetrol  = getTodayPetrol(allPHistory);
    setPHistory(todayPetrol);//display in flatlist
    
    //disable today button
    setSelectedTab("Today");
  }



 const  handleyestdy=async()=>{

  if(allPHistory){
  
    //getting tdy rides
    const yesterdayPetrol  = getYesterdayPetrol(allPHistory);
    setPHistory(yesterdayPetrol);
    
    setSelectedTab("Yesterday");
  }

}

const  handleThisWeek=()=>{
  const thisWeek=getThisWeek(allPHistory)
  setPHistory(thisWeek)
  setSelectedTab("This Week");
}


const  handleThisMonth=()=>{
const thisMonth=getThisMonth(allPHistory)
setPHistory(thisMonth)
setSelectedTab("This Month");
}

const handleLastMonth=()=>{
  const lastMonth=getLastMonth(allPHistory);
  setPHistory(lastMonth);
  setSelectedTab("Last Month");
}


const handleall =async()=>{

  if(allPHistory)
    {
    setPHistory(allPHistory);
    setSelectedTab('All');
  }
}



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={pHistory}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom:150,
        }}
        ListHeaderComponent={
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.tab}
              contentContainerStyle={{
                alignItems: "center",
                gap: 20,
                padding: 10,
              }}
            >
              <TouchableOpacity  disabled={selectedTab==="Today"} style={[styles.tabbtn,{backgroundColor:selectedTab==='Today'? "gray":"#F59E0B",}]} onPress={handletdy} >
                <Text style={styles.tabText}>Today</Text>
              </TouchableOpacity>

              <TouchableOpacity disabled={selectedTab==="Yesterday"} style={[styles.tabbtn,{backgroundColor:selectedTab==='Yesterday'? "gray":"#F59E0B",}]}  onPress={handleyestdy} >
                <Text style={styles.tabText}>Yesterday</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.tabbtn,{backgroundColor:selectedTab==='This Week'? "gray":"#F59E0B",}]} disabled={selectedTab==="This Week"} onPress={handleThisWeek}   >
                <Text style={styles.tabText}>This Week</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.tabbtn,{backgroundColor:selectedTab==='This Month'? "gray":"#F59E0B",}]} disabled={selectedTab==="This Month"} onPress={handleThisMonth}>
                <Text style={styles.tabText}>This Month</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.tabbtn,{backgroundColor:selectedTab==='Last Month'? "gray":"#F59E0B",}]} disabled={selectedTab==="Last Month"} onPress={handleLastMonth}>
                <Text style={styles.tabText}>Last Month</Text>
              </TouchableOpacity>
          
              <TouchableOpacity style={[styles.tabbtn,{backgroundColor:selectedTab==='All'? "gray":"#F59E0B",}]} disabled={selectedTab==="All"} onPress={handleall}>
                <Text style={styles.tabText}>All</Text>
              </TouchableOpacity>
            </ScrollView>
          </>
        }
        renderItem={({ item }) => (
          <PetrolCard
            bunkName={item.bunk}
            area={item.area}
            liters={item.liters}
            odometer={item.km}
            totalCost={item.cost}
            time={item.time}
            date={item.date}
            note={item.notes}
            mileage={mileage}

            />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tab: {
    minHeight: 100,
    marginBottom: 15,
  },

  tabbtn: {
    height: 55,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F59E0B",
    borderRadius: 12,
  },

  tabText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});