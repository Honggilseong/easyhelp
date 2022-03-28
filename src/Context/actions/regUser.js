import {auth, db} from '../../../firebase';
import {
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from '../../Constants/actionTypes';
import messaging from '@react-native-firebase/messaging';
export default ({email, username, password, phone}) =>
  async dispatch => {
    dispatch({
      type: REGISTER_LOADING,
    });
    try {
      const createUser = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      await createUser.user.updateProfile({
        displayName: username,
      });
      const token = await messaging().getToken();
      await db
        .collection('users')
        .doc(createUser.user.uid)
        .set({
          email: email,
          fcmTokens: token,
          createAt: new Date(),
          blockedUsers: [],
          hasChatWith: [],
          recommendedUsers: [],
          displayName: username,
          lastSeen: new Date(),
          phone: phone,
          recommends: {
            매너: 3,
            시간약속: 3,
            신뢰: 3,
            책임감: 3,
            친절함: 3,
          },
        });
      dispatch({type: REGISTER_SUCCESS});
    } catch (e) {
      alert(e);
      dispatch({type: REGISTER_FAIL});
    }
  };
