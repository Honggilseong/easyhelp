import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {View, Text} from 'react-native';
import {auth, db} from '../../../firebase';
import ProfileSetting from '../../Components/common/ProfileSetting';
import {LOGOUT_USER} from '../../Constants/actionTypes';
import {BLOCK_USERS, DELETE_ACCOUNT} from '../../Constants/routeNames';
import {GlobalContext} from '../../Context/GlobalProvider';

const UserInfo = () => {
  const {authDispatch} = useContext(GlobalContext);
  const [user] = useAuthState(auth);
  const {navigate} = useNavigation();
  const userTokenDeleteQuery = db
    .collection('users')
    .where('email', '==', user.email);
  const SignOut = async () => {
    await userTokenDeleteQuery.get().then(doc => {
      doc.forEach(data => {
        data.ref.update({fcmTokens: ''});
      });
    });
    await auth.signOut();
    authDispatch({type: LOGOUT_USER});
  };

  const getNavigate = name => {
    navigate(name);
  };
  return (
    <View>
      <ProfileSetting
        blocked
        text="차단된 유저"
        onPress={() => getNavigate(BLOCK_USERS)}
      />
      <ProfileSetting logout text="로그아웃" onPress={() => SignOut()} />
      <ProfileSetting
        deleteUser
        text="계정삭제"
        onPress={() => getNavigate(DELETE_ACCOUNT)}
      />
    </View>
  );
};

export default UserInfo;
