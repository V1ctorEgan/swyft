// app/hooks/useSpeedTracking.js (You might want to create an 'hooks' folder)
import { useState, useEffect } from 'react';
import * as Location from 'expo-location'; // Highlight: Import expo-location

const useSpeedTracking = () => {
  const [currentSpeed, setCurrentSpeed] = useState(0); // Speed in km/h
  const [isTracking, setIsTracking] = useState(false); // Whether actively tracking speed
  const [permissionStatus, setPermissionStatus] = useState(null); // Permission status
  const [error, setError] = useState(null); // Any error during tracking

  useEffect(() => {
    const requestLocationPermission = async () => {
      // Highlight: Request foreground location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
      if (status !== 'granted') {
        setError('Permission to access location was denied.');
        return;
      }


      const subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation, // Best accuracy for speed
          timeInterval: 100, 
          distanceInterval: 0.1, 
        },
        (location) => {
          // Highlight: Location.coords.speed is in meters/second
          let speedInMps = location.coords.speed;

          // Handle cases where speed is -1 (iOS) or null/undefined (Android sometimes)
          // -1 on iOS often means speed is not available or device is stationary
          if (speedInMps === null || speedInMps === undefined || speedInMps < 0) {
            speedInMps = 0;
          }

          // Convert meters/second to kilometers/hour
          const speedInKmH = speedInMps * 3.6;
          setCurrentSpeed(parseFloat(speedInKmH.toFixed(1))); // Round to 1 decimal place

          setIsTracking(true); // Indicate that we are actively receiving data
        }
      );

      // Highlight: Cleanup function to stop watching position when component unmounts
      return () => {
        if (subscriber) {
          subscriber.remove();
          setIsTracking(false);
          console.log('Stopped location tracking.');
        }
      };
    };

    requestLocationPermission();
  }, []); // Run once on component mount

  return { currentSpeed, isTracking, permissionStatus, error };
};

export default useSpeedTracking;
