import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {View, Text, TextInput} from 'react-native';
import {auth, db} from '../../../firebase';
import CustomButton from '../../Components/common/CustomButton';
import styles from './styles';
import firebase from 'firebase';
const DeleteAccount = () => {
  const [listReasons, setListReasons] = useState('이유를 선택해주세요.');
  const [anotherReason, setAnotherReason] = useState(null);
  const [user] = useAuthState(auth);
  const deleteAccountButton = async () => {
    if (listReasons === '이유를 선택해주세요.') {
      alert('이유를 선택해주세요.');
    } else if (anotherReason === null) {
      // const userDataQuery = db
      //   .collection('users')
      //   .where('email', '==', user.email);
      // await userDataQuery
      //   .get()
      //   .then(query => query.forEach(doc => doc.ref.delete()));
      await db
        .collection('deleteReasons')
        .doc()
        .set({
          reasons: firebase.firestore.FieldValue.arrayUnion(listReasons),
        });
      try {
        await user.delete();
      } catch (e) {
        alert('로그인을 다시 하신후에 진행해주세요.');
        return;
      }
      alert('앱을 사용해주셔서 감사합니다.');
    } else if (anotherReason !== null) {
      // const userDataQuery = db
      //   .collection('users')
      //   .where('email', '==', user.email);
      // await userDataQuery
      //   .get()
      //   .then(query => query.forEach(doc => doc.ref.delete()));
      await db
        .collection('deleteReasons')
        .doc()
        .set({
          reasons: firebase.firestore.FieldValue.arrayUnion(anotherReason),
        });
      try {
        await user.delete();
      } catch (e) {
        alert('로그인을 다시 하신후에 진행해주세요.');
        return;
      }
      alert('앱을 사용해주셔서 감사합니다.');
    }
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleText}>계정을 삭제하시겠습니까?</Text>
      <Text style={styles.mainText}>삭제하면 복구할 수 없습니다.</Text>
      <Text style={styles.reasonText}>정말로 진행하시겠습니까?</Text>
      <Picker
        selectedValue={listReasons}
        onValueChange={value => {
          setListReasons(value);
          setAnotherReason(null);
        }}>
        <Picker.Item
          label="이유를 선택해주세요."
          value="이유를 선택해주세요."
        />
        <Picker.Item label="앱이 필요없어서." value="앱이 필요없어서." />
        <Picker.Item
          label="이미 아이디가 있어서."
          value="이미 아이디가 있어서."
        />
        <Picker.Item
          label="비매너 유저를 만나서."
          value="비매너 유저를 만나서."
        />
        <Picker.Item label="다른이유" value="다른이유" />
      </Picker>
      {listReasons === '다른이유' && (
        <TextInput
          placeholder="더 나은 서비스를 위해 이유를 적어주세요."
          onChangeText={value => {
            setAnotherReason(value);
          }}
        />
      )}
      <CustomButton red title="삭제" onPress={deleteAccountButton} />
    </View>
  );
};

export default DeleteAccount;
