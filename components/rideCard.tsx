import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View } from "react-native";

type RideCardProps = {
  startKm: number;
  endKm: number;
  distance: number;
  amount: number;
  profit: number;
  startTime: string;
  endTime: string;
  notes?: string;
};

export default function RideCard({
  startKm,
  endKm,
  distance,
  amount,
  profit,
  startTime,
  endTime,
  notes,
}: RideCardProps) {
  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons
            name="scooter"
            size={30}
            color="white"
          />
        </View>

        <View style={styles.timeBox}>
          <Text style={styles.time}>
            {new Date(startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {"  →  "}
            {new Date(endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>

          <Text style={styles.km}>
            {startKm} → {endKm}
          </Text>
        
        </View>

        <View style={styles.profitBox}>
          <Text style={styles.profitAmount}>₹{profit}</Text>
          <Text style={styles.profitText}>Profit</Text>
        </View>
      </View>

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <View style={styles.info}>
          <MaterialCommunityIcons
            name="map-marker-distance"
            size={18}
            color="#3B82F6"
          />
          <Text style={styles.infoText}>{distance} km</Text>
        </View>

        <Text style={styles.date}>
          {new Date(startTime).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })}
        </Text>   


        <View style={styles.info}>
          <MaterialCommunityIcons
            name="cash"
            size={18}
            color="#4CAF50"
          />
          <Text style={styles.infoText}>₹{amount}</Text>
        </View>
      </View>

      {notes ? (
        <View style={styles.noteBox}>
          <MaterialCommunityIcons
            name="note-text"
            size={18}
            color="#F59E0B"
          />
          <Text style={styles.note}>{notes}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
    marginVertical: 8,
    elevation: 6,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconBox: {
    backgroundColor: "#F59E0B",
    padding: 12,
    borderRadius: 15,
  },

  timeBox: {
    flex: 1,
    marginHorizontal: 15,
  },

  time: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  km: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },

  profitBox: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 15,
    alignItems: "center",
  },

  profitAmount: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  profitText: {
    color: "white",
    fontSize: 13,
    marginTop: 2,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    borderTopWidth: 0.5,
    borderColor: "#E5E7EB",
    paddingTop: 14,
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  infoText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },

  noteBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "#FFF8E6",
    borderRadius: 10,
    padding: 10,
    gap: 8,
  },

  note: {
    color: "#444",
    fontSize: 14,
    flex: 1,
  },
});