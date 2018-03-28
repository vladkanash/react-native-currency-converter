import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';

const TEMP_BASE_CURRENCY = 'USD';
const TEMP_QUOTE_CURRENCY = 'GBP';
const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '79.49';

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

    render() {
      return (
        <Container>
          <StatusBar translucent={false} barStyle="light-content" />
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
          <ClearButton
            text="Reverse Currencies"
            onPress={this.handleSwapCurrencies}
          />
        </Container>
      );
    }
}

export default Home;
