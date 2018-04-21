import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';
import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';
import { connectAlert } from '../components/Alert';

class Home extends Component {
    static propTypes = {
      navigation: PropTypes.object,
      dispatch: PropTypes.func,
      baseCurrency: PropTypes.string,
      quoteCurrency: PropTypes.string,
      amount: PropTypes.number,
      conversionRate: PropTypes.number,
      isFetching: PropTypes.bool,
      lastConvertedDate: PropTypes.object,
      primaryColor: PropTypes.string,
      alertWithType: PropTypes.func,
      currencyError: PropTypes.string,
    };

    componentWillMount() {
      this.props.dispatch(getInitialConversion());
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.currencyError && nextProps.currencyError !== this.props.currencyError) {
        this.props.alertWithType('error', 'Error', nextProps.currencyError);
      }
    }

    handlePressBaseCurrency = () => {
      this.props.navigation.navigate('CurrencyList', {
        title: 'Base Currency',
        type: 'base',
      });
    };

    handlePressQuoteCurrency = () => {
      this.props.navigation.navigate('CurrencyList', {
        title: 'Quote Currency',
        type: 'quote',
      });
    };

    handleTextChange = (amount) => {
      this.props.dispatch(changeCurrencyAmount(amount));
    };

    handleSwapCurrencies = () => {
      this.props.dispatch(swapCurrency());
    };

    handleOptionsPress = () => {
      this.props.navigation.navigate('Options');
    };

    render() {
      let quotePrice = this.props.swapped ?
        (this.props.amount / this.props.conversionRate).toFixed(2) :
        (this.props.amount * this.props.conversionRate).toFixed(2);

      if (this.props.isFetching) {
        quotePrice = '...';
      }

      return (
        <Container backgroundColor={this.props.primaryColor}>
          <StatusBar translucent={false} barStyle="light-content" />
          <Header
            onPress={this.handleOptionsPress}
          />
          <KeyboardAvoidingView behavior="padding">
            <Logo />
            <InputWithButton
              buttonText={this.props.baseCurrency}
              onPress={this.handlePressBaseCurrency}
              defaultValue={this.props.amount.toString()}
              keyboardType="numeric"
              onChangeText={this.handleTextChange}
              textColor={this.props.primaryColor}
            />
            <InputWithButton
              editable={false}
              buttonText={this.props.quoteCurrency}
              onPress={this.handlePressQuoteCurrency}
              defaultValue={quotePrice}
              keyboardType="numeric"
              onChangeText={this.handleTextChange}
              textColor={this.props.primaryColor}
            />
            <LastConverted
              base={this.props.baseCurrency}
              quote={this.props.quoteCurrency}
              date={this.props.lastConvertedDate}
              conversionRate={this.props.conversionRate}
            />
            <ClearButton
              text="Reverse Currencies"
              onPress={this.handleSwapCurrencies}
            />
          </KeyboardAvoidingView>
        </Container>
      );
    }
}

const mapStateToProps = (state) => {
  const {
    baseCurrency, quoteCurrency, amount, error, isFetching, swapped
  } = state.currencies;

  const { primaryColor } = state.theme;
  const currencyKey = swapped ? baseCurrency : quoteCurrency;
  const conversionInfo = state.currencies.conversions[currencyKey] || {};

  return {
    baseCurrency,
    quoteCurrency,
    amount,
    primaryColor,
    isFetching,
    swapped,
    conversionRate: conversionInfo.Cur_OfficialRate || 0,
    lastConvertedDate: conversionInfo.Date ? new Date(conversionInfo.Date) : new Date(),
    currencyError: error,
  };
};

export default connect(mapStateToProps)(connectAlert(Home));
