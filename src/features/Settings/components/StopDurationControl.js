import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Appearance } from 'react-native';
import { Text } from 'native-base';
import Slider from '@react-native-community/slider';
import { bindActionCreators } from 'redux';
import { setStopPinDurationThunk } from '../actions';
import styles from '../styles';

const useDarkMode = Appearance.getColorScheme() === 'dark';

const StopDurationControl = ({ stopPinDuration, setStopPinDuration }) => {
  return (
    <>
      <Slider
        style={styles.stopDurationControlSlider}
        minimumValue={0}
        maximumValue={8}
        minimumTrackTintColor="#1382c2"
        thumbTintColor={useDarkMode ? '#ababab' : '#d2d2d2'}
        thumbColor={useDarkMode ? '#ababab' : '#d2d2d2'}
        value={stopPinDuration}
        onSlidingComplete={(value) => setStopPinDuration(Math.round(value))}
      />
      <Text style={styles.stopDurationControlText}>
        (Recommended: 2 minutes) If set at 2 minutes, a pin will be placed on
        the map if you stop for 2 minutes or more.
      </Text>
    </>
  );
};

const mapStateToProps = (state) => ({
  stopPinDuration: state.settingsReducer.stopPinDuration,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setStopPinDuration: setStopPinDurationThunk,
    },
    dispatch
  );

StopDurationControl.propTypes = {
  stopPinDuration: PropTypes.number.isRequired,
  setStopPinDuration: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StopDurationControl);
