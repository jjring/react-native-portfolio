import Queries from '../../../database/queries';
import {
  SET_AD_IS_READY,
  SET_AD_IS_VISIBLE,
  SHARED_ROUTES_GET_ROUTES,
  SHARED_ROUTES_SET_ROUTES,
} from '../constants';

export const sharedRoutesGetRoutes = () => ({
  type: SHARED_ROUTES_GET_ROUTES,
});

export const sharedRoutesSetRoutes = (data) => ({
  type: SHARED_ROUTES_SET_ROUTES,
  data,
});

export const setAdIsReady = (data) => ({
  type: SET_AD_IS_READY,
  data,
});

export const setAdIsVisible = (data) => ({
  type: SET_AD_IS_VISIBLE,
  data,
});

export const sharedRoutesGetRoutesThunk = () => (dispatch) => {
  dispatch(sharedRoutesGetRoutes());

  return new Promise((resolve) => {
    setTimeout(() => {
      const routes = Queries.getSharedRoutes();
      dispatch(sharedRoutesSetRoutes(routes));
      return resolve();
    }, 1000);
  }).catch(() => {});
};

export const sharedRoutesRenewRouteThunk = (routeId) => (
  dispatch,
  getState
) => {
  const { routes } = getState().sharedRoutesReducer;
  const updatedRoutes = routes.map((r) =>
    r.id === routeId
      ? {
          ...r,
          shared: true,
          sharedDate: new Date(),
          expired: false,
          expiresIn: 365,
        }
      : r
  );
  dispatch(sharedRoutesSetRoutes(updatedRoutes));
};

export const sharedRoutesDeleteRouteThunk = (routeId) => (
  dispatch,
  getState
) => {
  const { routes } = getState().sharedRoutesReducer;
  const updatedRoutes = routes.map((r) =>
    r.id === routeId
      ? { ...r, shared: false, sharedDate: null, expired: true, expiresIn: 0 }
      : r
  );
  dispatch(sharedRoutesSetRoutes(updatedRoutes));
};
