import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import SpeedMonitorSegmented from './speedm';
const App = () => {
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const maxSpeed = 45;
  const avgSpeed = 18.2;

  useEffect(() => {
    // Example of speed increasing over time
    const interval = setInterval(() => {
      setCurrentSpeed(prevSpeed => {
        if (prevSpeed < maxSpeed) {
          return prevSpeed + 1;
        }
        clearInterval(interval);
        return prevSpeed;
      });
    }, 500); // Increase speed every 0.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SpeedMonitorSegmented currentSpeed={currentSpeed} maxSpeed={maxSpeed} avgSpeed={avgSpeed} />
      </View>
      <View style={{ padding: 20 }}>
        <Button title="Reset Speed" onPress={() => setCurrentSpeed(0)} />
      </View>
    </View>
  );
};

export default App;