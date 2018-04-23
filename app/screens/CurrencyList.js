import React, { Component } from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListItem, Separator } from '../components/List';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';
import {getCurrencyDynamics} from "../actions/dynamics";
import moment from "moment/moment";

class CurrencyList extends Component {
    static propTypes = {
      navigation: PropTypes.object,
      dispatch: PropTypes.func,
      baseCurrency: PropTypes.string,
      quoteCurrency: PropTypes.string,
      primaryColor: PropTypes.string,
      currencyList: PropTypes.array,
      startDate: PropTypes.object,
    };

    handlePress = (currency) => {
      const { type } = this.props.navigation.state.params;
      if (type === 'base') {
        this.props.dispatch(changeBaseCurrency(currency.abbr));
      } else if (type === 'quote') {
        this.props.dispatch(changeQuoteCurrency(currency.abbr));
      }
      this.props.dispatch(getCurrencyDynamics(currency.code, this.props.startDate, new Date()));
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
            data={this.props.currencyList}
            keyExtractor={item => item.abbr}
            ItemSeparatorComponent={Separator}
            renderItem={({ item }) => (
              <ListItem
                text={item.abbr + ' - ' + item.name}
                selected={item.abbr === comparisonCurrency}
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
  const currencyList = Object.values(state.currencies.conversions)
    .map(e => ({
      abbr: e.Cur_Abbreviation,
      name: e.Cur_Name,
      code: e.Cur_ID,
    }));

  const startDate = moment().subtract(1, 'months');
  const { baseCurrency, quoteCurrency } = state.currencies;
  const { primaryColor } = state.theme;
  return {
    startDate,
    baseCurrency,
    quoteCurrency,
    primaryColor,
    currencyList,
  };
};

export default connect(mapStateToProps)(CurrencyList);
