import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Switch, Appearance } from 'react-native';
import { Text } from 'native-base';
import { bindActionCreators } from 'redux';
import { setShowAltitudeThunk } from '../actions';
import styles from '../styles';
import Spacer from '../../../components/Spacer';

const useDarkMode = Appearance.getColorScheme() === 'dark';

const AltitudeControl = ({ showAltitude, setShowAltitude }) => {
  return (
    <View style={styles.altitudeControlView}>
      <Text style={styles.altitudeControlText}>Show Altitude:</Text>
      <Spacer size={5} />
      <Switch
        value={showAltitude}
        onValueChange={(value) => setShowAltitude(value)}
        trackColor={{ false: '#d2d2d2', true: '#1382c2' }}
        thumbColor={useDarkMode ? '#ababab' : '#d2d2d2'}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  showAltitude: state.settingsReducer.showAltitude,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setShowAltitude: setShowAltitudeThunk,
    },
    dispatch
  );

AltitudeControl.propTypes = {
  showAltitude: PropTypes.bool.isRequired,
  setShowAltitude: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AltitudeControl);
