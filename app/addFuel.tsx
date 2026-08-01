import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Inputs from "@/components/inputs";
import { router } from "expo-router";

export default function AddFuel() {

  const [date, setDate] = useState(new Date());

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const [liters, setLiters] = useState("");
  const [cost, setCost] = useState("");
  const [bunk, setBunk] = useState("");
  const [area, setArea] = useState("");
  const [notes, setNotes] = useState("");
  const[kms,setKms]=useState("");
  const onDateChange = (_: any, selectedDate?: Date) => {
    setShowDate(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (_: any, selectedDate?: Date) => {
    setShowTime(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  const saveFuel = async () => {
    if (liters.trim() === "" ||cost.trim() === "" ||bunk.trim() === "" ||area.trim() === "") {
      alert("Please fill all required fields.");
      return;
    }

    const fuelData = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      time: formatTime(date),
      liters:Number(liters),
      cost:Number(cost),
      km:Number(kms),
      bunk,
      area,
      notes,
    };

    try {
      const oldData = await AsyncStorage.getItem("FuelHistory");

      const fuelHistory = oldData ? JSON.parse(oldData) : [];

      fuelHistory.unshift(fuelData);

      await AsyncStorage.setItem("FuelHistory",JSON.stringify(fuelHistory));
      alert("Fuel entry saved successfully!");

      setLiters("");
      setCost("");
      setBunk("");
      setArea("");
      setNotes("");
      setDate(new Date());
        router.navigate('/(tabs)');
    } 
    catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 40,}}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="gas-station"
            size={65}
            color="#fa1d15"
          />

          <Text style={styles.heading}>Add Fuel</Text>

          <Text style={styles.subHeading}>
            Record every fuel refill
          </Text>
        </View>

        {/* Date */}

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDate(true)}
        >
          <MaterialCommunityIcons
            name="calendar"
            size={24}
            color="#FACC15"
          />

          <Text style={styles.dateText}>
            {formatDate(date)}
          </Text>
        </TouchableOpacity>

        {/* Time */}

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowTime(true)}
        >
          <MaterialCommunityIcons
            name="clock-outline"
            size={24}
            color="#FACC15"
          />

          <Text style={styles.dateText}>
            {formatTime(date)}
          </Text>
        </TouchableOpacity>

        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            display={
              Platform.OS === "ios" ? "spinner" : "default"
            }
            onChange={onDateChange}
          />
        )}

        {showTime && (
          <DateTimePicker
            value={date}
            mode="time"
            display={
              Platform.OS === "ios" ? "spinner" : "default"
            }
            onChange={onTimeChange}
          />
        )}

        <Inputs
          icons="gas-station"
          placeholder="Fuel in Liters"
          value={liters}
          onChangeText={setLiters}
          keyboardType="decimal-pad"
          iconBg="#FEF3C7"
          iconColor="#F59E0B"
        />

        <Inputs
          icons="currency-inr"
          placeholder="Total Cost"
          value={cost}
          onChangeText={setCost}
          keyboardType="decimal-pad"
          iconBg="#DCFCE7"
          iconColor="#22C55E"
        />

         <Inputs
          icons="speedometer-medium"
          placeholder="odometer km's"
          value={kms}
          onChangeText={setKms}
          keyboardType="decimal-pad"
          iconBg="#dcf3fc"
          iconColor="#223bc5"
        />

        <Inputs
          icons="gas-station-outline"
          placeholder="Petrol Bunk"
          value={bunk}
          onChangeText={setBunk}
          autoCapitalize="words"
          iconBg="#DBEAFE"
          iconColor="#2563EB"
        />

        <Inputs
          icons="map-marker"
          placeholder="Area"
          value={area}
          onChangeText={setArea}
          autoCapitalize="words"
          iconBg="#F3E8FF"
          iconColor="#9333EA"
        />

        <Inputs
          icons="note-text-outline"
          placeholder="Notes (Optional)"
          value={notes}
          multiline
          numberOfLines={3}
          onChangeText={setNotes}
          autoCapitalize="sentences"
          iconBg="#FFE4E6"
          iconColor="#E11D48"
        />

        <TouchableOpacity activeOpacity={0.8} onPress={saveFuel}>
          <LinearGradient
            colors={["#2563EB", "#3B82F6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveBtn}
          >
            <MaterialCommunityIcons
              name="content-save"
              size={24}
              color="white"
            />

            <Text style={styles.saveText}>
              Save Fuel Entry
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 18,
  },

  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 35,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 15,
  },

  subHeading: {
    color: "#64748B",
    fontSize: 16,
    marginTop: 5,
  },

  dateButton: {
    height: 62,
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    gap: 15,
  },

  dateText: {
    fontSize: 17,
    color: "#0F172A",
    fontWeight: "600",
  },

  saveBtn: {
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    marginTop: 30,
    marginBottom: 30,
  },

  saveText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});