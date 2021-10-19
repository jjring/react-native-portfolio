import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-ionicons';
import { bindActionCreators } from 'redux';
import Colors from '../../../../native-base-theme/variables/commonColor';
import { sharedRoutesGetRoutesThunk } from '../actions';
import ShareManagerComponent from '../components';

class ShareManager extends Component {
  constructor(props) {
    super(props);
    this.getRoutes = this.getRoutes.bind(this);
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  componentDidMount = () => {
    const { navigation } = this.props;

    this.didFocusListener = navigation.addListener('didFocus', this.getRoutes);
  };

  getRoutes = () => {
    const { getSharedRoutesAction } = this.props;

    Actions.refresh({
      rightTitle: (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Icon name="information-circle-outline" color={Colors.brandLight} />
        </View>
      ),
      onRight: () => {
        Alert.alert(
          'Help',
          `Shared routes last for one year from the date they were last uploaded. A route can be renewed at anytime to update the map link with the most recent data and to extend the expiration date. Select a shared route to copy its url to the clipboard.`,
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      },
    });

    return new Promise((resolve) => {
      getSharedRoutesAction();
      resolve();
    });
  };

  render = () => {
    const { loading, routes, proFeaturesEnabled } = this.props;
    return (
      <ShareManagerComponent
        proFeaturesEnabled={proFeaturesEnabled}
        loading={loading}
        routes={routes}
      />
    );
  };
}

const mapStateToProps = (state) => ({
  routes: state.sharedRoutesReducer.routes,
  loading: state.sharedRoutesReducer.loading,
  proFeaturesEnabled: state.iapStoreReducer.proFeaturesEnabled,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSharedRoutesAction: sharedRoutesGetRoutesThunk,
    },
    dispatch
  );

ShareManager.propTypes = {
  navigation: PropTypes.shape().isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool,
  getSharedRoutesAction: PropTypes.func.isRequired,
  proFeaturesEnabled: PropTypes.bool.isRequired,
};

ShareManager.defaultProps = {
  loading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareManager);
