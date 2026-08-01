import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View } from "react-native";

type PetrolCardProps = {
  bunkName: string;
  area: string;
  liters: number;
  totalCost: number;
  mileage: number;
  odometer: number;
  date: string;
  time: string;
  note?: string;
};

export default function PetrolCard({
  bunkName,
  area,
  liters,
  totalCost,
  mileage,
  odometer,
  date,
  time,
  note,
}: PetrolCardProps) {

const formattedDate = new Date(date).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="gas-station"
              size={24}
              color="white"
            />
          </View>

          <View style={styles.headerText}>
            <Text
              style={styles.bunkName}
              numberOfLines={1}
            >
              {bunkName}
            </Text>

            <View style={styles.locationRow}>
              <MaterialCommunityIcons
                name="map-marker"
                size={14}
                color="blue"
              />

              <Text style={styles.locationText}>
                {area} • {formattedDate} • {time}
              </Text>

            </View>
          </View>
        </View>
        <Text style={styles.cost}>₹{totalCost}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <MaterialCommunityIcons
            name="fuel"
            size={20}
            color="red"
          />

          <Text style={styles.statValue}>
            {liters.toFixed(2)} L
          </Text>

          <Text style={styles.statLabel}>
            Liters
          </Text>
        </View>

        <View style={styles.statItem}>
          <MaterialCommunityIcons
            name="map-marker-distance"
            size={20}
            color="#60A5FA"
          />

          <Text style={styles.statValue}>
            {mileage*liters} km
          </Text>

          <Text style={styles.statLabel}>
            Range
          </Text>
        </View>

        <View style={styles.statItem}>
          <MaterialCommunityIcons
            name="speedometer"
            size={20}
            color="#22C55E"
          />

          <Text style={styles.statValue}>
            {odometer.toLocaleString()} km
          </Text>

          <Text style={styles.statLabel}>
            Odometer
          </Text>
        </View>
      </View>
    {/* Note Section (Shown only if note exists) */}
      {note?.trim() ? (
        <>
          <View style={styles.divider} />

          <View style={styles.noteContainer}>
            <MaterialCommunityIcons
              name="note-text-outline"
              size={20}
              color="#fa15db"
            />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.noteTitle}>Note</Text>

              <Text style={styles.noteText}>
                {note}
              </Text>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor:"white",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation:10
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  headerText: {
    flex: 1,
  },

  bunkName: {
    color: "black",
    fontSize: 18,
    textTransform:'uppercase',
    fontWeight: "700",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  locationText: {
    color: "black",
    fontSize: 12,
    fontWeight:'bold',
    marginLeft: 4,
    flex: 1,
  },

  cost: {
    color: "#22C55E",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#2B3442",
    marginVertical: 16,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8,
  },

  statLabel: {
    color: "black",
    fontSize: 12,
    marginTop: 3,
  },

  noteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  noteTitle: {
    color:"black",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },

  noteText: {
    color: "#12233d",
    fontSize: 14,
    lineHeight: 20,
  },
});