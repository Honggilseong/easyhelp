import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';
import fontSize from '../../Assets/theme/fontSize';
export default StyleSheet.create({
  wrapper: {
    padding: 20,
    borderRadius: 7,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderColor: colors.grey,
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  clickedWrapper: {
    borderColor: colors.red,
    borderWidth: 2,
    padding: 5,
  },
  isClicked: {color: colors.red, fontSize: 25, fontWeight: '700'},
  title: {
    fontWeight: '700',
    fontSize: 27,
  },
  emailStyle: {
    fontSize: fontSize.email,
  },
});
