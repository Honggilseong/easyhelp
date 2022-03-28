import {Platform, StyleSheet} from 'react-native';
import colors from '../../../Assets/theme/colors';
import fontSize from '../../../Assets/theme/fontSize';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
    maxHeight: 320,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 7,
  },
  modalTitle: {
    fontSize: fontSize.modalTitle,
    marginBottom: 7,
    marginTop: 7,
    fontWeight: '700',
  },
  modalTitleUnderline: {
    borderWidth: 0.7,
    width: '100%',
    borderColor: colors.black,
  },
  descriptionContainer: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDescription: {
    fontSize: fontSize.modalText,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 63,
  },
  negativeButton: {
    flex: 1,
    backgroundColor: colors.grey,
    borderBottomLeftRadius: 7,
    justifyContent: 'center',
  },
  positiveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderBottomRightRadius: 7,
    justifyContent: 'center',
  },
  negativeText: {
    color: colors.white,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  positiveText: {
    color: colors.white,
    alignSelf: 'center',
  },
});
