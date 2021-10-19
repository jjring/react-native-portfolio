import {
  SET_AD_IS_READY,
  SET_AD_IS_VISIBLE,
  SHARED_ROUTES_GET_ROUTES,
  SHARED_ROUTES_SET_ROUTES,
} from '../constants';

const initialState = {
  routes: [],
  loading: false,
  adIsReady: false,
  adIsVisible: false,
};

const sharedRoutesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHARED_ROUTES_SET_ROUTES: {
      return { ...state, routes: action.data, loading: false };
    }
    case SHARED_ROUTES_GET_ROUTES:
      return { ...state, loading: true };
    case SET_AD_IS_READY:
      return { ...state, adIsReady: action.data };
    case SET_AD_IS_VISIBLE:
      return { ...state, adIsVisible: action.data };
    default:
      return state;
  }
};

export default sharedRoutesReducer;
