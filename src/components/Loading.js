import React from 'react';
import { View, ActivityIndicator, Appearance } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../native-base-theme/variables/commonColor';

const useDarkMode = Appearance.getColorScheme() === 'dark';

const Loading = ({ fullscreen }) => (
  <View
    style={[
      {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
      fullscreen
        ? { backgroundColor: useDarkMode ? '#000000' : '#E9E9EF' }
        : {},
    ]}
  >
    <View
      style={
        fullscreen
          ? {}
          : {
              backgroundColor: 'black',
              width: 100,
              height: 100,
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              opacity: 0.7,
            }
      }
    >
      <ActivityIndicator
        size="large"
        color={
          useDarkMode || !fullscreen ? Colors.brandLight : Colors.brandInfo
        }
      />
    </View>
  </View>
);

Loading.propTypes = {
  fullscreen: PropTypes.bool,
};

Loading.defaultProps = {
  fullscreen: true,
};

export default Loading;
