/* global */
import { init } from '@rematch/core';
import createPersistPlugin, { getPersistor } from '@rematch/persist';
import createLoadingPlugin from '@rematch/loading';
import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk';
import routeListReducer from '../features/Routes/reducers';
import routeDetailReducer from '../features/RouteDetail/reducers';
import settingsReducer from '../features/Settings/reducers';
import mapReducer from '../features/Map/reducers';
import locationManagerReducer from '../managers/LocationManager/reducers';
import routeDirectionsReducer from '../features/RouteDirections/reducers';
import sharedRoutesReducer from '../features/ShareManager/reducers';
import iapStoreReducer from '../features/IAPStore/reducers';

// Create plugins
const persistPlugin = createPersistPlugin({
  version: 2,
  storage,
  blacklist: [],
});
const loadingPlugin = createLoadingPlugin({});

const configureStore = () => {
  const store = init({
    redux: {
      reducers: {
        routeListReducer,
        routeDetailReducer,
        settingsReducer,
        mapReducer,
        locationManagerReducer,
        routeDirectionsReducer,
        sharedRoutesReducer,
        iapStoreReducer,
      },
      middlewares: [thunk],
    },
    plugins: [persistPlugin, loadingPlugin],
  });

  const persistor = getPersistor();
  const { dispatch } = store;

  return { persistor, store, dispatch };
};

export const { store, persistor } = configureStore();
