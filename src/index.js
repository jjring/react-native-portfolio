import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { bindActionCreators } from 'redux';
import Iaphub from 'react-native-iaphub';
import RNDevice from 'react-native-device-info';
import {
  SiriShortcutsEvent,
  suggestShortcuts,
} from 'react-native-siri-shortcut';
import QuickActions from 'react-native-quick-actions'; //eslint-disable-line
import { Alert, DeviceEventEmitter, Platform, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-ionicons';
import Importing from './components/Importing';
import AppStateManager from './managers/AppStateManager';
import {
  addNewRouteAndStartThunk,
  getRoutesThunk,
  routesSetLoading,
  setImporting,
} from './features/Routes/actions';
import { getSettingsThunk } from './features/Settings/actions';
import IAPManager from './managers/IAPManager';
import { setTrackingOffThunk } from './managers/LocationManager/actions';
import {
  getRouteThunk,
  mapSetCustomMarkerModalVisible,
  mapSetSelectedCustomMarker,
  setCustomLocationThunk,
  setEditModeOn,
} from './features/Map/actions';
import Colors from '../native-base-theme/variables/commonColor';
import { getCurrentPosition } from './common/getCurrentPosition';
import LocationManager from './managers/LocationManager';

// Hide StatusBar on Android as it overlaps tabs
// if (Platform.OS === 'android') StatusBar.setHidden(true);
const uuid = require('react-native-uuid');

export const startNewRouteShortcut = {
  activityType: '', // This activity type needs to be set in `NSUserActivityTypes` on the Info.plist
  title: 'Start A New Route',
  needsSave: true,
  keywords: ['map', 'route', 'start', 'new', 'tracking'],
  isEligibleForHandoff: false,
  isEligibleForSearch: true,
  isEligibleForPublicIndexing: true,
  isEligibleForPrediction: true,
  suggestedInvocationPhrase: 'Start Tracking',
  description: 'Create a new route and start tracking for it.',
};

export const stopRouteShortcut = {
  activityType: '', // This activity type needs to be set in `NSUserActivityTypes` on the Info.plist
  title: 'Stop Tracking',
  needsSave: true,
  keywords: ['map', 'route', 'stop', 'tracking'],
  isEligibleForHandoff: false,
  isEligibleForSearch: true,
  isEligibleForPublicIndexing: true,
  isEligibleForPrediction: true,
  suggestedInvocationPhrase: 'Stop Tracking',
  description: 'Stop tracking for the current route.',
};

export const addNewPinShortcut = {
  activityType: '', // This activity type needs to be set in `NSUserActivityTypes` on the Info.plist
  title: 'Add New Pin',
  needsSave: true,
  keywords: ['map', 'route', 'add', 'pin', 'marker', 'custom'],
  isEligibleForHandoff: false,
  isEligibleForSearch: true,
  isEligibleForPublicIndexing: true,
  isEligibleForPrediction: true,
  suggestedInvocationPhrase: 'Add new pin',
  description: 'Add a new custom pin for the current route.',
};

QuickActions.setShortcutItems([
  {
    type: 'StartNewRoute', // Required
    title: 'Start A New Route', // Optional, if empty, `type` will be used instead
    icon: 'customadd',
    userInfo: {
      url: '', // for some reason this is required
    },
  },
  {
    type: 'StopRoute', // Required
    title: 'Stop Tracking', // Optional, if empty, `type` will be used instead
    icon: 'customstop',
    userInfo: {
      url: '', // for some reason this is required
    },
  },
  {
    type: 'AddNewPin', // Required
    title: 'Add New Pin', // Optional, if empty, `type` will be used instead
    icon: 'custompin',
    userInfo: {
      url: '', // for some reason this is required
    },
  },
]);

class MainApp extends Component {
  constructor(props) {
    super(props);

    this.setImportRoutes = this.setImportRoutes.bind(this);
    this.addNewPinAction = this.addNewPinAction.bind(this);
    this.stopRouteAction = this.stopRouteAction.bind(this);
    this.navigateToCurrentRoute = this.navigateToCurrentRoute.bind(this);

    this.state = {
      importRoutes: true,
    };
  }

  async componentDidMount() {
    const {
      getRoutes,
      getSettings,
      setImport,
      addNewRouteAndStart,
    } = this.props;

    await Iaphub.init({
      // The app id is available on the settings page of your app
      appId: '',
      // The (client) api key is available on the settings page of your app
      apiKey: '',
      // App environment (production by default, other environments must be created on the IAPHUB dashboard)
      environment: 'production',
    });

    await Iaphub.setUserId(RNDevice.getUniqueId());

    getSettings();
    setImport(false);
    getRoutes();

    SiriShortcutsEvent.addListener(
      'SiriShortcutListener',
      ({ activityType }) => {
        // Do something with the userInfo and/or activityType
        if (activityType === startNewRouteShortcut.activityType) {
          addNewRouteAndStart();
        } else if (activityType === stopRouteShortcut.activityType) {
          this.stopRouteAction();
        } else if (activityType === addNewPinShortcut.activityType) {
          this.addNewPinAction();
        }
      }
    );

    suggestShortcuts([startNewRouteShortcut, stopRouteShortcut]);

    DeviceEventEmitter.addListener('quickActionShortcut', (data) => {
      if (data) {
        if (data.type === 'StartNewRoute') {
          addNewRouteAndStart();
        } else if (data.type === 'StopRoute') {
          this.stopRouteAction();
        } else if (data.type === 'AddNewPin') {
          this.addNewPinAction();
        }
      }
    });

    QuickActions.popInitialAction()
      .then((data) => {
        if (Platform.OS === 'android') {
          if (data) {
            if (data.type === 'StartNewRoute') {
              addNewRouteAndStart();
            } else if (data.type === 'StopRoute') {
              this.stopRouteAction();
            } else if (data.type === 'AddNewPin') {
              this.addNewPinAction();
            }
          }
        }
      })
      .catch(() => {});

    SplashScreen.hide();
  }

  stopRouteAction = () => {
    const { setTrackingOff, tracking } = this.props;

    if (tracking) {
      this.navigateToCurrentRoute().then(() => {
        setTrackingOff();
      });
    }
  };

  addNewPinAction = () => {
    const {
      tracking,
      setCustomLocation,
      route,
      mapSetCustomMarkerModalVisibleAction,
      mapSetSelectedCustomMarkerAction,
    } = this.props;

    // navigate to correct map screen
    // present add pin

    if (tracking) {
      this.navigateToCurrentRoute().then(() => {
        getCurrentPosition()
          .then((location) => {
            const id = uuid.v4();

            const customLocation = {
              id,
              route,
              icon: 'bluemarker',
              x: location.longitude,
              y: location.latitude,
              t: Date.now(),
              desc: '',
              title: '',
              caption: '',
              imageLocation: '',
              altitude: location.altitude,
              new: true,
            };

            mapSetCustomMarkerModalVisibleAction(true);
            mapSetSelectedCustomMarkerAction(customLocation);

            setCustomLocation(customLocation);
          })
          .catch();
      });
    } else {
      // alert that no routes are being tracked
    }
  };

  navigateToCurrentRoute = () => {
    const {
      getMapRoute,
      setEditModeOnAction,
      locationManagerRouteId,
      proFeaturesEnabled,
      routesSetLoadingAction,
      route,
    } = this.props;

    return new Promise((resolve) => {
      Actions.reset('routes');
      routesSetLoadingAction(true);
      setTimeout(() => {
        getMapRoute(route.id);

        Actions.push('map', {
          routeId: route.id,
          title: route.name,
          backTitle: ' ',
          hideTabBar: true,
          rightTitle: (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Icon
                name="pencil"
                color={
                  proFeaturesEnabled
                    ? Colors.brandLight
                    : Colors.brandLightDisabled
                }
              />
            </View>
          ),
          onRight: () => {
            if (!proFeaturesEnabled) {
              Alert.alert(
                'Upgrade To Pro',
                'Editing a route is a pro feature. Check out the store tab to upgrade.',
                [
                  {
                    text: 'OK',
                    style: 'cancel',
                  },
                ],
                { cancelable: false }
              );
            } else if (locationManagerRouteId === route.id) {
              Alert.alert(
                'Tracking In Progress',
                `Tracking for the current route must be stopped before the route can be edited.`,
                [
                  {
                    text: 'OK',
                    style: 'cancel',
                  },
                ],
                { cancelable: false }
              );
            } else {
              if (!route.modifiedRoute) {
                Alert.alert(
                  'Edit Mode',
                  `App performance while editing may be impacted for long routes. Dates on interval pins, the route duration estimate, and stop pins will be disabled after a route has been modified.`,
                  [
                    {
                      text: 'OK',
                      style: 'cancel',
                    },
                  ],
                  { cancelable: false }
                );
              }
              setEditModeOnAction();
            }
          },
        });
        routesSetLoadingAction(false);
        resolve();
      }, 100);
    });
  };

  setImportRoutes = (importRoutes) => {
    this.setState({ importRoutes });
  };

  render() {
    const { importing } = this.props;
    const { importRoutes } = this.state;

    return (
      <>
        <LocationManager />
        <AppStateManager
          importRoutes={importRoutes}
          setImportRoutes={this.setImportRoutes}
        />
        <IAPManager />
        {importing && <Importing />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.routeListReducer.error,
  loading: state.routeListReducer.loading,
  importing: state.routeListReducer.importing,
  tracking: state.locationManagerReducer.tracking,
  locationManagerRouteId: state.locationManagerReducer.route.id,
  route: state.locationManagerReducer.route,
  proFeaturesEnabled: state.iapStoreReducer.proFeaturesEnabled,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRoutes: getRoutesThunk,
      getSettings: getSettingsThunk,
      setImport: setImporting,
      setTrackingOff: setTrackingOffThunk,
      addNewRouteAndStart: addNewRouteAndStartThunk,
      getMapRoute: getRouteThunk,
      setEditModeOnAction: setEditModeOn,
      routesSetLoadingAction: routesSetLoading,
      setCustomLocation: setCustomLocationThunk,
      mapSetCustomMarkerModalVisibleAction: mapSetCustomMarkerModalVisible,
      mapSetSelectedCustomMarkerAction: mapSetSelectedCustomMarker,
    },
    dispatch
  );

MainApp.propTypes = {
  getRoutes: PropTypes.func.isRequired,
  getSettings: PropTypes.func.isRequired,
  importing: PropTypes.bool.isRequired,
  setImport: PropTypes.func.isRequired,
  setTrackingOff: PropTypes.func.isRequired,
  addNewRouteAndStart: PropTypes.func.isRequired,
  tracking: PropTypes.bool.isRequired,
  getMapRoute: PropTypes.func.isRequired,
  setEditModeOnAction: PropTypes.func.isRequired,
  locationManagerRouteId: PropTypes.string,
  proFeaturesEnabled: PropTypes.bool.isRequired,
  routesSetLoadingAction: PropTypes.func.isRequired,
  route: PropTypes.shape().isRequired,
  setCustomLocation: PropTypes.func.isRequired,
  mapSetCustomMarkerModalVisibleAction: PropTypes.func.isRequired,
  mapSetSelectedCustomMarkerAction: PropTypes.func.isRequired,
};

MainApp.defaultProps = {
  locationManagerRouteId: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
