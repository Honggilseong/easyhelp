import React, {useEffect, useState} from 'react';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {
  HOME,
  HOMENAVI,
  MESSAGEROOM,
  NOTICES,
  WRITEPOST,
} from '../Constants/routeNames';
import Home from '../Screen/Home';
import WritePost from '../Screen/WritePost';
import MessageRoom from '../Screen/MessageRoom';
import colors from '../Assets/theme/colors';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import CustomModal from '../Components/common/CustomModal';
import {auth, db} from '../../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import HomeNavi from '../Screen/HomeNavi';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Notices from '../Screen/Notices';
const HomeStack = createStackNavigator();
const HomeStackNavi = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [user] = useAuthState(auth);
  const [blockUser, setBlockUser] = useState();
  const {navigate} = useNavigation();
  const setTabBarVisible = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? HOMENAVI;
    const hideOnScreens = [WRITEPOST, MESSAGEROOM, HOMENAVI, NOTICES];
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
    setModalVisible(true);
    setBlockUser(blockEmail);
  };
  const negativeButtonPress = () => {
    setModalVisible(false);
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
      alert('차단되었습니다.');
      setModalVisible(false);
    } catch (e) {
      alert('실패했습니다. 잠시후 다시 시도해주세요.');
      await db.collection('errorLogs').add({
        homeStackNavi: e,
      });
    }
  };
  return (
    <>
      <HomeStack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: colors.primary},
          headerTintColor: colors.white,
          headerTitleAlign: 'left',
        }}>
        <HomeStack.Screen
          name={HOMENAVI}
          component={HomeNavi}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name={HOME}
          component={Home}
          options={{
            headerLeft: null,
            headerRight: () => (
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => navigate(WRITEPOST)}>
                <AntDesign name="plussquareo" size={30} color="#fff" />
              </TouchableOpacity>
            ),
            title: 'HOME',
          }}
        />
        <HomeStack.Screen
          name={WRITEPOST}
          component={WritePost}
          options={{
            title: '글작성',
            headerLeft: () => (
              <HeaderBackButton
                tintColor="#fff"
                onPress={() => {
                  navigate(HOME);
                }}
              />
            ),
          }}
        />
        <HomeStack.Screen
          name={MESSAGEROOM}
          component={MessageRoom}
          options={({route}) => ({
            title: route.params.recipientEmail.substring(
              0,
              route.params.recipientEmail.lastIndexOf('@'),
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => onUserPress(route.params.recipientEmail)}
                hitSlop={{left: 20, right: 20, top: 10, bottom: 10}}
                style={{marginRight: 10}}>
                <Icon name="ellipsis-v" size={25} color={colors.white} />
              </TouchableOpacity>
            ),
          })}
        />
        <HomeStack.Screen
          name={NOTICES}
          component={Notices}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
      <CustomModal
        negativeButton="취소"
        positiveButton="차단"
        negativeButtonPress={negativeButtonPress}
        positiveButtonPress={positiveButtonPress}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title="이 유저를 차단하시겠습니까?"
        description="차단 후에 채팅방을 나가야 더 이상 메시지를 받지 않습니다."
      />
    </>
  );
};

export default HomeStackNavi;
