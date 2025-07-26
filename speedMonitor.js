import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CIRCLE_RADIUS = width * 0.3; // Adjust as needed
const STROKE_WIDTH = 20;

const SpeedMonitor = ({ currentSpeed, maxSpeed, avgSpeed }) => {
  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * CIRCLE_RADIUS;
  // Calculate the strokeDashoffset for the progress bar
  // The progress is currentSpeed / maxSpeed
  // We want to fill the circle from the bottom, so we adjust the calculation
  const progress = currentSpeed / maxSpeed;
  const strokeDashoffset = circumference - (circumference * progress);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Speed Monitor</Text>
        <View style={styles.realTimeContainer}>
          <View style={styles.realTimeIndicator} />
          <Text style={styles.realTimeText}>Real-time</Text>
        </View>
      </View>

      {/* Circular Progress Bar Section */}
      <View style={styles.circularProgressContainer}>
        <Svg height={CIRCLE_RADIUS * 2 + STROKE_WIDTH} width={CIRCLE_RADIUS * 2 + STROKE_WIDTH} style={styles.svg}>
          {/* Background Circle */}
          <Circle
            cx={CIRCLE_RADIUS + STROKE_WIDTH / 2}
            cy={CIRCLE_RADIUS + STROKE_WIDTH / 2}
            r={CIRCLE_RADIUS}
            stroke="#4A4A4A" // Gray color for the track
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
          />
          {/* Progress Circle */}
          <Circle
            cx={CIRCLE_RADIUS + STROKE_WIDTH / 2}
            cy={CIRCLE_RADIUS + STROKE_WIDTH / 2}
            r={CIRCLE_RADIUS}
            stroke="#1ED760" // Green color for the progress
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" // Rounded ends for the progress
            rotation="-90" // Start the progress from the top
            originX={CIRCLE_RADIUS + STROKE_WIDTH / 2}
            originY={CIRCLE_RADIUS + STROKE_WIDTH / 2}
          />
        </Svg>
        <View style={styles.speedTextContainer}>
          <Text style={styles.currentSpeedText}>{currentSpeed}</Text>
          <Text style={styles.unitText}>km/h</Text>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <View style={styles.speedInfo}>
          <Text style={styles.speedLabel}>Max Speed</Text>
          <Text style={styles.speedValue}>{maxSpeed} km/h</Text>
        </View>
        <View style={styles.speedInfo}>
          <Text style={styles.speedLabel}>Avg Speed</Text>
          <Text style={styles.speedValue}>{avgSpeed} km/h</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E', // Dark background
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#007BFF', // Blue border
    padding: 20,
    margin: 10,
    alignItems: 'center',
    width: '95%', // Responsive width
    maxWidth: 400, // Max width for larger screens
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  realTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  realTimeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1ED760', // Green indicator
    marginRight: 5,
  },
  realTimeText: {
    color: '#1ED760',
    fontSize: 14,
  },
  circularProgressContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  svg: {
    // position: 'absolute', // Svg must be relative to its container
  },
  speedTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  currentSpeedText: {
    color: '#FFFFFF',
    fontSize: 50,
    fontWeight: 'bold',
  },
  unitText: {
    color: '#BBBBBB',
    fontSize: 16,
    marginTop: -10, // Adjust to bring closer to speed
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  speedInfo: {
    alignItems: 'center',
  },
  speedLabel: {
    color: '#BBBBBB',
    fontSize: 14,
    marginBottom: 5,
  },
  speedValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SpeedMonitor;