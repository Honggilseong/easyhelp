import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Container from '../../Components/common/Container';
import CustomLocationModal from '../../Components/common/CustomLocationModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
const UserSettings = () => {
  const [location, setLocation] = useState(null);
  const [isLand, setIsLand] = useState();
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const onChooseLocation = async () => {
    setLocationModalVisible(true);
  };
  const islandPress = value => {
    setIsLand(value);
  };
  useEffect(() => {
    const customLocation = async () => {
      try {
        await AsyncStorage.setItem('userLocation', location, () => {
          alert('기본 지역이 변경되었습니다.');
        });
        return;
      } catch (e) {
        alert('잠시후 다시 시도해주세요.');
        return;
      }
    };
    if (location !== null) {
      customLocation();
    }
  }, [location]);
  return (
    <>
      <Container>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            onChooseLocation();
          }}>
          <Text>홈 화면 지역선택</Text>
        </TouchableOpacity>
      </Container>
      <CustomLocationModal
        islandPress={islandPress}
        setIsVisible={setLocationModalVisible}
        isVisible={locationModalVisible}
        island={isLand}
        setLocationSelect={setLocation}
        reset
      />
    </>
  );
};

export default UserSettings;
