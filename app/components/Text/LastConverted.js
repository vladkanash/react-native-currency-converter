import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import moment from 'moment';

import styles from './styles';

const LastConverted = ({
  base, quote, conversionRate, date, baseScale, quoteScale
}) => (
  <Text style={styles.smallText}>
    {baseScale} {base} = {(conversionRate * quoteScale).toFixed(4)} {quote} as of {moment(date).format('MMMM D, YYYY')};
  </Text>
);

LastConverted.propTypes = {
  date: PropTypes.object,
  base: PropTypes.string,
  quote: PropTypes.string,
  conversionRate: PropTypes.number,
  baseScale: PropTypes.number,
  quoteScale: PropTypes.number,
};

export default LastConverted;
