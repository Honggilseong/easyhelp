import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';

export default StyleSheet.create({
  imageStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 250,
    height: 200,
  },
  noticeContainer: {
    margin: 8,
  },
  noticeTextWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 4,
  },

  noticeText: {
    fontSize: 18,
  },
  noticesWrapper: {
    marginTop: 12,
  },
  noticeTitle: {
    width: 270,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    borderTopWidth: 1,
  },
  iconWrapper: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderRightColor: 'black',
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 150,
  },
  text: {
    marginTop: 12,
  },
});
