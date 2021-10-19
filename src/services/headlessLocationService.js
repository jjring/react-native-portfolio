// import crashlytics from '@react-native-firebase/crashlytics';
import { convertLocation } from '../common/getCurrentPosition';
import realm from '../database';
import Queries from '../database/queries';

const uuid = require('react-native-uuid');

const setLocation = async (location) => {
  // console.log(location);

  const appSettings = Queries.getAppSettings();
  const wholeDate = new Date();
  const date = wholeDate.getTime() / 1000;

  const {
    speed,
    longitude,
    latitude,
    time,
    accuracy,
    heading,
    altitude,
  } = location;

  // 1800
  if (
    Math.abs(appSettings.lastWeatherTime - date) > 1800 &&
    appSettings.fetchingWeather === false
  ) {
    realm.write(() => {
      realm.create(
        'AppSettings',
        {
          id: 0,
          fetchingWeather: true,
        },
        true
      );
    });

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=`;
    // eslint-disable-next-line no-undef
    fetch(weatherUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        const id = uuid.v4();

        const weatherLocation = {
          id,
          x: longitude,
          y: latitude,
          t: parseInt(time / 1000, 10),
          desc: responseJson.weather[0].main,
          temp: responseJson.main.temp,
          pressure: responseJson.main.pressure,
          humidity: responseJson.main.humidity,
          windSpeed: responseJson.wind.speed,
          windDirection: responseJson.wind.deg ?? 0,
          altitude: altitude ?? -1,
          routeId: 'headless',
        };
        realm.write(() => {
          const databaseRoute = realm.create(
            'Route',
            {
              id: 'headless',
              name: 'Headless',
              createdDate: wholeDate,
              updatedDate: wholeDate,
            },
            true
          );

          databaseRoute.weatherLocations.push(weatherLocation);

          realm.create(
            'AppSettings',
            {
              id: 0,
              lastWeatherTime: weatherLocation.t,
              fetchingWeather: false,
            },
            true
          );
        });
      })
      .catch(() => {
        realm.write(() => {
          realm.create('AppSettings', { id: 0, fetchingWeather: false }, true);
        });
        // crashlytics().recordError(new Error(error));
      });
  }

  realm.write(() => {
    const databaseRoute = realm.create(
      'Route',
      {
        id: 'headless',
        name: 'Headless',
        createdDate: wholeDate,
        updatedDate: wholeDate,
        directionsUpToDate: false,
      },
      true
    );

    const id = uuid.v4();
    const newLocation = {
      id,
      speed: speed ?? -1,
      x: longitude,
      y: latitude,
      accuracy,
      heading: heading ?? -1,
      t: parseInt(time / 1000, 10),
      routeId: 'headless',
      altitude: altitude ?? -1,
    };

    databaseRoute.locations.push(newLocation);
  });
  return Promise.resolve();
};

/// /
// Define your Headless task -- simply a javascript async function to receive
// events from BackgroundGeolocation:
//
export default async (event) => {
  const { params } = event;
  // console.log('[BackgroundGeolocation HeadlessTask] -', event.name, params);

  switch (event.name) {
    case 'location': {
      const location = params;

      if (!location.sample || (location.sample && location.sample !== 'true')) {
        const convertedLocation = convertLocation(location);
        if (convertedLocation) {
          await setLocation(convertedLocation);
        }
        // console.log(
        //   '[BackgroundGeolocation HeadlessTask] - getCurrentPosition:',
        //   convertedLocation
        // );
      }

      break;
    }
    default:
      break;
  }
};
