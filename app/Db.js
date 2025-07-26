import { View, Text, StyleSheet } from "react-native";
import Screen from "./components/Screen";
import { useState } from "react";
import ChargeLevel from "./components/chargeLevel";
import SpeedMonitor from "../speedm";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const Db = () => {
  const [voltage, setVoltage] = useState("48.5");
  const currentSpeed = 41.6;
  const maxSpeed = 45;
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.firstbox}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.battery}>Battery Status</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: "green",
                  marginRight: 5,
                }}
              ></View>
              <Text style={styles.live}>Live</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={styles.live}>Voltage</Text>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {voltage}v
            </Text>
          </View>
          <ChargeLevel />
          {/* <SpeedMonitor currentSpeed={20} maxSpeed={30} avgSpeed={25} /> */}
          <AnimatedCircularProgress
            size={220}
            width={15}
            fill={(currentSpeed / maxSpeed) * 100}
            tintColor="#ff4d4d"
            backgroundColor="#2c2c2e"
            rotation={0}
            arcSweepAngle={240}
            lineCap="round"
            children={() => (
              <Text style={styles.speedText}>
                {currentSpeed} <Text style={styles.unit}>km/h</Text>
              </Text>
            )}
            tintColorSecondary="#7df9ff"
            duration={1200}
          />
        </View>
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  firstbox: {
    width: "100%",
    height: 202,
    backgroundColor: "#222222",
    borderRadius: 16,
    padding: 25,
  },
  container: {
    padding: 24,
    backgroundColor: "#111111",
    flex: 1,
  },
  battery: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "white",
  },
  live: {
    fontSize: 14,
    color: "#999999",
  },
});

export default Db;
