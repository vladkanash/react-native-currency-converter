import React from 'react';
import PropTypes from 'prop-types';
import {Platform, Text, TextInput, TouchableHighlight, View} from 'react-native';
import color from 'color';

import styles from './styles';
import {Ionicons} from "@expo/vector-icons";

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_SIZE = 30;

const InputWithButton = (props) => {
  const { onPress, buttonText, editable = true } = props;

  const underlayColor = color(styles.$buttonBackgroundColorBase)
    .darken(styles.$buttonBackgroundColorModifier);

  const containerStyles = [styles.container];
  if (editable === false) {
    containerStyles.push(styles.containerDisabled);
  }

  const buttonTextStyles = [styles.buttonText];
  if (props.textColor) {
    buttonTextStyles.push({ color: props.textColor });
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={underlayColor}
        style={styles.buttonContainer}
        onPress={onPress}
      >

        <Text style={buttonTextStyles}>
          {buttonText}
        </Text>
      </TouchableHighlight>

      <View
        style={styles.border}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        {...props}
      />

      { props.onPressRight ?
        <TouchableHighlight
          underlayColor={underlayColor}
          style={styles.buttonContainer}
          onPress={props.onPressRight}
        >
          <View style={styles.icon}>
            <Ionicons
              name={`${ICON_PREFIX}-analytics`}
              color={props.textColor}
              size={ICON_SIZE}/>
          </View>
        </TouchableHighlight>
        : null
      }

    </View>
  );
};

InputWithButton.propTypes = {
  onPress: PropTypes.func,
  onPressRight: PropTypes.func,
  buttonText: PropTypes.string,
  editable: PropTypes.bool,
  textColor: PropTypes.string,
};

export default InputWithButton;
