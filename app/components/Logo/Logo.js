import React from 'react';
import { View, Image, Text } from 'react-native';

import styles from './styles';

const Logo = () => (
  <View style={styles.container}>
    <Image style={styles.containerImage} source={require('./images/logo.png')} />
    <Text style={styles.text}>Currency Converter</Text>
  </View>
);

export default Logo;
