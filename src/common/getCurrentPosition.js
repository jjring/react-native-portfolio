import { Platform } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';

export const convertLocation = (location, includeAccuracy = true) => {
  const notSample =
    !location.sample || (location.sample && location.sample !== 'true');
  const isAccurate =
    location.coords &&
    location.coords.accuracy &&
    location.coords.accuracy <= 46;

  if (notSample && (!includeAccuracy || (includeAccuracy && isAccurate))) {
    const {
      speed,
      longitude,
      latitude,
      accuracy,
      heading,
      altitude,
    } = location.coords;

    const date = new Date(location.timestamp);
    const time = date.getTime();

    const newLocation = {
      speed,
      longitude,
      latitude,
      accuracy,
      heading,
      altitude,
      time,
    };
    return newLocation;
  }

  return null;
};

export const getCurrentPosition = (samples = 1) =>
  new Promise((resolve, reject) => {
    BackgroundGeolocation.getCurrentPosition({
      maximumAge: 100,
      desiredAccuracy:
        Platform.OS === 'android'
          ? BackgroundGeolocation.DESIRED_ACCURACY_HIGH
          : BackgroundGeolocation.DESIRED_ACCURACY_NAVIGATION,
      persist: false,
      samples,
    })
      .then((location) => {
        if (
          !location.sample ||
          (location.sample && location.sample !== 'true')
        ) {
          resolve(convertLocation(location, false));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
