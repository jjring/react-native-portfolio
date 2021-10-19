import React from 'react';
import { Text } from 'native-base';
import Spacer from '../../../components/Spacer';
import styles from '../styles';

const pkg = require('../../../../package.json');

const AppInfo = () => {
  return (
    <>
      <Text style={styles.appInfoTextLarge}>Map My Drive v{pkg.version}</Text>
      <Spacer size={15} />
      <Text style={styles.appInfoTextSmall}>Developed By:</Text>
      <Text style={styles.appInfoTextSmall}>Barefoot For Life</Text>
    </>
  );
};

export default AppInfo;
