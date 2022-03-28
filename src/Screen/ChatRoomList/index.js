import React, {useCallback, useState, useEffect, useContext} from 'react';
import ChatList from '../../Components/ChatList';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore';
import {auth, db} from '../../../firebase';
import {FlatList, View, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {GlobalContext} from '../../Context/GlobalProvider';
import {BADGE_RESET} from '../../Constants/actionTypes';

const ChatRoomList = () => {
  const [user] = useAuthState(auth);
  if (!user || !user.email) return;
  const {badgeStateDispatch} = useContext(GlobalContext);
  const renderItem = useCallback(({item}) => <ChatList item={item} />, []);
  const keyExtractor = useCallback(item => item.id, []);
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user.email);
  const [chatsSnapshot] = useCollection(userChatRef);
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    const chatData = new Array();
    chatsSnapshot?.docs.map(chat => {
      chatData.push({
        id: chat.id,
        users: chat.data().users,
        uid: chat.data().Uid,
      });
    });
    setChatList(chatData);
  }, [chatsSnapshot]);
  useFocusEffect(
    React.useCallback(() => {
      badgeStateDispatch({type: BADGE_RESET});
    }, []),
  );
  return (
    <>
      {chatList.length > 0 ? (
        <View>
          <FlatList
            data={chatList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            initialNumToRender={7}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            height: '100%',
          }}>
          <Text>메시지가 없습니다.</Text>
        </View>
      )}
    </>
  );
};

export default ChatRoomList;
