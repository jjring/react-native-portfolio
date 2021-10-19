import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Text, Button } from 'native-base';
import { bindActionCreators } from 'redux';
import { setAccuracyThunk } from '../actions';
import styles from '../styles';
import Spacer from '../../../components/Spacer';

const AccuracyControl = ({ accuracy, setAccuracy }) => {
  return (
    <>
      <Text style={styles.accuracyControlName}>Location Accuracy:</Text>
      <Segment>
        <Button active={accuracy === 0} onPress={() => setAccuracy(0)}>
          <Text>Good</Text>
        </Button>
        <Button active={accuracy === 1} onPress={() => setAccuracy(1)}>
          <Text>Better</Text>
        </Button>
        <Button active={accuracy === 2} onPress={() => setAccuracy(2)}>
          <Text>Best</Text>
        </Button>
      </Segment>
      <Spacer size={5} />
      <Text style={styles.accuracyControlDescription}>
        {accuracy === 0 &&
          'Uses a decent level of accuracy nearest to 100 meters. Using this will get your approximate location while consuming the least amount of battery power.'}
        {accuracy === 1 &&
          "(Recommended) Uses an optimal accuracy level nearest to 10 meters. It uses sightly less battery power than 'Best' but slightly more than 'Good'."}
        {accuracy === 2 &&
          'Uses the highest level of accuracy availabile. Using this setting will also consume more battery power.'}
      </Text>
    </>
  );
};

const mapStateToProps = (state) => ({
  accuracy: state.settingsReducer.accuracy,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAccuracy: setAccuracyThunk,
    },
    dispatch
  );

AccuracyControl.propTypes = {
  accuracy: PropTypes.number.isRequired,
  setAccuracy: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccuracyControl);
