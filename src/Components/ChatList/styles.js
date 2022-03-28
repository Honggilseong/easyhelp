import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';
import fontSize from '../../Assets/theme/fontSize';

export default StyleSheet.create({
  wrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: colors.grey,
    backgroundColor: colors.white,
    borderRadius: 7,
    width: '93%',
    alignSelf: 'center',
  },
  timestampAndBadgeContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  timestampText: {
    color: colors.gray,
  },
  recipientEmail: {
    fontWeight: '700',
    fontSize: fontSize.email,
    paddingBottom: 7,
  },
  badgeContainer: {
    alignSelf: 'flex-end',
    width: 20,
    height: 20,
    marginRight: 20,
    borderRadius: 100,
    justifyContent: 'center',
  },
  badgeCount: {
    fontSize: fontSize.timestamp,
    textAlign: 'center',
    color: colors.white,
    fontWeight: '700',
  },
  lastText: {
    marginTop: 7,
    fontSize: fontSize.text,
  },
});
