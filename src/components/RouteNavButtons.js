import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import Icon from 'react-native-ionicons';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { getRouteThunk } from '../features/RouteDetail/actions';
import styles from '../features/Routes/styles';
import Colors from '../../native-base-theme/variables/commonColor';

class RouteNavButtons extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress = () => {
    const { setRouteLoading, item } = this.props;
    setRouteLoading(true);
    setTimeout(() => {
      Actions.push('routedetail', {
        routeId: item.id,
        hideTabBar: true,
        title: 'ROUTE DETAIL',
        backTitle: ' ',
      });
      setRouteLoading(false);
    }, 100);
  };

  render = () => {
    const { item, onMapPress } = this.props;

    return (
      <>
        <Button
          transparent
          info
          onPress={this.onPress}
          style={styles.routeButton}
        >
          <Icon name="information-circle-outline" color={Colors.brandInfo} />
        </Button>
        <Button
          transparent
          info
          onPress={() => onMapPress(item)}
          style={styles.routeButton}
        >
          <Icon name="chevron-forward-circle" color={Colors.brandInfo} />
        </Button>
      </>
    );
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDetailRoute: getRouteThunk,
    },
    dispatch
  );

RouteNavButtons.propTypes = {
  item: PropTypes.shape().isRequired,
  onMapPress: PropTypes.func.isRequired,
  setRouteLoading: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(RouteNavButtons);
