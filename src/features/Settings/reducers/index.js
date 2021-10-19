import {
  GET_SETTINGS_ACTION,
  SET_SETTINGS_ACTION,
  SET_SETTINGS_ERROR_ACTION,
  SET_UNITS_ACTION,
  SET_ACCURACY_ACTION,
  SET_WEATHER_PINS_ACTION,
  SET_SHOW_ALTITUDE_ACTION,
  SET_SHOW_SPEED_ACTION,
  SET_STOP_PINS_ACTION,
  SET_STOP_PIN_DURATION_ACTION,
  SET_INTERVAL_PINS_ACTION,
  SET_INTERVAL_PIN_DISTANCE_ACTION,
} from '../constants';

const initialState = {
  units: 0,
  accuracy: 1,
  weatherPins: true,
  stopPins: false,
  stopPinDuration: 1,
  loading: false,
  error: '',
  intervalPins: false,
  intervalPinDistance: 7,
  showAltitude: false,
  showSpeed: false,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS_ACTION:
      return { ...state, loading: true, error: '' };
    case SET_SETTINGS_ACTION: {
      const {
        units,
        accuracy,
        weatherPins,
        stopPins,
        stopPinDuration,
        intervalPins,
        intervalPinDistance,
        showAltitude,
        showSpeed,
      } = action.data;
      return {
        ...state,
        loading: false,
        error: '',
        units,
        accuracy,
        weatherPins,
        stopPins,
        stopPinDuration,
        intervalPins,
        intervalPinDistance,
        showAltitude,
        showSpeed,
      };
    }
    case SET_SETTINGS_ERROR_ACTION:
      return {
        ...state,
        loading: false,
        error: action.data.message ?? '',
        routes: [],
      };
    case SET_UNITS_ACTION:
      return { ...state, units: action.data };
    case SET_ACCURACY_ACTION:
      return { ...state, accuracy: action.data };
    case SET_WEATHER_PINS_ACTION:
      return { ...state, weatherPins: action.data };
    case SET_SHOW_ALTITUDE_ACTION:
      return { ...state, showAltitude: action.data };
    case SET_SHOW_SPEED_ACTION:
      return { ...state, showSpeed: action.data };
    case SET_STOP_PINS_ACTION:
      return { ...state, stopPins: action.data };
    case SET_STOP_PIN_DURATION_ACTION:
      return { ...state, stopPinDuration: action.data };
    case SET_INTERVAL_PINS_ACTION:
      return { ...state, intervalPins: action.data };
    case SET_INTERVAL_PIN_DISTANCE_ACTION:
      return { ...state, intervalPinDistance: action.data };
    default:
      return state;
  }
};

export default settingsReducer;
