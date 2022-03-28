import {StyleSheet} from 'react-native';
import colors from '../../../Assets/theme/colors';

export default StyleSheet.create({
  wrapper: {marginTop: 12},
  iconWrapper: {
    height: 42,
    borderBottomWidth: 1,
    borderColor: colors.grey,
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginTop: 12,
  },
  textInput: {
    flex: 1,
    width: '100%',
  },
  errorText: {
    color: colors.danger,
  },
});
