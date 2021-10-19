import { Appearance } from 'react-native';
import Colors from '../../../native-base-theme/variables/commonColor';

const useDarkMode = Appearance.getColorScheme() === 'dark';

export default {
  routeListContainer: {
    backgroundColor: useDarkMode ? '#000000' : '#E9E9EF',
  },
  routeCard: {
    backgroundColor: useDarkMode ? '#242424' : '#ffffff',
    paddingHorizontal: 6,
  },
  routeCardItemBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: useDarkMode ? '#242424' : '#ffffff',
  },
  routeCardItemOutsideView: {
    flex: 1,
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  routeCardItemInsideView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigateIcon: {
    fontSize: 17,
    color: Colors.brandInfo,
  },
  generalIcon: {
    fontSize: 30,
    color: Colors.brandInfo,
  },
  routeButton: {
    alignSelf: 'center',
  },
  routeShareButton: {
    alignSelf: 'center',
    width: 70,
    marginLeft: 15,
    height: 30,
  },
  routeItemName: {
    fontWeight: '800',
    marginRight: 30,
  },
  routeItemDate: {
    fontWeight: '400',
  },
  routeButtonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routeAddButton: {
    width: '49%',
  },
};
