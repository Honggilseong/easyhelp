import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import moment from 'moment';
import React, {useContext, useState, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {View, Text, TouchableOpacity} from 'react-native';
import {auth, db} from '../../../firebase';
import {MESSAGEROOM} from '../../Constants/routeNames';
import getRecipientEmail from '../../Utils/getRecipientEmail';
import styles from './styles';
import CustomModal from '../common/CustomModal';
import firebase from 'firebase';
import {useCollection} from 'react-firebase-hooks/firestore';
import colors from '../../Assets/theme/colors';
import getUserIdWithoutEmail from '../../Utils/getUserIdWithoutEmail';
import {BADGE_SHOW} from '../../Constants/actionTypes';
import {GlobalContext} from '../../Context/GlobalProvider';

const ChatList = ({item}) => {
  const {id, users, chat, messages, uid} = item;
  const {badgeStateDispatch} = useContext(GlobalContext);
  const {navigate} = useNavigation();
  const [user] = useAuthState(auth);
  const isFocused = useIsFocused();
  const [lastMessage, setLastMessage] = useState(null);
  const [badgeCount, setBadgeCount] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const lastMessageRef = db
    .collection('chats')
    .doc(id)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .limit(1);
  const [lastMessageSnapshot] = useCollection(lastMessageRef);
  const deleteChatRef = db.collection('chats').doc(id);
  const recipientEmail =
    users.length <= 1 ? '상대방이 나갔습니다.' : getRecipientEmail(users, user);
  const unReadMessageQuery = db
    .collection('chats')
    .doc(id)
    .collection('messages')
    ?.where('user', '==', recipientEmail)
    ?.where('unread', '==', true);
  const [unReadMessageToBadge] = useCollection(unReadMessageQuery);
  const userQuery = db.collection('users').doc(user.uid);
  useFocusEffect(
    React.useCallback(() => {
      const getLastMessage = () => {
        lastMessageSnapshot?.docs.forEach(doc => {
          if (doc) {
            setLastMessage(doc.data().message);
            setLastTimestamp(doc.data().timestamp?.toDate().getTime());
          }
        });
      };
      getLastMessage();
    }, [lastMessageSnapshot]),
  );
  useEffect(() => {
    const badgeMessagesCount = unReadMessageToBadge?.size;
    setBadgeCount(badgeMessagesCount);
    if (!isFocused && badgeMessagesCount > 0) {
      badgeStateDispatch({type: BADGE_SHOW});
    }
  }, [unReadMessageToBadge]);
  const onClick = () => {
    navigate(MESSAGEROOM, {id, recipientEmail, chat, messages, uid});
  };
  const onLongPress = () => {
    setModalVisible(true);
  };
  const negativeButtonPress = () => {
    setModalVisible(false);
  };
  const positiveButtonPress = async () => {
    if (users.length <= 1) {
      deleteChatRef.update({
        users: firebase.firestore.FieldValue.arrayRemove(user.email),
      });
      return;
    }
    try {
      const getUsersName = await deleteChatRef
        .get()
        .then(doc => doc.data().exist);
      const getAnotherUser = getUsersName.filter(
        userEmail => userEmail !== user.email,
      )[0];
      const getUsersUid = await deleteChatRef.get().then(doc => doc.data().Uid);
      const getAnotherUserUid = getUsersUid.filter(
        userUid => userUid !== user.uid,
      )[0];
      const getAnotherUserQuery = db.collection('users').doc(getAnotherUserUid);

      await getAnotherUserQuery.update({
        hasChatWith: firebase.firestore.FieldValue.arrayRemove(user.email),
      });
      await userQuery.update({
        hasChatWith: firebase.firestore.FieldValue.arrayRemove(getAnotherUser),
      });
      await deleteChatRef.update({
        users: firebase.firestore.FieldValue.arrayRemove(user.email),
      });
    } catch (e) {
      await db.collection('errorLogs').doc().set({
        chatList: e,
      });
    }
  };
  return (
    <>
      <TouchableOpacity
        style={styles.wrapper}
        onLongPress={() => {
          onLongPress();
        }}
        onPress={() => {
          onClick();
        }}>
        <Text style={styles.recipientEmail}>
          {recipientEmail === '상대방이 나갔습니다.'
            ? '상대방이 나갔습니다.'
            : getUserIdWithoutEmail(recipientEmail)}
        </Text>
        <View style={styles.timestampAndBadgeContainer}>
          <Text style={styles.timestampText}>
            {moment(parseInt(lastTimestamp)).fromNow() !== 'Invalid date'
              ? moment(parseInt(lastTimestamp)).fromNow()
              : null}
          </Text>

          <View
            style={[
              styles.badgeContainer,
              {
                backgroundColor: badgeCount === 0 ? colors.white : colors.red,
              },
            ]}>
            <Text style={[styles.badgeCount]}>
              {badgeCount === 0 ? null : badgeCount}
            </Text>
          </View>
        </View>
        <Text style={styles.lastText}>
          {lastMessage === undefined ? '[Image]' : lastMessage}
        </Text>
      </TouchableOpacity>
      <CustomModal
        negativeButton="취소"
        positiveButton="지우기"
        negativeButtonPress={negativeButtonPress}
        positiveButtonPress={positiveButtonPress}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title="채팅방 지우기"
        description="이 채팅방을 지우시겠습니까?"
      />
    </>
  );
};

export default ChatList;

// export async function getSeverSideProps(context) {
//   const ref = db.collection('chats').doc(context.query.id);

//   const messagesRes = await ref
//     .collection('messages')
//     .orderBy('timestamp', 'asc')
//     .get();

//   const messages = messagesRes.docs
//     .map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     }))
//     .map(messages => ({
//       ...messages,
//       timestamp: messages.timestamp.toData().getTime(),
//     }));

//   const chatRes = await ref.get();
//   const chat = {
//     id: chatRes.id,
//     ...chatRes.data(),
//   };
//   return {
//     props: {
//       messages: JSON.stringify(messages),
//       chat: chat,
//     },
//   };
// }
