import {StyleSheet} from 'react-native';
import colors from '../../Assets/theme/colors';

export default StyleSheet.create({
  flatListMessagesWrapper: {
    flexGrow: 1,
    height: '91%',
  },
  inputContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sendPhoto: {alignItems: 'center', justifyContent: 'center'},
  messageInput: {
    padding: 7,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 40,
    backgroundColor: colors.primary,
  },
  sendText: {
    color: colors.white,
  },
});
