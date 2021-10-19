import React from 'react';
import { Scene } from 'react-native-router-flux';
import { Appearance } from 'react-native';
import Icon from 'react-native-ionicons';
import DefaultProps from './navigation';
import RoutesContainer from '../features/Routes/containers';
import RouteDetailContainer from '../features/RouteDetail/containers';
import ShareManager from '../features/ShareManager/containers';
import MapContainer from '../features/Map/containers';
import RouteDirections from '../features/RouteDirections/containers';
import IAPStore from '../features/IAPStore/containers';
import Settings from '../features/Settings/containers';

const useDarkMode = Appearance.getColorScheme() === 'dark';

const Index = (
  <Scene
    key="root"
    tabs
    hideNavBar
    showLabel={false}
    {...DefaultProps.tabProps}
  >
    <Scene
      key="routesstack"
      icon={() => <Icon name="map" color={useDarkMode ? '#ababab' : '#fff'} />}
      {...DefaultProps.navbarProps}
    >
      <Scene key="routes" component={RoutesContainer} title="ROUTES" initial />
      <Scene
        key="routedetail"
        component={RouteDetailContainer}
        title="Route Detail"
      />
      <Scene key="map" component={MapContainer} />
      <Scene key="routedirections" component={RouteDirections} />
    </Scene>

    <Scene
      key="sharemanagerstack"
      onEnter={() => {}}
      icon={() => (
        <Icon
          name="share"
          ios="share"
          android="share-social"
          color={useDarkMode ? '#ababab' : '#fff'}
        />
      )}
      {...DefaultProps.navbarProps}
    >
      <Scene
        key="sharemanager"
        component={ShareManager}
        title="SHARING"
        initial
      />
    </Scene>

    <Scene
      key="iapstack"
      onEnter={() => {}}
      icon={() => <Icon name="cart" color={useDarkMode ? '#ababab' : '#fff'} />}
      hideNavBar
      {...DefaultProps.storeNavbarProps}
    >
      <Scene key="iap" component={IAPStore} title="" initial />
    </Scene>

    <Scene
      key="settingsstack"
      icon={() => <Icon name="cog" color={useDarkMode ? '#ababab' : '#fff'} />}
      {...DefaultProps.navbarProps}
    >
      <Scene key="settings" component={Settings} title="SETTINGS" initial />
    </Scene>
  </Scene>
);

export default Index;
