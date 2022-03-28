import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';
import fontSize from '../../Assets/theme/fontSize';

export default StyleSheet.create({
  wrapper: {
    padding: 12,
  },
  titleText: {fontSize: fontSize.email},
  mainText: {fontSize: fontSize.text, color: colors.red, marginBottom: 10},
  reasonText: {fontSize: fontSize.text},
});
