import { Appearance } from 'react-native';

const useDarkMode = Appearance.getColorScheme() === 'dark';

export default {
  settingsContainer: {
    backgroundColor: useDarkMode ? '#000000' : '#E9E9EF',
  },
  unitsControlView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  unitsControlText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  accuracyControlName: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  accuracyControlDescription: {
    alignSelf: 'center',
    fontSize: 16,
  },
  altitudeControlView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  altitudeControlText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  speedControlView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  speedControlText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  weatherControlView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherControlText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stopControlView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stopControlText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stopDurationControlSlider: {
    height: 30,
    width: 280,
    alignSelf: 'center',
  },
  stopDurationControlText: {
    alignSelf: 'center',
    fontSize: 16,
  },
  intervalControlView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intervalControlText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  intervalDistanceControlSlider: {
    height: 30,
    width: 280,
    alignSelf: 'center',
  },
  intervalDistanceControlText: {
    alignSelf: 'center',
    fontSize: 16,
  },
  webLinkButtonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  appInfoTextSmall: {
    alignSelf: 'center',
    fontSize: 18,
  },
  appInfoTextLarge: {
    alignSelf: 'center',
    fontSize: 35,
  },
};
