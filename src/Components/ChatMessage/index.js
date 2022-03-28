import React from 'react';
import {View, Text, Image} from 'react-native';
import moment from 'moment';
import styles from './styles';
import colors from '../../Assets/theme/colors';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../../../firebase';
import getUserIdWithoutEmail from '../../Utils/getUserIdWithoutEmail';

const ChatMessage = ({item}) => {
  const [userLoggedIn] = useAuthState(auth);
  const {id, user, messageInfo} = item;
  const isMyMessage = () => {
    return user === userLoggedIn.email;
  };
  return (
    <>
      {messageInfo.message ? (
        <View style={styles.wrapper}>
          {!isMyMessage() && (
            <Text style={styles.username}>{getUserIdWithoutEmail(user)}</Text>
          )}

          <View
            style={[
              styles.messageContainer,
              {
                backgroundColor: isMyMessage() ? colors.white : colors.primary,
                marginLeft: isMyMessage() ? 'auto' : 0,
                marginRight: isMyMessage() ? 0 : 'auto',
              },
            ]}>
            <Text
              style={[
                styles.text,
                {color: isMyMessage() ? colors.black : colors.white},
              ]}>
              {messageInfo.message}
            </Text>

            <Text
              style={[
                styles.time,
                {color: isMyMessage() ? colors.black : colors.white},
              ]}>
              {messageInfo.timestamp
                ? moment(messageInfo.timestamp).fromNow()
                : ''}
            </Text>
          </View>
          {/* {messageInfo.unread && isMyMessage() ? (
            <Text style={{marginLeft: 'auto', marginTop: 5}}>Unread</Text>
          ) : null} */}
        </View>
      ) : (
        <View style={styles.wrapper}>
          {!isMyMessage() && (
            <Text style={[styles.username, {textAlign: 'center'}]}>
              {getUserIdWithoutEmail(user)}
            </Text>
          )}
          <Image
            source={{uri: messageInfo.imageURL}}
            style={styles.imageText}
          />
          <Text
            style={[
              styles.time,
              {alignSelf: 'center', textAlign: 'center', color: colors.black},
            ]}>
            {messageInfo.timestamp
              ? moment(messageInfo.timestamp).fromNow()
              : ''}
          </Text>
        </View>
      )}
    </>
  );
};

export default ChatMessage;
