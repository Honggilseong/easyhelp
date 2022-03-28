import {StyleSheet} from 'react-native';
import colors from '../Assets/theme/colors';
import fontSize from '../Assets/theme/fontSize';

export default StyleSheet.create({
  userModalContainer: {
    flex: 1,
    alignItems: 'center',
    width: '70%',
    maxHeight: 300,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 7,
  },
  infoContainer: {
    height: 100,
    backgroundColor: colors.primary,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
  },
  userModalText: {
    color: colors.white,
    fontSize: fontSize.modalTitle,
  },
  blockContainer: {
    height: 100,
    backgroundColor: colors.red,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelContainer: {
    height: 100,
    backgroundColor: colors.grey,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
  },
  userInfoModalContainer: {
    width: 370,
    height: 510,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 7,
  },
  userInfoWrapper: {
    alignItems: 'center',
    height: 440,
    borderWidth: 1,
    borderColor: 'black',
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
  },
  userNameText: {
    marginBottom: 12,
    marginTop: 12,
    fontWeight: '700',
    fontSize: 18,
  },
  recommendButtonContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    width: '85%',
  },
  userInfoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'black',
    flex: 1,
    backgroundColor: colors.grey,
  },
  cancelButtonText: {
    color: colors.white,
    fontSize: fontSize.text,
  },
  doneButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.primary,
  },
  doneButtonText: {
    color: colors.white,
    fontSize: fontSize.text,
  },
});
