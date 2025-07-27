// app/components/monitor.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Svg, { Defs, LinearGradient as SvgGradient, Stop } from "react-native-svg";
import useSpeedTracking from '../hooks/useSpeedTracking'; // Highlight: Import the new hook

const Monitors = () => {
  // Highlight: Use the custom hook to get real-time speed data
  const { currentSpeed, isTracking, permissionStatus, error } = useSpeedTracking();

  const maxSpeed = 45; // Your desired max speed for the gauge
  const avgSpeed = 18.2; // Keep as a placeholder or fetch from elsewhere if needed

  // Calculate fill percentage for the circular progress bar
  const fillPercentage = (currentSpeed / maxSpeed) * 100;

  // Determine status text based on tracking status and speed
  const statusText = permissionStatus !== 'granted'
    ? 'Permission Denied'
    : error
      ? `Error: ${error}`
      : isTracking && currentSpeed > 0
        ? 'Riding'
        : 'Stopped';

  const statusColor = permissionStatus !== 'granted'
    ? 'orange' // Indicate permission issue
    : error
      ? 'red'
      : isTracking && currentSpeed > 0
        ? 'green'
        : '#999999'; // Grey for stopped

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
          Speed Monitors
        </Text>
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
              backgroundColor: statusColor, // Highlight: Dynamic status color
              marginRight: 6,
              borderRadius: 10,
            }}
          ></View>
          <Text style={styles.textSmall}>{statusText}</Text> {/* Highlight: Dynamic status text */}
        </View>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 32 }}>
        {permissionStatus === null || !isTracking ? ( // Highlight: Show loading or permission message
          <View style={styles.loadingContainer}>
            {permissionStatus === null && <ActivityIndicator size="large" color="#4A6DDE" />}
            {permissionStatus === 'undetermined' && <Text style={styles.messageText}>Requesting location permission...</Text>}
            {permissionStatus === 'denied' && (
              <Text style={styles.messageText}>
                Location permission denied. Please enable in settings to track speed.
              </Text>
            )}
            {error && <Text style={styles.messageText}>Error: {error}</Text>}
          </View>
        ) : (
          <AnimatedCircularProgress
            size={220}
            width={15}
            fill={fillPercentage} // Highlight: Use calculated fill percentage
            tintColor="#4A6DDE"
            backgroundColor="#4B4B4B"
            rotation={240}
            arcSweepAngle={240}
            lineCap="round"
            children={() => (
              <View style={styles.speedText}>
                <Text style={styles.speed}>{currentSpeed.toFixed(1)}</Text> {/* Highlight: Display real-time speed */}
                <Text style={styles.unit}>km/h</Text>
              </View>
            )}
            tintColorSecondary="#D2FF7D"
            duration={1200}
          />
        )}
      </View>
      <View style={{ flexDirection: "row", gap: 122 }}>
        <Text style={styles.textSmall}>Max Speed</Text>
        <Text style={styles.textSmall}>Avg Speed</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 122 }}>
        <Text style={styles.textSmalls}>{maxSpeed} km/h</Text>
        <Text style={[styles.textSmalls, { marginLeft: 16 }]}>{avgSpeed} km/h</Text> {/* Highlight: Use avgSpeed state */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: 400, // Highlight: Removed fixed height to allow content to flex
    backgroundColor: "#222222",
    borderRadius: 16,
    padding: 25,
    marginTop: 16,
    paddingBottom: 20, // Added padding at the bottom
  },
  loadingContainer: { // Highlight: New style for loading/permission messages
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200, // Give it some height
  },
  messageText: { // Highlight: New style for message text
    color: '#ff6b6b',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  textSmall: {
    fontSize: 14,
    color: "#999999",
  },
  textSmalls: {
    fontSize: 14,
    color: "#ffffff",
  },
  speedText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  speed: {
    fontSize: 60,
    color: "white",
  },
  unit: {
    fontSize: 18,
    color: "#999999",
  },
});
export default Monitors;
