import { differenceInDays } from 'date-fns';
import realm from './index';

const uuid = require('react-native-uuid');

function sortLocations(inputArr) {
  const { length } = inputArr;
  for (let i = 1; i < length; i++) {
    const key = inputArr[i];
    let j = i - 1;
    while (j >= 0 && inputArr[j] > key) {
      // eslint-disable-next-line
      inputArr[j + 1] = inputArr[j];
      j -= 1;
    }
    // eslint-disable-next-line
    inputArr[j + 1] = key;
  }
  return inputArr;
}

class Queries {
  getUserSettings = () => {
    const results = realm.objects('UserSettings');

    if (results.length < 1) {
      realm.write(() => {
        const settings = {
          units: 0,
          accuracy: 1,
          weatherPins: true,
          stopPins: false,
          stopPinDuration: 1,
          intervalPins: false,
          intervalPinDistance: 7,
          showAltitude: false,
          showSpeed: false,
        };
        realm.create('UserSettings', settings);
        return realm.objects('UserSettings')[0];
      });
    }
    return results[0];
  };
  
  getRoutes = () => {
    const results = realm.objects('Route').filtered('id != $0', 'headless');
    return results;
  };

  getRoute = (id) => {
    // console.log('loading');
    const results = realm.objects('Route').filtered('id == $0', id).toJSON();

    // console.log('optimizing');

    const sortedLocations = sortLocations(results[0].locations);

    const uniqueSortedLocations = [];
    for (let i = 0; i < sortedLocations.length; i++) {
      const tempLoc = sortedLocations[i];
      if (uniqueSortedLocations.length === 0) {
        uniqueSortedLocations.push(tempLoc);
      } else {
        const lastLoc = uniqueSortedLocations[uniqueSortedLocations.length - 1];
        if (lastLoc.t !== tempLoc.t) {
          uniqueSortedLocations.push(tempLoc);
        }
      }
    }

    if (results[0].locations.length !== uniqueSortedLocations.length) {
      // console.log('!!!NOT EQUAL!!!');
      // console.log('cleaning');
      const deleteLocations = realm
        .objects('Location')
        .filtered('routeId == $0', id);

      realm.write(() => {
        realm.delete(deleteLocations);
      });

      // console.log('saving');

      realm.write(() => {
        const databaseRoute = realm.create(
          'Route',
          {
            id,
            name: results[0].name,
            createdDate: results[0].createdDate,
            updatedDate: new Date(),
            directionsUpToDate: false,
          },
          true
        );
        uniqueSortedLocations.forEach((saveLoc) => {
          databaseRoute.locations.push(saveLoc);
        });
      });
    }
    // console.log('done');
    const route = {
      ...results[0],
      locations: uniqueSortedLocations,
    };

    return route;
  };

  getSharedRoutes = () => {
    const sharedRoutes = realm.objects('SharedRoute').toJSON();
    const routes = realm
      .objects('Route')
      .filtered('id != $0', 'headless')
      .sorted('name')
      .toJSON();

    const results = [];

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];

      let shared = false;
      let sharedDate = null;
      let expired = true;
      let expiresIn = 0;

      const sharedRoute = sharedRoutes.find((s) => s.routeId === route.id);

      if (sharedRoute) {
        const daysSinceShare = differenceInDays(
          new Date(),
          new Date(sharedRoute.sharedDate)
        );
        sharedDate = sharedRoute.sharedDate;
        shared = true;
        expiresIn = Math.max(365 - daysSinceShare, 0);
        expired = expiresIn <= 0;
      }

      results.push({ ...route, shared, sharedDate, expired, expiresIn });
    }

    return results;
  };

  getSharedRoute = (routeId) => {
    const results = realm
      .objects('SharedRoute')
      .filtered('routeId == $0', routeId)
      .toJSON();

    if (results.length > 0) {
      return {
        ...results[0],
      };
    }

    return null;
  };

  updateSharedRouteDate = (routeId, link) => {
    const results = realm
      .objects('SharedRoute')
      .filtered('routeId == $0', routeId)
      .toJSON();

    let id = '';
    if (results.length > 0) {
      id = results[0].id;
    } else {
      id = uuid.v4();
    }

    realm.write(() => {
      realm.create(
        'SharedRoute',
        {
          id,
          routeId,
          link,
          sharedDate: new Date(),
        },
        true
      );
    });
  };

  deleteSharedRouteDate = (routeId) => {
    const sharedRoutes = realm
      .objects('SharedRoute')
      .filtered('routeId == $0', routeId);

    realm.write(() => {
      realm.delete(sharedRoutes);
    });
  };

  getHeadlessLocations = () => {
    return realm.objects('Location').filtered('routeId == "headless"').toJSON();
  };

  deleteHeadlessLocations = () => {
    const deleteLocations = realm
      .objects('Location')
      .filtered('routeId == "headless"');
    realm.write(() => {
      realm.delete(deleteLocations);
    });
  };

  getHeadlessWeatherLocations = () => {
    return realm
      .objects('WeatherLocation')
      .filtered('routeId == "headless"')
      .toJSON();
  };

  deleteHeadlessWeatherLocations = () => {
    const deleteLocations = realm
      .objects('WeatherLocation')
      .filtered('routeId == "headless"');
    realm.write(() => {
      realm.delete(deleteLocations);
    });
  };
}
export default new Queries();

