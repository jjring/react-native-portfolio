import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Text, Icon } from 'native-base';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { donateShortcut } from 'react-native-siri-shortcut';
import { addRouteThunk, addNewRouteAndStartThunk } from '../actions';
import styles from '../styles';
import { startNewRouteShortcut } from '../../../index';

const RouteAddButtons = ({ addRoute, addNewRouteAndStart }) => {
  return (
    <View style={styles.routeButtonView}>
      <Button
        iconLeft
        info
        block
        style={styles.routeAddButton}
        onPress={() => {
          donateShortcut(startNewRouteShortcut);
          return addRoute({});
        }}
      >
        <Icon name="add-circle-outline" />
        <Text>New Route</Text>
      </Button>
      <Button
        iconLeft
        info
        block
        style={styles.routeAddButton}
        onPress={() => {
          donateShortcut(startNewRouteShortcut);
          return addNewRouteAndStart();
        }}
      >
        <Icon name="add-circle-outline" />
        <Text>Route & Start</Text>
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

RouteAddButtons.propTypes = {
  addRoute: PropTypes.func.isRequired,
  addNewRouteAndStart: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(RouteAddButtons);
