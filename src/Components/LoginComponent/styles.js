import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';

export default StyleSheet.create({
  wrapper: {padding: 10, justifyContent: 'center'},
  imageStyle: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  signInButton: {
    marginTop: 15,
  },
  signupButton: {
    marginTop: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  clickText: {color: colors.primary},
});
