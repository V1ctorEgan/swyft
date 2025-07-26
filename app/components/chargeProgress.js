import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChargesLevel = ({ level }) => {
  // Ensure the level is between 0 and 100
  const normalizedLevel = Math.max(0, Math.min(100, level));
  const progressBarWidth = `${normalizedLevel}%`; // Calculate width as a percentage

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.labelText}>Charge Level</Text>
        <Text style={styles.percentageText}>{`${normalizedLevel}%`}</Text>
      </View>

      {/* Progress Bar Section */}
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: progressBarWidth }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E', // Dark background matching your other components
    borderRadius: 16,
    // borderWidth: 1,
    borderColor: '#007BFF', // Blue border, consistent with your Speed Monitor
    padding: 20,
    margin: 10,
    width: '95%', // Take up most of the width
    maxWidth: 400, // Max width for larger screens
    alignSelf: 'center', // Center the component horizontally
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15, // Space between header and progress bar
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  percentageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 12, // Height of the progress bar
    backgroundColor: '#4A4A4A', // Grey background for the unfilled part
    borderRadius: 6, // Rounded corners for the bar
    overflow: 'hidden', // Ensures the fill stays within the rounded corners
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6A5ACD', // Blue color for the filled part, matching your image
    borderRadius: 6, // Rounded corners for the fill
  },
});

export default ChargesLevel;