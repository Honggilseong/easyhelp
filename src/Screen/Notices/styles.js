import {Platform, StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';

export default StyleSheet.create({
  headerContainer: {
    marginTop:Platform.OS === 'ios' ? 35 : 0,
    padding: 12,
  },
  closeText: {
    fontSize: 30,
  },
  titleContainer: {
    borderBottomWidth: 1,
    padding: 12,
  },
  titleText: {
    fontSize: 20,
  },
  titleDate: {
    color: colors.gray,
    fontSize: 16,
  },
  descriptionContainer: {
    padding: 12,
  },
  descriptionText: {
    fontSize: 16,
  },
});
