import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  QNA,
  BLOCK_USERS,
  DELETE_ACCOUNT,
  MYPOSTS,
  PROFILE,
  USER_INFO,
  USER_SETTINGS,
  NOTICE,
  NOTICES,
} from '../Constants/routeNames';
import Profile from '../Screen/Profile';
import MyPosts from '../Screen/MyPosts';
import colors from '../Assets/theme/colors';
import UserInfo from '../Screen/UserInfo';
import UserSettings from '../Screen/UserSettings';
import QnA from '../Screen/QnA';
import BlockUsers from '../Screen/BlockUsers';
import DeleteAccount from '../Screen/DeleteAccount';
import Notice from '../Screen/Notice';
import Notices from '../Screen/Notices';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const ProfileStack = createStackNavigator();
const ProfileStackNavi = ({navigation, route}) => {
  const setTabBarVisible = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = [NOTICES];
    if (hideOnScreens.indexOf(routeName) > -1) {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  };
  useEffect(() => {
    setTabBarVisible(route);
  }, [route]);
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.primary},
        headerTintColor: colors.white,
        headerTitleAlign: 'left',
      }}>
      <ProfileStack.Screen
        name={PROFILE}
        component={Profile}
        options={{title: '프로필'}}
      />
      <ProfileStack.Screen
        name={MYPOSTS}
        component={MyPosts}
        options={{title: '내 게시글'}}
      />
      <ProfileStack.Screen
        name={USER_INFO}
        component={UserInfo}
        options={{title: '유저정보'}}
      />
      <ProfileStack.Screen
        name={NOTICE}
        component={Notice}
        options={{title: '공지사항'}}
      />
      <ProfileStack.Screen
        name={USER_SETTINGS}
        component={UserSettings}
        options={{title: '유저 세팅'}}
      />
      <ProfileStack.Screen
        name={QNA}
        component={QnA}
        options={{title: 'QnA'}}
      />
      <ProfileStack.Screen
        name={BLOCK_USERS}
        component={BlockUsers}
        options={{title: '차단된 유저'}}
      />
      <ProfileStack.Screen
        name={DELETE_ACCOUNT}
        component={DeleteAccount}
        options={{title: '계정삭제'}}
      />
      <ProfileStack.Screen
        name={NOTICES}
        component={Notices}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavi;
