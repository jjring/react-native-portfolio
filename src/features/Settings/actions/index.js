import Queries from '../../../database/queries';
import realm from '../../../database';
import {
  GET_SETTINGS_ACTION,
  SET_SETTINGS_ACTION,
  SET_SETTINGS_ERROR_ACTION,
  SET_UNITS_ACTION,
  SET_ACCURACY_ACTION,
  SET_WEATHER_PINS_ACTION,
  SET_SHOW_ALTITUDE_ACTION,
  SET_STOP_PINS_ACTION,
  SET_STOP_PIN_DURATION_ACTION,
  SET_INTERVAL_PINS_ACTION,
  SET_INTERVAL_PIN_DISTANCE_ACTION,
  SET_SHOW_SPEED_ACTION,
} from '../constants';

export const getSettings = () => ({
  type: GET_SETTINGS_ACTION,
});

export const setSettings = (data) => ({
  type: SET_SETTINGS_ACTION,
  data,
});

export const setError = (data) => ({
  type: SET_SETTINGS_ERROR_ACTION,
  data,
});

export const setUnits = (data) => ({
  type: SET_UNITS_ACTION,
  data,
});

export const setAccuracy = (data) => ({
  type: SET_ACCURACY_ACTION,
  data,
});

export const setWeatherPins = (data) => ({
  type: SET_WEATHER_PINS_ACTION,
  data,
});

export const setShowAltitude = (data) => ({
  type: SET_SHOW_ALTITUDE_ACTION,
  data,
});

export const setShowSpeed = (data) => ({
  type: SET_SHOW_SPEED_ACTION,
  data,
});

export const setStopPins = (data) => ({
  type: SET_STOP_PINS_ACTION,
  data,
});

export const setStopPinDuration = (data) => ({
  type: SET_STOP_PIN_DURATION_ACTION,
  data,
});

export const setIntervalPins = (data) => ({
  type: SET_INTERVAL_PINS_ACTION,
  data,
});

export const setIntervalPinDistance = (data) => ({
  type: SET_INTERVAL_PIN_DISTANCE_ACTION,
  data,
});

export const getSettingsThunk = () => (dispatch) => {
  dispatch(getSettings());

  return new Promise((resolve) => {
    const userSettings = Queries.getUserSettings();
    dispatch(setSettings(userSettings));
    return resolve();
  }).catch((err) => {
    dispatch(setError(err));
  });
};

export const setUnitsThunk = (data) => (dispatch) => {
  dispatch(setUnits(data));

  return new Promise((resolve) => {
    realm.write(() => {
      realm.create('UserSettings', { id: 0, units: data }, true);
      return resolve();
    });
  }).catch((err) => {
    dispatch(setError(err));
  });
};

export const setAccuracyThunk = (data) => (dispatch) => {
  dispatch(setAccuracy(data));

  return new Promise((resolve) => {
    realm.write(() => {
      realm.create('UserSettings', { id: 0, accuracy: data }, true);
      return resolve();
    });
  }).catch((err) => {
    dispatch(setError(err));
  });
};

export const setWeatherPinsThunk = (data) => (dispatch) => {
  dispatch(setWeatherPins(data));

  return new Promise((resolve) => {
    realm.write(() => {
      realm.create('UserSettings', { id: 0, weatherPins: data }, true);
      return resolve();
    });
  }).catch((err) => {
    dispatch(setError(err));
  });
};

export const setShowAltitudeThunk = (data) => (dispatch) => {
  dispatch(setShowAltitude(data));

  return new Promise((resolve) => {
    realm.write(() => {
      realm.create('UserSettings', { id: 0, showAltitude: data }, true);
      return resolve();
    });
  }).catch((err) => {
    dispatch(setError(err));
  });
};

export const setShowSpeedThunk = (data) => (dispatch) => {
  dispatch(setShowSpeed(data));

  return new Promise((resolve) => {
    realm.write(() => {
      realm.create('UserSettings', { id: 0, showSpeed: data }, true);
      return resolve();
    });
  }).catch((err) => {
    dispatch(setError(err));
  });
};

export const setStopPinsThunk = (data) => (dispatch) => {
  dispatch(setStopPins(data));

  return new Promise((resolve) => {
    realm.write(() => {
      realm.create('UserSettings', { id: 0, stopPins: data }, true);
      return resolve();
    });
  }).catch((err) => {
    dispatch(setError(err));
  });
};

export const setStopPinDurationThunk = (data) => (dispatch) => {
  dispatch(setStopPinDuration(data));

  return new Promise((resolve) => {
    realm.write(() => {
      realm.create('UserSettings', { id: 0, stopPinDuration: data }, true);
      return resolve();
    });
  }).catch((err) => {
    dispatch(setError(err));
  });
};

export const setIntervalPinsThunk = (data) => (dispatch) => {
  dispatch(setIntervalPins(data));

  return new Promise((resolve) => {
    realm.write(() => {
      realm.create('UserSettings', { id: 0, intervalPins: data }, true);
      return resolve();
    });
  }).catch((err) => {
    dispatch(setError(err));
  });
};

export const setIntervalPinDistanceThunk = (data) => (dispatch) => {
  dispatch(setIntervalPinDistance(data));

  return new Promise((resolve) => {
    realm.write(() => {
      realm.create('UserSettings', { id: 0, intervalPinDistance: data }, true);
      return resolve();
    });
  }).catch((err) => {
    dispatch(setError(err));
  });
};
