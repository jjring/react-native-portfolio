import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Body } from 'native-base';
import Spacer from '../../../components/Spacer';
import UnitsControl from './UnitsControl';
import AltitudeControl from './AltitudeControl';
import WeatherControl from './WeatherControl';
import StopControl from './StopControl';
import StopDurationControl from './StopDurationControl';
import IntervalControl from './IntervalControl';
import IntervalDistanceControl from './IntervalDistanceControl';
import WebLinks from './WebLinks';
import AppInfo from './AppInfo';
import styles from '../styles';
import SpeedControl from './SpeedControl';

const SettingsComponent = ({ openUrl }) => {
  return (
    <Container style={styles.settingsContainer}>
      <Content padder>
        <Body>
          <UnitsControl />
          <Spacer size={20} />
          {/* <AccuracyControl />
            <Spacer size={20} /> */}
          <AltitudeControl />
          <Spacer size={20} />
          <SpeedControl />
          <Spacer size={20} />
          <WeatherControl />
          <Spacer size={25} />
          <StopControl />
          <Spacer size={10} />
          <StopDurationControl />
          <Spacer size={25} />
          <IntervalControl />
          <Spacer size={10} />
          <IntervalDistanceControl />
          <Spacer size={20} />
          <AppInfo />
          <Spacer size={20} />
          <WebLinks openUrl={openUrl} />
        </Body>
      </Content>
    </Container>
  );
};

SettingsComponent.propTypes = {
  openUrl: PropTypes.func.isRequired,
};

export default SettingsComponent;
