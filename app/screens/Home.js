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
import {getCurrencyDynamics} from "../actions/dynamics";
import moment from 'moment';

class Home extends Component {
    static propTypes = {
      navigation: PropTypes.object,
      dispatch: PropTypes.func,
      baseCurrency: PropTypes.string,
      quoteCurrency: PropTypes.string,
      amount: PropTypes.number,
      conversionRate: PropTypes.number,
      conversionScale: PropTypes.number,
      isFetching: PropTypes.bool,
      lastConvertedDate: PropTypes.object,
      primaryColor: PropTypes.string,
      alertWithType: PropTypes.func,
      currencyError: PropTypes.string,
      startDate: PropTypes.object,
    };

    componentWillMount() {
      this.props.dispatch(getInitialConversion());
      this.props.dispatch(getCurrencyDynamics('145', this.props.startDate, new Date()));
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

    handleShowDynamics = () => {
      this.props.navigation.navigate('Dynamics');
    };

    getProperRate = () =>
      this.props.swapped ?
        this.props.conversionRate : (1 / this.props.conversionRate).toFixed(4);

    render() {
      let quotePrice = (this.props.amount *
        this.getProperRate() *
        (this.props.swapped ? 1 / this.props.conversionScale : this.props.conversionScale)).toFixed(2);

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
              onPressRight={this.props.baseCurrency !== 'BYN' ? this.handleShowDynamics : null}
            />
            <InputWithButton
              editable={false}
              buttonText={this.props.quoteCurrency}
              onPress={this.handlePressQuoteCurrency}
              defaultValue={quotePrice}
              keyboardType="numeric"
              onChangeText={this.handleTextChange}
              textColor={this.props.primaryColor}
              onPressRight={this.props.quoteCurrency !== 'BYN' ? this.handleShowDynamics : null}
            />
            <LastConverted
              base={this.props.baseCurrency}
              quote={this.props.quoteCurrency}
              date={this.props.lastConvertedDate}
              conversionRate={this.getProperRate()}
              baseScale={this.props.swapped ? this.props.conversionScale : 1}
              quoteScale={this.props.swapped ? 1 : this.props.conversionScale}
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

  const startDate = moment().subtract(1, 'months');
  const { primaryColor } = state.theme;
  const currencyKey = swapped ? baseCurrency : quoteCurrency;
  const conversionInfo = state.currencies.conversions[currencyKey] || {};

  return {
    startDate,
    baseCurrency,
    quoteCurrency,
    amount,
    primaryColor,
    isFetching,
    swapped,
    conversionRate: conversionInfo.Cur_OfficialRate || 0,
    conversionScale: conversionInfo.Cur_Scale || 1,
    lastConvertedDate: conversionInfo.Date ? new Date(conversionInfo.Date) : new Date(),
    currencyError: error,
  };
};

export default connect(mapStateToProps)(connectAlert(Home));
