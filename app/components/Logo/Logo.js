import React, { Component } from 'react';
import { Animated, Keyboard, Text, View, Platform } from 'react-native';

import styles from './styles';

const ANIMATION_DURATION = 250;

class Logo extends Component {
  constructor(props) {
    super(props);

    this.containerImageSize = new Animated.Value(styles.$largeContainerSize);
    this.imageSize = new Animated.Value(styles.$largeImageSize);
  }

  componentDidMount() {
    let showListener = 'keyboardWillShow';
    let hideListener = 'keyboardWillHide';

    if (Platform.OS === 'android') {
      showListener = 'keyboardDidShow';
      hideListener = 'keyboardDidHide';
    }

    this.keyboardShowListener = Keyboard.addListener(showListener, this.keyboardShow);
    this.keyboardHideListener = Keyboard.addListener(hideListener, this.keyboardHide);
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

    keyboardShow = () => {
      Animated.parallel([
        Animated.timing(this.containerImageSize, {
          toValue: styles.$smallContainerSize,
          duration: ANIMATION_DURATION,
        }),

        Animated.timing(this.imageSize, {
          toValue: styles.$smallImageSize,
          duration: ANIMATION_DURATION,
        }),

      ]).start();
    };

    keyboardHide = () => {
      Animated.parallel([
        Animated.timing(this.containerImageSize, {
          toValue: styles.$largeContainerSize,
          duration: this.ANIMATION_DURATION,
        }),

        Animated.timing(this.imageSize, {
          toValue: styles.$largeImageSize,
          duration: this.ANIMATION_DURATION,
        }),

      ]).start();
    };

    render() {
      const containerImageStyle = [
        styles.containerImage,
        { width: this.containerImageSize, height: this.containerImageSize },
      ];

      const imageStyle = [
        styles.logo,
        { width: this.imageSize },
      ];

      return (
        <View style={containerImageStyle}>
          <Animated.Image
            resizeMode="contain"
            style={imageStyle}
            source={require('./images/logo.png')}
          />
          <Text style={styles.text}>Currency Converter</Text>
        </View>
      );
    }
}

export default Logo;
