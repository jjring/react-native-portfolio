import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { getSettingsThunk } from '../actions';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import SettingsComponent from '../components';
import Colors from '../../../../native-base-theme/variables/commonColor';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.didFocus = this.didFocus.bind(this);
    this.openUrl = this.openUrl.bind(this);
    // this.openHelp = this.openHelp.bind(this);
    // this.openWebsite = this.openWebsite.bind(this);
    // this.openTerms = this.openTerms.bind(this);
    // this.openPrivacy = this.openPrivacy.bind(this);
  }

  componentDidMount = () => {
    const { navigation, getSettings } = this.props;

    this.didFocusListener = navigation.addListener('didFocus', this.didFocus);
    getSettings();
  };

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  didFocus = () => {
    Actions.refresh({
      rightTitle: null,
      onRight: null,
    });
  };

  openUrl = (url) => {
    InAppBrowser.open(url, {
      // iOS Properties
      dismissButtonStyle: 'cancel',
      preferredBarTintColor: '#1382c2',
      preferredControlTintColor: 'white',
      readerMode: false,
      animated: true,
      modalPresentationStyle: 'fullScreen',
      modalTransitionStyle: 'coverVertical',
      modalEnabled: true,
      enableBarCollapsing: false,
      // Android Properties
      showTitle: true,
      toolbarColor: Colors.brandInfo,
      secondaryToolbarColor: 'black',
      enableUrlBarHiding: true,
      enableDefaultShare: true,
      forceCloseOnRedirection: false,
      // Specify full animation resource identifier(package:anim/name)
      // or only resource name(in case of animation bundled with app).
      animations: {
        startEnter: 'slide_in_right',
        startExit: 'slide_out_left',
        endEnter: 'slide_in_left',
        endExit: 'slide_out_right',
      },
    });
  };

  render = () => {
    const { error, loading } = this.props;

    if (error) {
      return <Error content={error} />;
    }

    if (loading) {
      return <Loading />;
    }

    return <SettingsComponent openUrl={this.openUrl} />;
  };
}

const mapStateToProps = (state) => ({
  error: state.settingsReducer.error,
  loading: state.settingsReducer.loading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSettings: getSettingsThunk,
    },
    dispatch
  );

Settings.propTypes = {
  navigation: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  getSettings: PropTypes.func.isRequired,
};

Settings.defaultProps = {
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
