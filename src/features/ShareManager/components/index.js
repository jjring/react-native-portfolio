import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { ActivityIndicator, Appearance, Text, View } from 'react-native';
import styles from '../../Routes/styles';
import RouteList from '../../../components/RouteList';
import Colors from '../../../../native-base-theme/variables/commonColor';

const useDarkMode = Appearance.getColorScheme() === 'dark';

const ShareManagerComponent = ({ proFeaturesEnabled, loading, routes }) => {
  return (
    <Container style={styles.routeListContainer}>
      {proFeaturesEnabled && loading && (
        <ActivityIndicator
          color={useDarkMode ? Colors.brandLight : Colors.brandInfo}
          style={{ margin: 10 }}
        />
      )}
      {!proFeaturesEnabled && (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
          }}
        >
          <Text
            style={{
              color: Colors.textColor,
              textAlign: 'center',
              fontSize: 15,
              margin: 30,
            }}
          >
            Upgrade to Pro and get route link sharing. Easily generate a website
            link that will display your route and can be shared with friends and
            family. Upgrading will also unlock the sharing manager where you can
            quickly create new links, renew links, or stop sharing links.
          </Text>
        </View>
      )}
      {proFeaturesEnabled && (
        <Content padder>
          <RouteList
            includeRouteNavButtons={false}
            includeRouteShareButtons
            routes={routes}
          />
        </Content>
      )}
    </Container>
  );
};

ShareManagerComponent.propTypes = {
  proFeaturesEnabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ShareManagerComponent;
