import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';
import fontSize from '../../Assets/theme/fontSize';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  textAndIcon: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 30,
  },
  titleText: {
    fontSize: fontSize.text,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '700',
    padding: 7,
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
