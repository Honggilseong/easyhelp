import {Platform, StyleSheet} from 'react-native';
import colors from '../../../Assets/theme/colors';
import fontSize from '../../../Assets/theme/fontSize';

export default StyleSheet.create({
  wrapper: {
    width: '90%',
    height: '80%',
  },
  locationsContainer: {
    backgroundColor: colors.grey,
    flexDirection: 'row',
    width: '100%',
    height: '80%',
  },
  islandContainer: {
    width: '40%',
    backgroundColor: colors.white,
    borderRightColor: colors.white,
    borderRightWidth: 1,
  },
  islandTouchArea: {
    justifyContent: 'center',
    backgroundColor: colors.primary,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    height: 50,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  locationContainer: {
    width: '60%',
    backgroundColor: colors.grey,
  },
  locationTouchArea: {
    justifyContent: 'center',
    width: '100%',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    height: 50,
  },
  locationTextStyle: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 20,
  },
  cancelButton: {
    justifyContent: 'center',
    backgroundColor: colors.grey,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    height: 50,
  },
  cancelTextStyle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 20,
  },
  resetButton: {
    justifyContent: 'center',
    backgroundColor: colors.red,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    height: 50,
  },
  resetTextStyle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 20,
  },
});
