import React, { Component } from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';

import { ListItem, Separator } from '../components/List';
import currencies from '../data/currencies';

const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {
    static propTypes = {
      navigation: PropTypes.object,
    };

    handlePress = () => {
      this.props.navigation.goBack();
    };

    render() {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="default" translucent={false} />
          <FlatList
            data={currencies}
            keyExtractor={item => item}
            ItemSeparatorComponent={Separator}
            renderItem={({ item }) => (<ListItem
              text={item}
              selected={item === TEMP_CURRENT_CURRENCY}
              onPress={this.handlePress}
            />)}
          />
        </View>
      );
    }
}

export default CurrencyList;
