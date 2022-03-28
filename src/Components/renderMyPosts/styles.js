import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';

export default StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 7,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  finishedWrapper: {
    borderColor: colors.yellow,
    borderWidth: 2,
    position: 'absolute',
    top: '43%',
    left: '40%',
    padding: 5,
  },
  isFinished: {
    color: colors.yellow,
    fontSize: 25,
    fontWeight: '700',
  },
  deletedWrapper: {
    borderColor: colors.red,
    borderWidth: 2,
    position: 'absolute',
    top: '43%',
    left: '40%',
    padding: 5,
  },
  isDeleted: {color: colors.red, fontSize: 25, fontWeight: '700'},
  title: {
    fontWeight: '700',
    fontSize: 27,
  },
  priceAndTime: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 7,
    marginBottom: 7,
  },
  price: {
    fontWeight: '700',
    fontSize: 16,
  },
  timestamp: {
    color: colors.gray,
  },
  description: {
    marginTop: 20,
    fontSize: 18,
  },
  //Modal

  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    width: '50%',
    maxHeight: '25%',
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 7,
    flexDirection: 'column',
  },
  buttonStyle: {flex: 1, width: '100%'},
  deleteButton: {
    backgroundColor: colors.red,
    flexBasis: 'auto',
    flexGrow: 1,
    justifyContent: 'center',
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
  },
  deleteText: {
    textAlign: 'center',
    color: colors.white,
  },
  finishButton: {
    flexBasis: 'auto',
    flexGrow: 1,
    justifyContent: 'center',
  },
  finishText: {
    color: colors.black,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: colors.grey,
    flexBasis: 'auto',
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
  },
  cancelText: {
    textAlign: 'center',
    color: colors.white,
  },
});
