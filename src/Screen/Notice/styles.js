import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';
import fontSize from '../../Assets/theme/fontSize';

export default StyleSheet.create({
  wrapper: {padding: 7},
  noticeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  noticeTitle: {
    fontSize: 18,
  },
});
