import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';
import {NOTICES} from '../../Constants/routeNames';
const Notice = () => {
  const {navigate} = useNavigation();
  const onNoticePress = data => {
    navigate(NOTICES, {notice: data});
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => {
          const noticeData = {
            title: '안녕하세요 이지헬프입니다.',
            date: '21-12-11',
            description:
              '안녕하세요 이지헬프입니다. 저희 앱을 다운해주셔서 감사드립니다. 사용중에 불편사항이나 개선사항은 easyhelpsp@gmail.com 또는 인스타그램 easyhelpsp으로 연락주시면 정말 감사하겠습니다.',
          };
          onNoticePress(noticeData);
        }}
        style={styles.noticeContainer}>
        <Text style={styles.noticeTitle}>안녕하세요 이지헬프입니다.</Text>
        <Text>21-12-11</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Notice;
