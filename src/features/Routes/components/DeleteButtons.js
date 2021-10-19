import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { addRouteThunk, addNewRouteAndStartThunk } from '../actions';
import styles from '../styles';

const DeleteButtons = ({ cancelEditMode, deleteRoutes }) => {
  return (
    <View style={styles.routeButtonView}>
      <Button
        iconLeft
        info
        block
        style={styles.routeAddButton}
        onPress={cancelEditMode}
      >
        <Text>Cancel</Text>
      </Button>
      <Button
        iconLeft
        danger
        block
        style={styles.routeAddButton}
        onPress={deleteRoutes}
      >
        <Text>Delete</Text>
      </Button>
    </View>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addRoute: addRouteThunk,
      addNewRouteAndStart: addNewRouteAndStartThunk,
    },
    dispatch
  );

DeleteButtons.propTypes = {
  cancelEditMode: PropTypes.func.isRequired,
  deleteRoutes: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DeleteButtons);
