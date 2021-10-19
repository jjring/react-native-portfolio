import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Switch, Appearance } from 'react-native';
import { Text } from 'native-base';
import { bindActionCreators } from 'redux';
import { setShowSpeedThunk } from '../actions';
import styles from '../styles';
import Spacer from '../../../components/Spacer';

const useDarkMode = Appearance.getColorScheme() === 'dark';

const SpeedControl = ({ showSpeed, setShowSpeed }) => {
  return (
    <View style={styles.speedControlView}>
      <Text style={styles.speedControlText}>Show Speed:</Text>
      <Spacer size={5} />
      <Switch
        value={showSpeed}
        onValueChange={(value) => setShowSpeed(value)}
        trackColor={{ false: '#d2d2d2', true: '#1382c2' }}
        thumbColor={useDarkMode ? '#ababab' : '#d2d2d2'}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  showSpeed: state.settingsReducer.showSpeed,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setShowSpeed: setShowSpeedThunk,
    },
    dispatch
  );

SpeedControl.propTypes = {
  showSpeed: PropTypes.bool.isRequired,
  setShowSpeed: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeedControl);
