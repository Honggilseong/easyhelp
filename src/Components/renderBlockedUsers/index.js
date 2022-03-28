import React, {useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {View, Text, TouchableOpacity} from 'react-native';
import {auth, db} from '../../../firebase';
import getUserIdWithoutEmail from '../../Utils/getUserIdWithoutEmail';
import styles from './styles';
import firebase from 'firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../Assets/theme/colors';
const RenderBlockedUsers = ({item}) => {
  const {email} = item;
  const [user] = useAuthState(auth);
  const [isClicked, setIsClicked] = useState(false);
  const userQuery = db.collection('users').doc(user.uid);
  const onBlockedUserClick = async () => {
    try {
      await userQuery?.update({
        blockedUsers: firebase.firestore.FieldValue.arrayRemove(email),
      });
      setIsClicked(true);
      return;
    } catch (e) {
      alert('잠시후 다시 시도해주세요.');
      await db.collection('errorLogs').doc().set({
        renderBlockedUsers: e,
      });
      return;
    }
  };
  return (
    <>
      {email && (
        <View
          style={[
            styles.wrapper,
            {backgroundColor: !isClicked ? colors.white : colors.gray},
          ]}>
          <Text style={styles.emailStyle}>{getUserIdWithoutEmail(email)}</Text>
          {isClicked && (
            <View style={styles.clickedWrapper}>
              <Text style={styles.isClicked}>제거됨</Text>
            </View>
          )}
          <TouchableOpacity onPress={onBlockedUserClick} disabled={isClicked}>
            <AntDesign name="close" size={25} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default RenderBlockedUsers;
