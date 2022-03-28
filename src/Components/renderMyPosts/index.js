import moment from 'moment';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {auth, db} from '../../../firebase';
import styles from './styles';
import {useState} from 'react';
import Modal from 'react-native-modal';
import {useAuthState} from 'react-firebase-hooks/auth';
import colors from '../../Assets/theme/colors';

const RenderMyPosts = ({item}) => {
  const [user] = useAuthState(auth);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const {
    price,
    writeTitle,
    createAt,
    writeDescription,
    email,
    location,
    username,
    isFinish,
  } = item.data;
  const [modalVisible, setModalVisible] = useState(false);
  const createPostedTime = new Date(
    createAt.seconds * 1000 + createAt.nanoseconds / 1000000,
  );
  const setPriceFormat = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const onLongPress = () => {
    setModalVisible(true);
  };
  const negativeButtonPress = () => {
    setModalVisible(false);
  };
  const deleteButtonPress = async () => {
    if (email === user.email) {
      await db
        .collection('zone')
        .doc(location)
        .collection('posts')
        .doc(item.id)
        .delete();
      setModalVisible(false);
      setIsFinished(false);
      setIsDeleted(true);
      alert('삭제되었습니다.');
    } else {
      alert('잠시후 다시 시도해주세요.');
    }
  };
  const finishButtonPress = async () => {
    if (isFinish === true || isFinished === true) {
      alert(`Finished`);
      return;
    }
    if (email === user.email) {
      await db
        .collection('zone')
        .doc(location)
        .collection('posts')
        .doc(item.id)
        .update({isFinish: true}),
        {merge: true};
      setModalVisible(false);
      setIsFinished(true);
      alert('상태가 변경되었습니다.');
    } else {
      alert('잠시후 다시 시도해주세요.');
    }
  };
  return (
    <>
      <TouchableOpacity onLongPress={onLongPress} disabled={isDeleted}>
        <View
          style={[
            styles.wrapper,
            {backgroundColor: !isDeleted ? colors.white : colors.gray},
          ]}>
          {isDeleted && (
            <View style={styles.deletedWrapper}>
              <Text style={styles.isDeleted}>삭제됨</Text>
            </View>
          )}
          {isFinish && (
            <View style={styles.finishedWrapper}>
              <Text style={styles.isFinished}>종료됨</Text>
            </View>
          )}
          {isFinished && (
            <View style={styles.finishedWrapper}>
              <Text style={styles.isFinished}>종료됨</Text>
            </View>
          )}
          <Text style={styles.title}>{writeTitle}</Text>
          <View style={styles.priceAndTime}>
            <Text style={styles.price}>{setPriceFormat(price)}원</Text>
            <Text style={styles.timestamp}>
              {moment(createPostedTime).fromNow()}
            </Text>
          </View>
          <Text style={styles.description}>{writeDescription}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationInTiming={1}
        animationOutTiming={1}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            <TouchableOpacity
              onPress={deleteButtonPress}
              style={styles.deleteButton}>
              <Text style={styles.deleteText}>삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={finishButtonPress}
              style={styles.finishButton}>
              <Text style={styles.finishText}>종료</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={negativeButtonPress}
              style={styles.cancelButton}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RenderMyPosts;
