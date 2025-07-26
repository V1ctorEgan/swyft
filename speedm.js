import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CIRCLE_RADIUS = width * 0.3; // Defines the radius of the circular gauge
const STROKE_WIDTH = 20; // Defines the thickness of the circular progress bar

const SpeedMonitor = ({ currentSpeed, maxSpeed, avgSpeed }) => {
  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * CIRCLE_RADIUS;

  // Calculate the progress as a ratio (0 to 1), clamping it between 0 and maxSpeed
  const progress = Math.min(Math.max(0, currentSpeed), maxSpeed) / maxSpeed;

  // Calculate the strokeDashoffset to control how much of the stroke is visible
  // A higher value hides more of the stroke, so as progress increases, this value decreases.
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
        {/* Svg component acts as the canvas for drawing */}
        <Svg
          height={CIRCLE_RADIUS * 2 + STROKE_WIDTH} // Height = Diameter + Stroke Width (for padding)
          width={CIRCLE_RADIUS * 2 + STROKE_WIDTH}  // Width = Diameter + Stroke Width (for padding)
          style={styles.svg}
        >
          {/* Background Circle (the grey track) */}
          <Circle
            cx={CIRCLE_RADIUS + STROKE_WIDTH / 2} // Center X: radius + half stroke width
            cy={CIRCLE_RADIUS + STROKE_WIDTH / 2} // Center Y: radius + half stroke width
            r={CIRCLE_RADIUS}                    // Radius of the circle
            stroke="#4A4A4A"                     // Grey color for the background track
            strokeWidth={STROKE_WIDTH}           // Thickness of the stroke
            fill="transparent"                   // Make the inside transparent
          />
          {/* Progress Circle (the blue increasing part) */}
          <Circle
            cx={CIRCLE_RADIUS + STROKE_WIDTH / 2}
            cy={CIRCLE_RADIUS + STROKE_WIDTH / 2}
            r={CIRCLE_RADIUS}
            stroke="#6A8BF5"                     // Blue color for the progress (from your new image)
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
            strokeDasharray={circumference}      // Total length of the stroke
            strokeDashoffset={strokeDashoffset}  // How much of the stroke is hidden
            strokeLinecap="round"                // Makes the ends of the stroke rounded
            rotation="-90"                       // Start the progress from the top (12 o'clock position)
            originX={CIRCLE_RADIUS + STROKE_WIDTH / 2} // Set the origin for rotation to the center of the circle
            originY={CIRCLE_RADIUS + STROKE_WIDTH / 2} // Set the origin for rotation to the center of the circle
          />
        </Svg>
        {/* Text overlay for current speed */}
        <View style={styles.speedTextContainer}>
          <Text style={styles.currentSpeedText}>{currentSpeed}</Text>
          <Text style={styles.unitText}>km/h</Text>
        </View>
      </View>

      {/* Footer Section with Max and Avg Speed */}
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
    backgroundColor: '#1E1E1E', // Dark background of the card
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#007BFF', // Blue border for the card
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
    backgroundColor: '#1ED760', // Green dot for real-time
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
    // Basic styling for the SVG container, it aligns itself based on dimensions
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
    marginTop: -10, // Adjust to bring closer to speed number
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
