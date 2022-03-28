import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';

export default StyleSheet.create({
  wrapper: {padding: 12, flexBasis: '70%'},
  messageContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    maxWidth: '60%',
  },
  username: {color: colors.black, marginBottom: 5, fontWeight: 'bold'},
  text: {fontSize: 15},
  imageText: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    alignSelf: 'center',
    transform: [{scale: 0.8}],
  },
  time: {alignSelf: 'flex-end', fontSize: 11},
});
