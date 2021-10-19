import analytics from '@react-native-firebase/analytics';
import { setTrackingOnThunk } from '../../../managers/LocationManager/actions';
import Queries from '../../../database/queries';
import realm from '../../../database';
import {
  GET_ROUTES_ACTION,
  SET_ROUTES_ACTION,
  UPDATE_ROUTE_LIST_ACTION,
  SET_ROUTES_ERROR_ACTION,
  ADD_ROUTE_ACTION,
  SET_IMPORTING_ACTION,
  ROUTES_SET_LOADING,
} from '../constants';

const uuid = require('react-native-uuid');

const logEvent = async (eventName, propertyObject = {}) => {
  await analytics().logEvent(eventName, propertyObject);
};

export const getRoutes = () => ({
  type: GET_ROUTES_ACTION,
});

export const setRoutes = (routes) => ({
  type: SET_ROUTES_ACTION,
  data: routes,
});

export const updateRouteList = () => ({
  type: UPDATE_ROUTE_LIST_ACTION,
});

export const setError = (error) => ({
  type: SET_ROUTES_ERROR_ACTION,
  data: error,
});

export const addRoute = (route) => ({
  type: ADD_ROUTE_ACTION,
  data: route,
});

export const setImporting = (importing) => ({
  type: SET_IMPORTING_ACTION,
  data: importing,
});

export const routesSetLoading = (data) => ({
  type: ROUTES_SET_LOADING,
  data,
});

export const getRoutesThunk = () => (dispatch) => {
  // AsyncStorage.removeItem('routes');
  dispatch(getRoutes());

  return new Promise((resolve) => {
    const databaseRoutes = Queries.getRoutes();

    const routes = databaseRoutes.map((r) => ({
      id: r.id,
      name: r.name,
      desc: r.desc,
      createdDate: r.createdDate,
      updatedDate: r.updatedDate,
      modifiedRoute: r.modifiedRoute,
    }));

    dispatch(setRoutes(routes));
    return resolve();
  }).catch((err) => {
    dispatch(setError(err));
  });
};

export const addRouteThunk = (route) => (dispatch) => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  const name = `${yyyy}/${mm}/${dd}`;

  const id = uuid.v4();

  const newRoute = {
    ...route,
    id,
    name: route.name ?? name,
    createdDate: today,
    updatedDate: today,
    desc: '',
    directionCapable: true,
  };

  dispatch(addRoute(newRoute));

  logEvent('route_created', { tracking_started: false });

  return new Promise((resolve) => {
    realm.write(() => {
      realm.create('Route', newRoute);
      return resolve();
    });
  }).catch((err) => {
    dispatch(setError(err));
  });
};

export const addNewRouteAndStartThunk = () => (dispatch) => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  const name = `${yyyy}/${mm}/${dd}`;

  const id = uuid.v4();

  const newRoute = {
    id,
    name,
    createdDate: today,
    updatedDate: today,
    desc: '',
    directionCapable: true,
  };

  dispatch(addRoute(newRoute));

  logEvent('route_created', { tracking_started: true });

  return new Promise((resolve) => {
    realm.write(() => {
      realm.create('Route', newRoute);
    });
    dispatch(setTrackingOnThunk(newRoute.id));
    return resolve();
  }).catch((err) => {
    dispatch(setError(err));
  });
};
