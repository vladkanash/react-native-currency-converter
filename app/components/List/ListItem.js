import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import Icon from './Icon';

const ListItem = ({
  text,
  onPress,
  selected = false,
  checkmark = true,
  visible = true,
  customIcon = null,
  iconBackground,
  optText,
}) => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor={styles.$underlayColor}
  >
    <View style={styles.row}>
      <Text style={styles.text}>{text}</Text>
      {optText ?
        <Text style={styles.text}>{optText}</Text> : null}
      {selected ?
        <Icon
          checkmark={checkmark}
          visible={visible}
          iconBackground={iconBackground}
        /> : null}
      {customIcon}
    </View>
  </TouchableHighlight>
);

ListItem.propTypes = {
  text: PropTypes.string,
  optText: PropTypes.string,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
  checkmark: PropTypes.bool,
  visible: PropTypes.bool,
  customIcon: PropTypes.element,
  iconBackground: PropTypes.string,
};

export default ListItem;

