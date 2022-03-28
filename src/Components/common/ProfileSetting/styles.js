import {StyleSheet} from 'react-native';
import colors from '../../../Assets/theme/colors';
import fontSize from '../../../Assets/theme/fontSize';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.grey,
    marginLeft: 7,
    marginRight: 7,
  },
  blockedUsersText: {
    marginLeft: 10,
    fontSize: fontSize.text,
  },
});
