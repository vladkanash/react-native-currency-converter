import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageSize = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  $largeContainerSize: imageSize,
  $largeImageSize: imageSize / 2,
  $smallContainerSize: imageSize / 2,
  $smallImageSize: imageSize / 4,
  container: {
    alignItems: 'center',
  },
  containerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '$largeContainerSize',
    height: '$largeContainerSize',
  },
  logo: {
    width: '$largeImageSize',
  },
  text: {
    fontWeight: '600',
    fontSize: 28,
    letterSpacing: -0.5,
    marginTop: 15,
    color: '$white',
  },
});
