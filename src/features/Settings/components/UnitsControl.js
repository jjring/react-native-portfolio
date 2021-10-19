import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Segment, Text, Button } from 'native-base';
import { bindActionCreators } from 'redux';
import { setUnitsThunk } from '../actions';
import styles from '../styles';
import Spacer from '../../../components/Spacer';

const UnitsControl = ({ units, setUnits }) => {
  return (
    <View style={styles.unitsControlView}>
      <Text style={styles.unitsControlText}>Units:</Text>
      <Spacer size={5} />
      <Segment>
        <Button
          info={units === 0}
          bordered={units === 0}
          onPress={() => setUnits(0)}
        >
          <Text>Miles</Text>
        </Button>
        <Button
          info={units === 1}
          bordered={units === 1}
          onPress={() => setUnits(1)}
        >
          <Text>Kilometers</Text>
        </Button>
      </Segment>
    </View>
  );
};

const mapStateToProps = (state) => ({
  units: state.settingsReducer.units,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setUnits: setUnitsThunk,
    },
    dispatch
  );

UnitsControl.propTypes = {
  units: PropTypes.number.isRequired,
  setUnits: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitsControl);
