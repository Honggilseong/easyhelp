import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {HOME, NOTICES, WRITEPOST} from '../../Constants/routeNames';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../Assets/theme/colors';
const HomeNavi = () => {
  const {navigate} = useNavigation();
  const onNoticePress = data => {
    navigate(NOTICES, {notice: data});
  };
  return (
    <View>
      <View>
        <Image
          source={require('../../Assets/images/logo.png')}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.noticeContainer}>
        <Text style={styles.noticeText}>최신 공지사항</Text>
        <View style={styles.noticesWrapper}>
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
            style={styles.noticeTextWrapper}>
            <Text numberOfLines={1} style={styles.noticeTitle}>
              안녕하세요 이지헬프입니다.
            </Text>
            <Text>21-12-11</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => onNoticePress()}
            style={styles.noticeTextWrapper}>
            <Text numberOfLines={1} style={styles.noticeTitle}>
              오늘의 공지사항 입니다.
            </Text>
            <Text>21-12-09</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={() => navigate(HOME)}
          style={[styles.iconWrapper, {marginRight: 20}]}>
          <Entypo name="home" size={60} color={colors.green} />
          <Text style={styles.text}>도움 글 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate(WRITEPOST)}
          style={styles.iconWrapper}>
          <AntDesign name="plussquareo" size={60} color={colors.green} />

          <Text style={styles.text}>도움 글 작성</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeNavi;
