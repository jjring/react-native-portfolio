import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Appearance } from 'react-native';
import { Text } from 'native-base';
import Slider from '@react-native-community/slider';
import { bindActionCreators } from 'redux';
import { setIntervalPinDistanceThunk } from '../actions';
import styles from '../styles';

const useDarkMode = Appearance.getColorScheme() === 'dark';

class IntervalControl extends Component {
  constructor(props) {
    super(props);
    this.intervalPinDistanceText = this.intervalPinDistanceText.bind(this);
  }

  intervalPinDistanceText = (val) => {
    const { units } = this.props;

    switch (val) {
      case 0:
        return units === 0 ? '150 feet' : '50 meters';
      case 1:
        return units === 0 ? '300 feet' : '100 meters';
      case 2:
        return units === 0 ? '1/8 mile' : '1/5 kilometer';
      case 3:
        return units === 0 ? '1/4 mile' : '1/2 kilometer';
      case 4:
        return units === 0 ? '1/2 mile' : '1 kilometer';
      case 5:
        return units === 0 ? '1 mile' : '1.5 kilometers';
      case 6:
        return units === 0 ? '2 miles' : '3 kilometers';
      case 7:
        return units === 0 ? '5 miles' : '8 kilometers';
      case 8:
        return units === 0 ? '10 miles' : '16 kilometers';
      default:
        return units === 0 ? '5 miles' : '8 kilometers';
    }
  };

  render = () => {
    const { units, intervalPinDistance, setIntervalPinDistance } = this.props;

    return (
      <>
        <Slider
          style={styles.intervalDistanceControlSlider}
          minimumValue={0}
          maximumValue={8}
          minimumTrackTintColor="#1382c2"
          thumbTintColor={useDarkMode ? '#ababab' : '#d2d2d2'}
          thumbColor={useDarkMode ? '#ababab' : '#d2d2d2'}
          value={intervalPinDistance}
          onSlidingComplete={(value) =>
            setIntervalPinDistance(Math.round(value))
          }
        />
        <Text style={styles.intervalDistanceControlText}>
          {units === 0 &&
            '(Recommended: 5 miles) If set at a 5 miles, a new location pin will be placed roughly every 5 miles along the route. Setting a lower value may overcrowd the map with pins and degrade performance.'}
          {units === 1 &&
            '(Recommended: 8 kilometers) If set at a 8 kilometers, a new location pin will be placed roughly every 8 kilometers along the route. Setting a lower value may overcrowd the map with pins and degrade performance.'}
        </Text>
      </>
    );
  };
}

const mapStateToProps = (state) => ({
  units: state.settingsReducer.units,
  intervalPinDistance: state.settingsReducer.intervalPinDistance,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setIntervalPinDistance: setIntervalPinDistanceThunk,
    },
    dispatch
  );

IntervalControl.propTypes = {
  units: PropTypes.number.isRequired,
  intervalPinDistance: PropTypes.number.isRequired,
  setIntervalPinDistance: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntervalControl);
