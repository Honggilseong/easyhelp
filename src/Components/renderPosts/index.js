import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {View, Text, TouchableOpacity, Touchable} from 'react-native';
import {auth, db} from '../../../firebase';
import {MESSAGEROOM} from '../../Constants/routeNames';
import getUserIdWithoutEmail from '../../Utils/getUserIdWithoutEmail';
import CustomButton from '../common/CustomButton';
import styles from './styles';
import firebase from 'firebase';
import CustomModal from '../common/CustomModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../Assets/theme/colors';
import LoadingModal from '../common/LoadingModal';
import Modal from 'react-native-modal';
import UserChart from '../UserChart';

const RenderPosts = ({item}) => {
  const {
    price,
    writeTitle,
    createAt,
    writeDescription,
    email,
    neighborhood,
    location,
    username,
    isFinish,
    userUid,
  } = item.data;
  const [user] = useAuthState(auth);
  const {navigate} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [postInfoModal, setPostInfoModal] = useState(false);
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [graphData, setGraphData] = useState(null);
  const createPostedTime = new Date(
    createAt.seconds * 1000 + createAt.nanoseconds / 1000000,
  );
  const setPriceFormat = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const onMessageButtonClick = async () => {
    setModalVisible(true);
  };
  const messageNegativeButtonPress = () => {
    setModalVisible(false);
  };
  const messagePositiveButtonPress = async () => {
    setModalVisible(false);
    if (user.email === email) {
      alert('내 게시물입니다.');

      return;
    }

    setLoadingText('차단 확인 중');

    if (Platform.OS === 'android') {
      setLoadingModalVisible(true);
    }
    // const amIBlockedRef = db
    //   .collection('users')
    //   .where('email', '==', email)
    //   .where('blockedUsers', 'array-contains', user.email);
    const anotherUserQuery = await db.collection('users').doc(userUid).get();
    const blockUsers = await anotherUserQuery.data()?.blockedUsers;
    const amIBlocked = !!blockUsers.filter(block => block === user.email)[0];
    console.log(amIBlocked);
    if (amIBlocked === true) {
      alert('상대방이 차단하였습니다.');
      setLoadingModalVisible(false);
      return;
    }
    setLoadingText('채팅방 확인 중');
    // const checkBlock = (await amIBlockedRef?.get()).size;
    // if (checkBlock > 0) {
    //   alert('죄송합니다 차단되었습니다.');
    //   setModalVisible(false);
    //   return;
    // }
    // const userChatRef = db
    //   .collection('users')
    //   .where('email', '==', user.email)
    //   .where('hasChatWith', 'array-contains', email);

    // const chatExist = (await userChatRef?.get()).size;
    const currentUserData = await db.collection('users').doc(user.uid).get();
    const currentUserHasChat = await currentUserData.data().hasChatWith;
    const checkChatRoomExist = !!currentUserHasChat.filter(
      user => user === email,
    )[0];
    if (checkChatRoomExist === true) {
      alert(`이미 채팅방이 있습니다 유저이름: ${getUserIdWithoutEmail(email)}`);
      setLoadingModalVisible(false);
      return;
    }
    setLoadingText('채팅방 생성 중');
    await db
      .collection('users')
      .doc(user.uid)
      .update({hasChatWith: firebase.firestore.FieldValue.arrayUnion(email)});
    await db
      .collection('users')
      .doc(userUid)
      .update({
        hasChatWith: firebase.firestore.FieldValue.arrayUnion(user.email),
      });
    await db
      .collection('chats')
      .add({
        users: [user.email, email],
        exist: [user.email, email],
        Uid: [user.uid, userUid],
      })
      .then(doc => {
        navigate(MESSAGEROOM, {id: doc.id, recipientEmail: email, userUid});
      });
    setLoadingModalVisible(false);
  };
  const reportNegativeButtonPress = () => {
    setReportModalVisible(false);
  };
  const reportPositiveButtonPress = async () => {
    if (email === user.email) return alert('자신의 게시물입니다.');
    try {
      const postQuery = await db
        .collection('zone')
        .doc(location)
        .collection('posts')
        .doc(item.id)
        .get();

      await db.collection('reportLogs').doc().set({
        byUser: user.email,
        gotReportedUser: email,
      });
      const alreadyReport = await postQuery.data()?.reportUsers;
      const alreadyReportCheck = !!alreadyReport?.filter(
        userExist => userExist === user.uid,
      )[0];
      if (alreadyReportCheck === true) return alert('이미 신고하셨습니다.');
      await db
        .collection('zone')
        .doc(location)
        .collection('posts')
        .doc(item.id)
        .update({
          reportCount: firebase.firestore.FieldValue.increment(+1),
          reportUsers: firebase.firestore.FieldValue.arrayUnion(user.uid),
        });
      setReportModalVisible(false);
      alert('이 게시글이 신고되었습니다.');
      return;
    } catch (e) {
      alert('잠시후에 시도해주세요.');
      await db.collection('errorLogs').doc().set({
        renderPosts: e,
      });
      return;
    }
  };
  const pressInfoPost = () => {
    setPostInfoModal(true);
  };
  const pressReportPost = () => {
    setPostInfoModal(false);
    setTimeout(
      () => setReportModalVisible(true),
      Platform.OS === 'ios' ? 1000 : 0,
    );
  };
  const onUserInfo = async () => {
    setPostInfoModal(false);
    if (email === user.email) return alert('내 게시물입니다.');
    try {
      const graphBar = new Array();
      const anotherUserQuery = await db.collection('users').doc(userUid).get();
      const userGraphData = await anotherUserQuery.data().recommends;
      console.log(userGraphData);

      for (const [key, value] of Object.entries(userGraphData)) {
        graphBar.push({x: key, y: value > 25 ? 25 : value});
      }
      console.log(graphBar);
      setGraphData(graphBar);
      setTimeout(
        () => setUserInfoModal(true),
        Platform.OS === 'ios' ? 1000 : 0,
      );
      return;
    } catch (e) {
      alert('잠시후에 다시 시도해주세요.');
      await db.collection('errorLogs').doc().set({
        renderPosts: e,
      });
      return;
    }
  };
  return (
    <>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{writeTitle}</Text>
        <Text style={styles.neighborhood}>{neighborhood}</Text>
        <View style={styles.priceAndTime}>
          <Text style={styles.price}>{setPriceFormat(price)}원</Text>
          <Text style={styles.timestamp}>
            {moment(createPostedTime).fromNow()}
          </Text>
        </View>
        <Text style={styles.description}>{writeDescription}</Text>

        <View style={styles.aboveMessage}></View>
        <View style={styles.messageAndReport}>
          {isFinish ? (
            <CustomButton style={{flex: 1}} title="Finished" grey />
          ) : (
            <CustomButton
              style={{flex: 1}}
              green
              title="메시지"
              onPress={() => onMessageButtonClick()}
            />
          )}
          <TouchableOpacity
            style={{
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              height: 42,
              backgroundColor: colors.primary,
              borderRadius: 5,
            }}
            onPress={() => {
              pressInfoPost();
            }}>
            <MaterialIcons name="info-outline" size={25} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <CustomModal
        negativeButton="취소"
        positiveButton="만들기"
        negativeButtonPress={messageNegativeButtonPress}
        positiveButtonPress={messagePositiveButtonPress}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title="채팅방 만들기"
        description="방을 만들면 상대방도 채팅방이 만들어집니다 계속하시겠습니까?"
      />
      <Modal
        isVisible={postInfoModal}
        onBackdropPress={() => setPostInfoModal(false)}>
        <View style={styles.userModalContainer}>
          <TouchableOpacity
            style={styles.infoContainer}
            onPress={() => onUserInfo()}>
            <Text style={styles.userModalText}>유저 정보</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.blockContainer}
            onPress={() => pressReportPost()}>
            <Text style={styles.userModalText}>게시물 신고</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelContainer}
            onPress={() => {
              setPostInfoModal(false);
            }}>
            <Text style={styles.userModalText}>취소</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={userInfoModal}
        onBackdropPress={() => setUserInfoModal(false)}>
        <View style={styles.userInfoModalContainer}>
          <View style={styles.userInfoWrapper}>
            <Text style={styles.userNameText}>
              {getUserIdWithoutEmail(email)}
            </Text>
            <UserChart height={400} width={250} data={graphData} />
          </View>
          <View style={styles.userInfoButtonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setUserInfoModal(false);
              }}>
              <Text style={styles.cancelButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <CustomModal
        negativeButton="취소"
        positiveButton="신고"
        negativeButtonPress={reportNegativeButtonPress}
        positiveButtonPress={reportPositiveButtonPress}
        setModalVisible={setReportModalVisible}
        modalVisible={reportModalVisible}
        title="신고"
        description="이 게시물을 신고하시겠습니까?"
      />
      <LoadingModal
        modalVisible={loadingModalVisible}
        setModalVisible={setLoadingModalVisible}
        loadingText={loadingText}
      />
    </>
  );
};

export default RenderPosts;
