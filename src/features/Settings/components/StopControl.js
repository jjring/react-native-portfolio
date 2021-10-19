import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Switch, Appearance } from 'react-native';
import { Text } from 'native-base';
import { bindActionCreators } from 'redux';
import { setStopPinsThunk } from '../actions';
import styles from '../styles';
import Spacer from '../../../components/Spacer';

const useDarkMode = Appearance.getColorScheme() === 'dark';

class StopControl extends Component {
  constructor(props) {
    super(props);
    this.stopPinDurationText = this.stopPinDurationText.bind(this);
  }

  stopPinDurationText = (val) => {
    switch (val) {
      case 0:
        return '1 min';
      case 1:
        return '2 mins';
      case 2:
        return '5 mins';
      case 3:
        return '10 mins';
      case 4:
        return '15 mins';
      case 5:
        return '30 mins';
      case 6:
        return '1 hr';
      case 7:
        return '2 hrs';
      case 8:
        return '5 hrs';
      default:
        return '2 mins';
    }
  };

  render = () => {
    const { stopPins, stopPinDuration, setStopPins } = this.props;

    return (
      <View style={styles.stopControlView}>
        <Text style={styles.stopControlText}>
          Stop Pins: {this.stopPinDurationText(stopPinDuration)}
        </Text>
        <Spacer size={5} />
        <Switch
          value={stopPins}
          onValueChange={(value) => setStopPins(value)}
          trackColor={{ false: '#d2d2d2', true: '#1382c2' }}
          thumbColor={useDarkMode ? '#ababab' : '#d2d2d2'}
        />
      </View>
    );
  };
}

const mapStateToProps = (state) => ({
  stopPins: state.settingsReducer.stopPins,
  stopPinDuration: state.settingsReducer.stopPinDuration,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setStopPins: setStopPinsThunk,
    },
    dispatch
  );

StopControl.propTypes = {
  stopPins: PropTypes.bool.isRequired,
  stopPinDuration: PropTypes.number.isRequired,
  setStopPins: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StopControl);
