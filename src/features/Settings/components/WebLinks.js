import React from 'react';
import { View, Linking, Appearance } from 'react-native';
import { Button, Text } from 'native-base';
import Icon from 'react-native-ionicons';
import PropTypes from 'prop-types';
import Spacer from '../../../components/Spacer';
import styles from '../styles';

const useDarkMode = Appearance.getColorScheme() === 'dark';

const WebLinks = ({ openUrl }) => {
  return (
    <>
      <View style={styles.webLinkButtonView}>
        <Button
          iconLeft
          block
          info
          onPress={() => openUrl('https://barefootforlife.com/mapmydrivehelp')}
        >
          <Icon
            name="book-outline"
            color={useDarkMode ? 'black' : 'white'}
            style={{ marginLeft: 10 }}
          />
          <Text>Help Guides</Text>
        </Button>
      </View>
      <Spacer size={5} />
      <View style={styles.webLinkButtonView}>
        <Spacer size={5} />
        <Button
          iconLeft
          block
          info
          onPress={() => openUrl('https://barefootforlife.com')}
        >
          <Icon
            name="globe-outline"
            color={useDarkMode ? 'black' : 'white'}
            style={{ marginLeft: 10 }}
          />
          <Text>Website</Text>
        </Button>
        <Spacer size={5} />
        <Button
          iconLeft
          block
          info
          onPress={() =>
            Linking.openURL(
              'mailto:contact@barefootforlife.com?subject=Map My Drive Feedback'
            )
          }
        >
          <Icon
            name="mail-outline"
            color={useDarkMode ? 'black' : 'white'}
            style={{ marginLeft: 10 }}
          />
          <Text>Email</Text>
        </Button>
        <Spacer size={5} />
      </View>
      <View style={styles.webLinkButtonView}>
        <Spacer size={5} />
        <Button
          transparent
          info
          onPress={() =>
            openUrl(
              'https://www.iubenda.com/privacy-policy/29675732/full-legal'
            )
          }
        >
          <Text>Privacy Policy</Text>
        </Button>
        <Spacer size={5} />
        <Button
          transparent
          info
          onPress={() =>
            openUrl('https://www.iubenda.com/terms-and-conditions/29675732')
          }
        >
          <Text>Term of Use</Text>
        </Button>
        <Spacer size={5} />
      </View>
    </>
  );
};

WebLinks.propTypes = {
  openUrl: PropTypes.func.isRequired,
};

export default WebLinks;
