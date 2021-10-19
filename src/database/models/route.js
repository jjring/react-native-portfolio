import Realm from 'realm';

export default class Route extends Realm.Object {}
Route.schema = {
  name: 'Route',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', indexed: true },
    name: 'string',
    createdDate: 'date',
    updatedDate: 'date',
    desc: { type: 'string', default: '' },
    locations: {
      type: 'Location[]',
      default: [],
    },
    weatherLocations: {
      type: 'WeatherLocation[]',
      default: [],
    },
    customLocations: {
      type: 'CustomLocation[]',
      default: [],
    },
    directionCapable: { type: 'bool', default: false },
    routeDirections: { type: 'string', default: '' },
    directionsRetreivedDate: {
      type: 'date',
      default: '2000-01-01T00:00:00-00:00',
    },
    directionsUpToDate: { type: 'bool', default: false },
    modifiedRoute: { type: 'bool', default: false },
  },
};
