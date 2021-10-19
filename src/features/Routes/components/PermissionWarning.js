import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';
import Icon from 'react-native-ionicons';
import { Alert, Appearance, Platform, View } from 'react-native';
import { openSettings } from 'react-native-permissions';

const useDarkMode = Appearance.getColorScheme() === 'dark';

class PermissionWarning extends Component {
  constructor(props) {
    super(props);

    this.displayAlert = this.displayAlert.bind(this);
  }

  displayAlert = () => {
    let message = '';
    if (Platform.OS === 'android') {
      message =
        'Tracking performance may be degraded by not always allowing precise location access or background location access. By not always allowing access to your location, tracking results may be impacted if you accidentally quit the app or the system quits the app in the background without your knowledge. Without always having access to your location, the app cannot run properly in the background or restart the tracking service. Your routes are stored locally on the device. They are not sent or saved anywhere else. Lastly, this app only uses location services when YOU choose to start tracking and immediately stops when YOU choose to stop tracking. Would you like to open the settings to configure location access?';
    } else {
      message =
        'Tracking performance may be degraded by not always allowing precise location access. By not always allowing access to your location, tracking results may be impacted if you accidentally quit the app or the system quits the app in the background without your knowledge. Without always having access to your location, the app cannot run properly in the background or restart the tracking service. Your routes are stored locally on the device. They are not sent or saved anywhere else. Lastly, this app only uses location services when YOU choose to start tracking and immediately stops when YOU choose to stop tracking. Would you like to open the settings to configure location access?';
    }

    Alert.alert(
      'Recommended Location Access',
      message,
      [
        {
          text: 'No',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: () => {
            openSettings();
          },
        },
      ],
      { cancelable: false }
    );
  };

  render = () => {
    const {
      permissionFineLocation,
      permissionBackgroundLocation,
      permissionAlwaysLocation,
    } = this.props;

    if (Platform.OS === 'android') {
      if (permissionBackgroundLocation && permissionFineLocation) {
        return null;
      }
    }

    if (Platform.OS === 'ios') {
      if (permissionAlwaysLocation) {
        return null;
      }
    }

    return (
      <View style={{ marginBottom: 10 }}>
        <Button danger block vertical onPress={this.displayAlert}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Icon
              name="alert"
              color={useDarkMode ? 'black' : 'white'}
              style={{ marginLeft: 10, width: 25 }}
            />
            <Text
              style={{
                fontSize: 12,
                textAlign: 'center',
                flex: 1,
                marginRight: 35,
                color: useDarkMode ? 'black' : 'white',
              }}
              numberOfLines={3}
            >
              {'Accuracy may be impacted.\nTap to find out more.'}
            </Text>
          </View>
        </Button>
      </View>
    );
  };
}

const mapStateToProps = (state) => ({
  permissionFineLocation: state.locationManagerReducer.permissionFineLocation,
  permissionBackgroundLocation:
    state.locationManagerReducer.permissionBackgroundLocation,
  permissionAlwaysLocation:
    state.locationManagerReducer.permissionAlwaysLocation,
});

PermissionWarning.propTypes = {
  permissionFineLocation: PropTypes.bool.isRequired,
  permissionBackgroundLocation: PropTypes.bool.isRequired,
  permissionAlwaysLocation: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(PermissionWarning);
