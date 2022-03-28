import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';
import fontSize from '../../Assets/theme/fontSize';
export default StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 7,
    marginBottom: 10,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  title: {
    fontSize: 27,
  },
  lineView: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  timestamp: {
    marginTop: 5,
  },
  description: {
    fontSize: fontSize.text,
  },
});
