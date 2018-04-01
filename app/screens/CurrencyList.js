import React from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import currencies from '../data/currencies';
import { ListItem, Separator } from '../components/List';

const TEMP_CURRENT_CURRENCY = 'CAD';

const CurrencyList = () => (
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

export default CurrencyList;
