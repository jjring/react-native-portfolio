import Colors from '../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: Colors.brandPrimary },
    titleStyle: {
      color: Colors.brandLight,
      alignSelf: 'center',
      letterSpacing: 1,
      fontSize: Colors.fontSizeH2,
      width: 250,
    },
    backButtonTintColor: Colors.brandLight,
  },
  storeNavbarProps: {
    navigationBarStyle: { backgroundColor: Colors.brandPrimary },
    titleStyle: {
      color: Colors.brandLight,
      alignSelf: 'center',
      letterSpacing: 1,
      fontSize: Colors.fontSizeH2,
      width: 250,
    },
    backButtonTintColor: Colors.brandLight,
  },

  tabProps: {
    swipeEnabled: false,
    activeBackgroundColor: 'rgba(255,255,255,0.1)',
    inactiveBackgroundColor: Colors.brandPrimary,
    tabBarStyle: { backgroundColor: Colors.brandPrimary },
  },

  icons: {
    style: { color: 'white', height: 30, width: 30 },
  },
};
