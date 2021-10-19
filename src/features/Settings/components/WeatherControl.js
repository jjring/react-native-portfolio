import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Switch, Appearance } from 'react-native';
import { Text } from 'native-base';
import { bindActionCreators } from 'redux';
import { setWeatherPinsThunk } from '../actions';
import styles from '../styles';
import Spacer from '../../../components/Spacer';

const useDarkMode = Appearance.getColorScheme() === 'dark';

const WeatherControl = ({ weatherPins, setWeatherPins }) => {
  return (
    <View style={styles.weatherControlView}>
      <Text style={styles.weatherControlText}>Weather Pins:</Text>
      <Spacer size={5} />
      <Switch
        value={weatherPins}
        onValueChange={(value) => setWeatherPins(value)}
        trackColor={{ false: '#d2d2d2', true: '#1382c2' }}
        thumbColor={useDarkMode ? '#ababab' : '#d2d2d2'}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  weatherPins: state.settingsReducer.weatherPins,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setWeatherPins: setWeatherPinsThunk,
    },
    dispatch
  );

WeatherControl.propTypes = {
  weatherPins: PropTypes.bool.isRequired,
  setWeatherPins: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherControl);
