import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';

export default StyleSheet.create({
  wrapper: {
    padding: 12,
  },
  flatListPostsWrapper: {
    flexGrow: 0,
    maxHeight: '100%',
    paddingBottom: 60,
  },
  refreshButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    maxHeight: 42,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 5,
  },
});
