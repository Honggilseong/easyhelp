import {auth, db} from '../../../firebase';
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../../Constants/actionTypes';
import messaging from '@react-native-firebase/messaging';
export default ({email, password, errors, setErrors}) =>
  async dispatch => {
    dispatch({
      type: LOGIN_LOADING,
    });
    try {
      const loginUser = await auth.signInWithEmailAndPassword(email, password);
      // await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log(loginUser.user);
      await db.collection('users').doc(loginUser.user.uid).set(
        {
          lastLoggedIn: new Date(),
          fcmTokens: token,
        },
        {merge: true},
      );
      dispatch({type: LOGIN_SUCCESS, payload: loginUser.user});
    } catch (e) {
      setErrors({
        valid: '이메일 또는 비밀번호가 틀렸습니다.',
      });
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
