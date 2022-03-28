import {Platform, StyleSheet} from 'react-native';
import colors from '../../../Assets/theme/colors';
import fontSize from '../../../Assets/theme/fontSize';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    width: '40%',
    maxHeight: 200,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 7,
  },
  itemWrapper: {
    alignItems: 'center',
  },
  text: {
    marginTop: 40,
    color: colors.gray,
  },
});
