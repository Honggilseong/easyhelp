import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';

export default StyleSheet.create({
  wrapper: {padding: 10},
  imageStyle: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textAndTouch: {
    marginTop: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  termsContainer: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  clickText: {color: colors.primary},
});
