import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Alert, View } from 'react-native';
import Icon from 'react-native-ionicons';
import { bindActionCreators } from 'redux';
import Error from '../../../components/Error';
import Colors from '../../../../native-base-theme/variables/commonColor';
import { deleteRouteThunk } from '../../RouteDetail/actions';
import RoutesComponent from '../components';

class RouteListing extends Component {
  constructor(props) {
    super(props);
    this.setRouteLoading = this.setRouteLoading.bind(this);
    this.didFocus = this.didFocus.bind(this);
    this.cancelEditMode = this.cancelEditMode.bind(this);
    this.deleteRouteSelected = this.deleteRouteSelected.bind(this);
    this.deleteRoutes = this.deleteRoutes.bind(this);

    this.state = {
      routeLoading: false,
      editMode: false,
      routesToDelete: [],
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;

    navigation.setParams({
      rightTitle: (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Icon name="pencil" color={Colors.brandLight} />
        </View>
      ),
      onRight: () => {
        const { editMode } = this.state;
        this.setState({ editMode: !editMode, routesToDelete: [] });
      },
    });

    this.didFocusListener = navigation.addListener('didFocus', this.didFocus);
  };

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  didFocus = () => {
    Actions.refresh({
      rightTitle: (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Icon name="pencil" color={Colors.brandLight} />
        </View>
      ),
      onRight: () => {
        const { editMode } = this.state;
        this.setState({ editMode: !editMode, routesToDelete: [] });
      },
    });
  };

  setRouteLoading = (routeLoading) => {
    this.setState({ routeLoading });
  };

  cancelEditMode = () => {
    this.setState({ editMode: false, routesToDelete: [] });
  };

  deleteRouteSelected = (id) => {
    const { routesToDelete } = this.state;
    if (routesToDelete.includes(id)) {
      this.setState({
        routesToDelete: routesToDelete.filter((tempItem) => {
          return tempItem !== id;
        }),
      });
    } else {
      this.setState({ routesToDelete: [...routesToDelete, id] });
    }
  };

  deleteRoutes = () => {
    const { deleteRouteAction } = this.props;
    const { routesToDelete } = this.state;

    if (routesToDelete.length > 0) {
      Alert.alert(
        `Delete ${routesToDelete.length === 1 ? 'Route' : 'Routes'}?`,
        `Are you sure you want to delete ${routesToDelete.length} ${
          routesToDelete.length === 1 ? 'route' : 'routes'
        }? This cannot be undone.`,
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              this.cancelEditMode();

              routesToDelete.forEach((id) => {
                deleteRouteAction(id);
              });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      this.cancelEditMode();
    }
  };

  render = () => {
    const { loading, error, routes } = this.props;
    const { routeLoading, editMode, routesToDelete } = this.state;

    // Error
    if (error) {
      return <Error content={error} />;
    }

    return (
      <RoutesComponent
        editMode={editMode}
        routes={routes}
        routesToDelete={routesToDelete}
        loading={loading}
        routeLoading={routeLoading}
        cancelEditMode={this.cancelEditMode}
        deleteRoutes={this.deleteRoutes}
        setRouteLoading={this.setRouteLoading}
        deleteRouteSelected={this.deleteRouteSelected}
      />
    );
  };
}

const mapStateToProps = (state) => ({
  error: state.routeListReducer.error,
  loading: state.routeListReducer.loading,
  importing: state.routeListReducer.importing,
  routes: state.routeListReducer.routes,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteRouteAction: deleteRouteThunk,
    },
    dispatch
  );

RouteListing.propTypes = {
  navigation: PropTypes.shape().isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
  deleteRouteAction: PropTypes.func.isRequired,
};

RouteListing.defaultProps = {
  error: '',
  loading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteListing);
