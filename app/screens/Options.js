import React, { Component } from 'react';
import { Linking, Platform, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import Separator from '../components/List/Separator';
import ListItem from '../components/List/ListItem';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

class Options extends Component {
    static propTypes = {
      navigation: PropTypes.object,
    };

    handleThemesPress = () => {
      this.props.navigation.navigate('Themes');
    };

    handleSitePress = () => {
      Linking.openURL('https://github.com/vladkanash').catch(() => alert('An error occurred'));
    };

    render() {
      return (
        <ScrollView>
          <StatusBar translucent={false} barStyle="default" />
          <ListItem
            text="Themes"
            onPress={this.handleThemesPress}
            customIcon={
              <Ionicons name={`${ICON_PREFIX}-arrow-forward`} color={ICON_COLOR} size={ICON_SIZE} />}
          />
          <Separator />
          <ListItem
            text="GitHub"
            onPress={this.handleSitePress}
            customIcon={
              <Ionicons name={`${ICON_PREFIX}-link`} color={ICON_COLOR} size={ICON_SIZE} />}
          />
        </ScrollView>
      );
    }
}

export default Options;
