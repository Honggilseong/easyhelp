import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useCallback, useState, useEffect} from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {db, auth, storage} from '../../../firebase';
import ChatMessage from '../../Components/ChatMessage';
import styles from './styles';
import {useAuthState} from 'react-firebase-hooks/auth';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useHeaderHeight} from '@react-navigation/stack';

const MessageRoom = () => {
  const route = useRoute();
  const {id, chat, messages, recipientEmail} = route.params;
  const [messagesList, setMessagesList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [imageURI, setImageURI] = useState(null);
  const [startAt, setStartAt] = useState();
  const [checkMessage, setCheckMessage] = useState(false);
  const [lastPost, setLastPost] = useState(false);
  const [isGetMessagesLoading, setIsGetMessagesLoading] = useState(false);
  const renderItem = useCallback(({item}) => <ChatMessage item={item} />, []);
  const keyExtractor = useCallback(item => item.id, []);
  const [user] = useAuthState(auth);
  const messageLimit = 10;
  const headerHeight = useHeaderHeight();
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(id)
      ?.collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(1),
  );
  const getUnreadMessagesQuery = db
    .collection('chats')
    .doc(id)
    ?.collection('messages')
    .where('user', '==', recipientEmail)
    .where('unread', '==', true)
    .get();
  const getNewMessage = () => {
    const newMessage = {
      id: messagesSnapshot?.docs[0].id,
      user: messagesSnapshot?.docs[0].data().user,
      messageInfo: {
        ...messagesSnapshot?.docs[0].data(),
        timestamp: messagesSnapshot?.docs[0]
          .data()
          .timestamp?.toDate()
          .getTime(),
      },
    };
    setMessagesList([newMessage, ...messagesList]);
  };
  const sendMessage = async () => {
    if (!inputValue) return;
    try {
      await db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .add({
          timestamp: new Date(),
          message: inputValue,
          user: user.email,
          username: user.displayName,
          sendTo: recipientEmail,
          unread: true,
        });
      setInputValue('');
    } catch (e) {
      alert('메시지 전송에 실패했습니다. 잠시후 다시 시도해주세요.');
      await db.collection('errorLogs').doc().set({
        messageRoom: e,
      });
    }
  };
  const onSelectPhoto = async () => {
    try {
      await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      }).then(image => {
        const imageData = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImageURI(imageData);
        console.log(imageData);
      });
    } catch (e) {
      alert('불러오는데 실패했습니다.');
    }
  };

  const getMoreMessages = async () => {
    if (lastPost === false && startAt !== undefined) {
      setIsGetMessagesLoading(true);
      try {
        const query = await db
          .collection('chats')
          .doc(id)
          .collection('messages')
          .orderBy('timestamp', 'desc')
          .startAfter(startAt)
          .limit(messageLimit)
          .get();
        const messages = query.docs.map(message => ({
          id: message.id,
          user: message.data().user,
          messageInfo: {
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          },
        }));
        setStartAt(query.docs[query.docs.length - 1]);
        setMessagesList([...messagesList, ...messages]);
        setIsGetMessagesLoading(false);
        messages.length === 0 ? setLastPost(true) : setLastPost(false);
      } catch (e) {
        alert('불러오지 못 했습니다. 잠시후 다시 시도해주세요.');
        await db.collection('errorLogs').doc().set({
          messageRoom: e,
        });
      }
    }
  };

  const renderFooter = () => {
    if (!isGetMessagesLoading) return true;
    return (
      <ActivityIndicator
        size="large"
        color={'#D83E64'}
        style={{marginBottom: 10}}
      />
    );
  };
  useEffect(() => {
    const showMessages = async () => {
      try {
        const query = await db
          .collection('chats')
          .doc(id)
          .collection('messages')
          ?.orderBy('timestamp', 'desc')
          .limit(messageLimit)
          .get();
        const messages = query.docs.map(message => ({
          id: message.id,
          user: message.data().user,
          messageInfo: {
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          },
        }));
        const start = query?.docs[query?.docs.length - 1];
        console.log(start);
        setStartAt(start);
        setMessagesList(messages);
        setCheckMessage(true);
      } catch (e) {
        alert('불러오지 못 했습니다. 잠시후에 다시 시도해주세요.');
        await db.collection('errorLogs').doc().set({
          messageRoom: e,
        });
      }
    };
    showMessages();
    return () => {
      setStartAt();
      setMessagesList();
      setCheckMessage();
    };
  }, []);
  const uploadImage = async (filepath, foldername) => {
    const response = await fetch(filepath);
    const blob = await response.blob();
    let ref = storage.ref(`${user.email}/${foldername}`);
    try {
      const task = ref.put(blob);
      task.then(async () => {
        const url = await storage
          .ref(`${user.email}/${foldername}`)
          .getDownloadURL();
        await db
          .collection('chats')
          .doc(route.params.id)
          .collection('messages')
          .add({
            timestamp: new Date(),
            imageURL: url,
            user: user.email,
            username: user.displayName,
            sendTo: recipientEmail,
            unread: true,
          });
        setImageURI(null);
        return;
      });
    } catch (e) {
      console.log('MessageRoom >>>', e);
      alert('이미지 전송에 실패했습니다. 잠시후 다시 시도해주세요.');
      await db.collection('errorLogs').doc().set({
        messageRoom: e,
      });
      return;
    }
  };
  useEffect(() => {
    if (imageURI === null) return;
    const file = imageURI;
    let fileName = file.substring(file.lastIndexOf('/') + 1);
    let ext = fileName.split('.').pop();
    let name = fileName.split('.')[0];

    let newName = name + Date.now() + '.' + ext;

    uploadImage(imageURI, newName);
    return;
  }, [imageURI]);
  useFocusEffect(
    React.useCallback(() => {
      const unreadMessageToRead = async () => {
        await getUnreadMessagesQuery?.then(doc => {
          doc.docs.forEach(message => message.ref.update({unread: false}));
        });
      };
      unreadMessageToRead();
      if (checkMessage === true) {
        messagesSnapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            getNewMessage();
          }
        });
      }
    }, [messagesSnapshot]),
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({
        ios: headerHeight + 30,
        android: headerHeight,
      })}
      style={{flex: 1}}>
      <View>
        <View style={styles.flatListMessagesWrapper}>
          <FlatList
            data={messagesList}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            inverted={true}
            ListFooterComponent={renderFooter}
            initialNumToRender={10}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              if (!isGetMessagesLoading && !lastPost) {
                getMoreMessages();
              }
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => onSelectPhoto()}
            style={styles.sendPhoto}>
            <AntDesign name="picture" size={25} />
          </TouchableOpacity>
          <TextInput
            style={styles.messageInput}
            editable={recipientEmail === '상대방이 나갔습니다.' ? false : true}
            placeholder="입력"
            onChangeText={value => {
              setInputValue(value);
            }}
            value={inputValue}
          />
          <TouchableOpacity
            style={styles.sendButton}
            disabled={!inputValue}
            onPress={() => sendMessage()}>
            <Text style={styles.sendText}>전송</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageRoom;
