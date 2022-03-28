import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';
import fontSize from '../../Assets/theme/fontSize';

export default StyleSheet.create({
  wrapper: {
    padding: 12,
  },
  userContainer: {
    backgroundColor: colors.white,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 12,
    height: 350,
  },
  email: {
    fontSize: fontSize.email,
    alignSelf: 'center',
  },
  displayName: {fontSize: fontSize.text},
  myPostsButton: {
    marginBottom: 30,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  iconContainer: {
    width: 80,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 20,
    alignItems: 'center',
  },
});
