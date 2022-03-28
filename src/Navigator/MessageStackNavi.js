import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {CHATROOMLIST, MESSAGEROOM} from '../Constants/routeNames';
import ChatRoomList from '../Screen/ChatRoomList';
import MessageRoom from '../Screen/MessageRoom';
import colors from '../Assets/theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, View, Text, Platform} from 'react-native';
import CustomModal from '../Components/common/CustomModal';
import getUserIdWithoutEmail from '../Utils/getUserIdWithoutEmail';
import {auth, db} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import Modal from 'react-native-modal';
import styles from './messagestyle';
import UserChart from '../Components/UserChart';
import RecommendModal from '../Components/RecommendModal';

const MessageStack = createStackNavigator();

const MessageStackNavi = ({navigation, route}) => {
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [userProfileModal, setUserProfileModal] = useState(false);
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [anotherUserInfo, setAnotherUserInfo] = useState({});
  const [recommendClick, setRecommendClick] = useState(null);
  const [graphData, setGraphData] = useState();
  const [user] = useAuthState(auth);
  const [blockUser, setBlockUser] = useState(null);

  const setTabBarVisible = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = [MESSAGEROOM];
    if (hideOnScreens.indexOf(routeName) > -1) {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  };
  useEffect(() => {
    setTabBarVisible(route);
  }, [route]);
  const onUserPress = blockEmail => {
    setUserProfileModal(true);
    setBlockUser(blockEmail);
  };
  const onBlockUser = () => {
    setUserProfileModal(false);
    setTimeout(
      () => setBlockModalVisible(true),
      Platform.OS === 'ios' ? 1000 : 0,
    );
  };
  const negativeButtonPress = () => {
    setBlockModalVisible(false);
    setBlockUser(null);
  };
  const positiveButtonPress = async () => {
    try {
      await db
        .collection('users')
        .doc(user.uid)
        .update(
          {blockedUsers: firebase.firestore.FieldValue.arrayUnion(blockUser)},
          {merge: true},
        );
      alert('차단 되었습니다.');
      setBlockModalVisible(false);
      setBlockUser(null);
      return;
    } catch (e) {
      alert('잠시후에 다시 시도해 주세요.');
      await db.collection('errorLogs').add({
        messageStackNavi: e,
      });
      return;
    }
  };
  const onUserInfo = async () => {
    setUserProfileModal(false);
    const filterAnotherUserUid = anotherUserInfo.uid?.filter(
      userUid => userUid !== user.uid,
    )[0];
    try {
      const graphBar = new Array();
      const anotherUserQuery = await db
        .collection('users')
        .doc(filterAnotherUserUid)
        .get();
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
      alert('잠시후에 다시 시도해 주세요.');
      await db.collection('errorLogs').add({
        messageStackNavi: e,
      });
      return;
    }
  };
  useEffect(() => {
    console.log(graphData);
    console.log(recommendClick);
  }, [graphData, recommendClick]);
  const onUserRecommendButton = itemName => {
    setRecommendClick(itemName);
  };
  const onRecommendDoneButton = async () => {
    if (recommendClick === null) {
      alert('추천 항목이 없습니다.');
      return;
    }
    const filterAnotherUserUid = anotherUserInfo.uid?.filter(
      userUid => userUid !== user.uid,
    )[0];

    try {
      const currentUserQuery = await db.collection('users').doc(user.uid).get();
      const currentUserData = await currentUserQuery.data()?.recommendedUsers;
      const alreadyRecommend = !!currentUserData?.filter(
        userUid => userUid === filterAnotherUserUid,
      )[0];

      if (alreadyRecommend === true) {
        alert('이미 이 유저를 추천 하셨습니다.');
        return;
      } else {
        await db
          .collection('users')
          .doc(user.uid)
          .update({
            recommendedUsers:
              firebase.firestore.FieldValue.arrayUnion(filterAnotherUserUid),
          });
        await db
          .collection('users')
          .doc(filterAnotherUserUid)
          .update({
            [`recommends.${recommendClick}`]:
              firebase.firestore.FieldValue.increment(1),
          });
        alert('추천했습니다.');
        setRecommendClick(null);
        return;
      }
    } catch (e) {
      alert('잠시후에 다시 시도해 주세요.');
      await db.collection('errorLogs').add({
        messageStackNavi: e,
      });
    }
  };
  return (
    <>
      <MessageStack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: colors.primary},
          headerTintColor: colors.white,
          headerTitleAlign: 'left',
        }}>
        <MessageStack.Screen
          name={CHATROOMLIST}
          component={ChatRoomList}
          options={{title: '메시지 함'}}
        />
        <MessageStack.Screen
          name={MESSAGEROOM}
          component={MessageRoom}
          contentContainerStyle={{flex: 1}}
          options={({route}) => ({
            title: getUserIdWithoutEmail(route.params.recipientEmail),
            headerRight: () => (
              <TouchableOpacity
                disabled={
                  route.params.recipientEmail === '상대방이 나갔습니다.'
                    ? true
                    : false
                }
                onPress={() => {
                  const {recipientEmail, uid} = route.params;
                  onUserPress(recipientEmail);
                  setAnotherUserInfo({
                    name: getUserIdWithoutEmail(recipientEmail),
                    uid,
                  });
                }}
                hitSlop={{left: 20, right: 20, top: 10, bottom: 10}}
                style={{marginRight: 10}}>
                <Icon name="ellipsis-v" size={25} color={colors.white} />
              </TouchableOpacity>
            ),
          })}
        />
      </MessageStack.Navigator>
      <Modal
        isVisible={userProfileModal}
        onBackdropPress={() => setUserProfileModal(false)}>
        <View style={styles.userModalContainer}>
          <TouchableOpacity
            style={styles.infoContainer}
            onPress={() => onUserInfo()}>
            <Text style={styles.userModalText}>유저 정보</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.blockContainer}
            onPress={() => onBlockUser()}>
            <Text style={styles.userModalText}>유저 차단</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelContainer}
            onPress={() => {
              setUserProfileModal(false);
              setBlockUser(null);
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
            <Text style={styles.userNameText}>{anotherUserInfo.name}</Text>
            <UserChart height={400} width={250} data={graphData} />
            <View style={styles.recommendButtonContainer}>
              <RecommendModal
                recommendClick={recommendClick}
                onUserRecommendButton={onUserRecommendButton}
              />
            </View>
          </View>
          <View style={styles.userInfoButtonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setUserInfoModal(false);
                setRecommendClick(null);
              }}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => onRecommendDoneButton()}>
              <Text style={styles.doneButtonText}>추천</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <CustomModal
        negativeButton="취소"
        positiveButton="차단"
        negativeButtonPress={negativeButtonPress}
        positiveButtonPress={positiveButtonPress}
        setModalVisible={setBlockModalVisible}
        modalVisible={blockModalVisible}
        title="이 유저를 차단하시겠습니까?"
        description="차단 후에 채팅방을 나가야 더 이상 메시지를 받지 않습니다."
      />
    </>
  );
};

export default MessageStackNavi;
