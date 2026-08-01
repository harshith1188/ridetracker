import RideCard from "@/components/rideCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getLastMonth, getThisMonth, getThisWeek, getTodayRides, getYesterdayRides } from "../calculations";

export default function RideHistory() {
  const [rides, setRides] = useState([]);//flatlist  array state
  const[selectedTab,setSelectedTab]=useState('All');//diabled  states for buttons
  const[allRides,setAllRides]=useState([]);//getting all the ride details

useFocusEffect(
  useCallback(()=>{
 
 const load=async()=>{
  let rideData=await  AsyncStorage.getItem("rideDetails");
  if(rideData){
    let rides =JSON.parse(rideData);
    //saving  all rides  in rides state
    setAllRides(rides);
  }
  else{
    alert("no  ridde  history")
  }

}

  load()

  },[])
)


 const  handletdy=async()=>{

    //getting tdy rides
    const todayRides  = getTodayRides(allRides);
    setRides(todayRides);//display in flatlist
    
    //disable today button
    setSelectedTab("Today");
  }



 const  handleyestdy=async()=>{
    const yesterdayRides  = getYesterdayRides(allRides);
    setRides(yesterdayRides);
    setSelectedTab("Yesterday");
  }

  const  handleThisWeek=async()=>{
    const thisWeek=getThisWeek(allRides);
    setSelectedTab("This Week");
    setRides(thisWeek);
  }
  
  const handleThisMonth=async()=>{
    const  thisMonth=getThisMonth(allRides);
    setRides(thisMonth);
    setSelectedTab("This Month");
  } 
  const handleLastMonth=async()=>{
    const  lastMonth=getLastMonth(allRides);
    setRides(lastMonth);
    setSelectedTab("Last Month");
  } 

  const handleall =async()=>{
    setRides(allRides);
    setSelectedTab('All');
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 50,
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
          <RideCard
            startKm={item.skm}
            endKm={item.ekm}
            profit={item.profit}
            amount={item.amount}
            startTime={item.stime}
            endTime={item.etime}
            distance={item.distance}
            notes={item.notes}
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