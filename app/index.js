import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Home from './screens/Home';

EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $white: '#fff',
  $border: '#E2E2E2',
  $input: '#797979',
  $lightGrey: '#888888',
});

export default () => <Home />;
