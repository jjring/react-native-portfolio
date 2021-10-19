import {
  GET_ROUTES_ACTION,
  SET_ROUTES_ACTION,
  UPDATE_ROUTE_LIST_ACTION,
  SET_ROUTES_ERROR_ACTION,
  ADD_ROUTE_ACTION,
  SET_IMPORTING_ACTION,
  ROUTES_SET_LOADING,
} from '../constants';

const initialState = {
  routes: [],
  error: '',
  loading: false,
  importing: false,
};

const routeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROUTES_ACTION:
      return { ...state, loading: true, error: '', routes: [] };
    case SET_ROUTES_ACTION:
      return {
        ...state,
        loading: false,
        error: '',
        routes: action.data.sort((a, b) => a.updatedDate < b.updatedDate),
      };
    case UPDATE_ROUTE_LIST_ACTION:
      return { ...state, routes: [...state.routes] };
    case SET_ROUTES_ERROR_ACTION:
      return {
        ...state,
        loading: false,
        error: action.data.message ?? '',
        routes: [],
      };
    case ADD_ROUTE_ACTION:
      return { ...state, routes: [action.data, ...state.routes] };
    case SET_IMPORTING_ACTION:
      return { ...state, importing: action.data };
    case ROUTES_SET_LOADING:
      return { ...state, loading: action.data };
    default:
      return state;
  }
};

export default routeListReducer;
