import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';

const TEMP_BASE_CURRENCY = 'USD';
const TEMP_QUOTE_CURRENCY = 'GBP';
const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '79.49';
const TEMP_CONVERSION_RATE = 0.7974;
const TEMP_CONVERSION_DATE = new Date();

class Home extends Component {
    handlePressBaseCurrency = () => {
      console.log('press base');
    };

    handlePressQuoteCurrency = () => {
      console.log('press quote');
    };

    handleTextChange = (text) => {
      console.log('text changed: ', text);
    };

    handleSwapCurrencies = () => {
      console.log('swap currencies');
    };

    handleOptionsPress = () => {
      console.log('options pressed');
    };

    render() {
      return (
        <Container>
          <StatusBar translucent={false} barStyle="light-content" />
          <Header
            onPress={this.handleOptionsPress}
          />
        <KeyboardAvoidingView behavior="padding">
          <Logo />
          <InputWithButton
            buttonText={TEMP_BASE_CURRENCY}
            onPress={this.handlePressBaseCurrency}
            defaultValue={TEMP_BASE_PRICE}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
          />
          <InputWithButton
            editable={false}
            buttonText={TEMP_QUOTE_CURRENCY}
            onPress={this.handlePressQuoteCurrency}
            defaultValue={TEMP_QUOTE_PRICE}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
          />
          <LastConverted
            base={TEMP_BASE_CURRENCY}
            quote={TEMP_QUOTE_CURRENCY}
            date={TEMP_CONVERSION_DATE}
            conversionRate={TEMP_CONVERSION_RATE}
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

export default Home;
