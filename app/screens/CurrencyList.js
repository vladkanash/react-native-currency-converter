import React, { Component } from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListItem, Separator } from '../components/List';
import currencies from '../data/currencies';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';

class CurrencyList extends Component {
    static propTypes = {
      navigation: PropTypes.object,
      dispatch: PropTypes.func,
      baseCurrency: PropTypes.string,
      quoteCurrency: PropTypes.string,
      primaryColor: PropTypes.string,
    };

    handlePress = (currency) => {
      const { type } = this.props.navigation.state.params;
      if (type === 'base') {
        this.props.dispatch(changeBaseCurrency(currency));
      } else if (type === 'quote') {
        this.props.dispatch(changeQuoteCurrency(currency));
      }

      this.props.navigation.goBack(null);
    };

    render() {
      let comparisonCurrency = this.props.baseCurrency;
      if (this.props.navigation.state.params.type === 'quote') {
        comparisonCurrency = this.props.quoteCurrency;
      }

      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="default" translucent={false} />
          <FlatList
            data={currencies}
            keyExtractor={item => item}
            ItemSeparatorComponent={Separator}
            renderItem={({ item }) => (
              <ListItem
                text={item}
                selected={item === comparisonCurrency}
                onPress={() => this.handlePress(item)}
                iconBackground={this.props.primaryColor}
              />
            )}
          />
        </View>
      );
    }
}

const mapStateToProps = (state) => {
  const { baseCurrency, quoteCurrency } = state.currencies;
  const { primaryColor } = state.theme;
  return {
    baseCurrency,
    quoteCurrency,
    primaryColor,
  };
};

export default connect(mapStateToProps)(CurrencyList);
