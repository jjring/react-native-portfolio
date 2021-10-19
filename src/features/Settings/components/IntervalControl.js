import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Switch, Appearance } from 'react-native';
import { Text } from 'native-base';
import { bindActionCreators } from 'redux';
import { setIntervalPinsThunk } from '../actions';
import styles from '../styles';
import Spacer from '../../../components/Spacer';

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
    const { intervalPins, intervalPinDistance, setIntervalPins } = this.props;

    return (
      <View style={styles.intervalControlView}>
        <Text style={styles.intervalControlText}>
          Interval Pins: {this.intervalPinDistanceText(intervalPinDistance)}
        </Text>
        <Spacer size={5} />
        <Switch
          value={intervalPins}
          onValueChange={(value) => setIntervalPins(value)}
          trackColor={{ false: '#d2d2d2', true: '#1382c2' }}
          thumbColor={useDarkMode ? '#ababab' : '#d2d2d2'}
        />
      </View>
    );
  };
}

const mapStateToProps = (state) => ({
  units: state.settingsReducer.units,
  intervalPins: state.settingsReducer.intervalPins,
  intervalPinDistance: state.settingsReducer.intervalPinDistance,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setIntervalPins: setIntervalPinsThunk,
    },
    dispatch
  );

IntervalControl.propTypes = {
  units: PropTypes.number.isRequired,
  intervalPins: PropTypes.bool.isRequired,
  intervalPinDistance: PropTypes.number.isRequired,
  setIntervalPins: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntervalControl);
