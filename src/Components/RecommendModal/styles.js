import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';
import fontSize from '../../Assets/theme/fontSize';

export default StyleSheet.create({
  itemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexGrow: 2,
    flexDirection: 'column',
  },
  itemContainer: {
    width: 60,
    height: 50,
    borderBottomRightRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 5,
  },
  itemText: {
    fontSize: 13,
    marginTop: 5,
    fontWeight: '700',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.grey,
    borderBottomLeftRadius: 7,
  },
  doneButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.primary,
    borderBottomRightRadius: 7,
  },
  cancelButtonText: {
    color: colors.white,
    fontSize: fontSize.text,
  },
  doneButtonText: {
    color: colors.white,
    fontSize: fontSize.text,
  },
});
