import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import Container from '../Container';
import SeoulLocations from '../../../LocationData/SeoulLocation';
import GyeongGilLocations from '../../../LocationData/GyeongGiLocation';
import ModalLocationsButton from '../ModalLocationsButton';
import InCheonLocation from '../../../LocationData/InCheonLocation';
import DaeguLocation from '../../../LocationData/DaeguLocation';
import UlsanLocation from '../../../LocationData/UlsanLocation';
import BusanLocation from '../../../LocationData/BusanLocation';
import GwangJuLocation from '../../../LocationData/GwangJuLocation';
import GangWonDoLocation from '../../../LocationData/GangWonDoLocation';
import DaeJeonLocation from '../../../LocationData/DaeJeonLocation';
import NorthChoongCheongLocation from '../../../LocationData/NorthChoongCheongLocation';
import SouthChoongCheongLocation from '../../../LocationData/SouthChoongCheongLocation';
import NorthGyeongSangLocation from '../../../LocationData/NorthGyeongSangLocation';
import SouthGyeongSangLocation from '../../../LocationData/SouthGyeongSangLocation';
import NorthJeonLaDoLocation from '../../../LocationData/NorthJeonLaDoLocation';
import SouthJeonLaDoLocation from '../../../LocationData/SouthJeonLaDoLocation';
import JejuLocation from '../../../LocationData/JejuLocation';
import SeJongLocation from '../../../LocationData/SeJongLocation';
const CustomLocationModal = ({
  islandPress,
  isVisible,
  setIsVisible,
  island,
  setLocationSelect,
  reset,
}) => {
  const SeoulLocationComponents = SeoulLocations.map((name, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setLocationSelect(name);
        setIsVisible(false);
      }}
      style={styles.locationTouchArea}>
      <Text style={styles.locationTextStyle}>{name}</Text>
    </TouchableOpacity>
  ));
  const GyeongGiLocationComponents = GyeongGilLocations.map((name, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setLocationSelect(name);
        setIsVisible(false);
      }}
      style={styles.locationTouchArea}>
      <Text style={styles.locationTextStyle}>{name}</Text>
    </TouchableOpacity>
  ));
  const InCheonLocationComponents = InCheonLocation.map((name, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setLocationSelect(name);
        setIsVisible(false);
      }}
      style={styles.locationTouchArea}>
      <Text style={styles.locationTextStyle}>{name}</Text>
    </TouchableOpacity>
  ));
  const DaeguLocationComponents = DaeguLocation.map((name, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setLocationSelect(name);
        setIsVisible(false);
      }}
      style={styles.locationTouchArea}>
      <Text style={styles.locationTextStyle}>{name}</Text>
    </TouchableOpacity>
  ));
  const UlsanLocationComponents = UlsanLocation.map((name, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setLocationSelect(name);
        setIsVisible(false);
      }}
      style={styles.locationTouchArea}>
      <Text style={styles.locationTextStyle}>{name}</Text>
    </TouchableOpacity>
  ));
  const BusanLocationComponents = BusanLocation.map((name, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setLocationSelect(name);
        setIsVisible(false);
      }}
      style={styles.locationTouchArea}>
      <Text style={styles.locationTextStyle}>{name}</Text>
    </TouchableOpacity>
  ));
  const GwangJuLocationComponents = GwangJuLocation.map((name, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setLocationSelect(name);
        setIsVisible(false);
      }}
      style={styles.locationTouchArea}>
      <Text style={styles.locationTextStyle}>{name}</Text>
    </TouchableOpacity>
  ));
  const GangWonDoLocationComponents = GangWonDoLocation.map((name, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setLocationSelect(name);
        setIsVisible(false);
      }}
      style={styles.locationTouchArea}>
      <Text style={styles.locationTextStyle}>{name}</Text>
    </TouchableOpacity>
  ));
  const DaeJeonLocationComponents = DaeJeonLocation.map((name, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setLocationSelect(name);
        setIsVisible(false);
      }}
      style={styles.locationTouchArea}>
      <Text style={styles.locationTextStyle}>{name}</Text>
    </TouchableOpacity>
  ));
  const NorthChoongCheongLocationComponents = NorthChoongCheongLocation.map(
    (name, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setLocationSelect(name);
          setIsVisible(false);
        }}
        style={styles.locationTouchArea}>
        <Text style={styles.locationTextStyle}>{name}</Text>
      </TouchableOpacity>
    ),
  );
  const SouthChoongCheongComponents = SouthChoongCheongLocation.map(
    (name, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setLocationSelect(name);
          setIsVisible(false);
        }}
        style={styles.locationTouchArea}>
        <Text style={styles.locationTextStyle}>{name}</Text>
      </TouchableOpacity>
    ),
  );
  const NorthGyeongSangLocationComponents = NorthGyeongSangLocation.map(
    (name, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setLocationSelect(name);
          setIsVisible(false);
        }}
        style={styles.locationTouchArea}>
        <Text style={styles.locationTextStyle}>{name}</Text>
      </TouchableOpacity>
    ),
  );
  const SouthGyeongSangLocationComponents = SouthGyeongSangLocation.map(
    (name, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setLocationSelect(name);
          setIsVisible(false);
        }}
        style={styles.locationTouchArea}>
        <Text style={styles.locationTextStyle}>{name}</Text>
      </TouchableOpacity>
    ),
  );
  const NorthJeonLaDoLocationComponents = NorthJeonLaDoLocation.map(
    (name, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setLocationSelect(name);
          setIsVisible(false);
        }}
        style={styles.locationTouchArea}>
        <Text style={styles.locationTextStyle}>{name}</Text>
      </TouchableOpacity>
    ),
  );
  const SouthJeonLaDoLocationComponents = SouthJeonLaDoLocation.map(
    (name, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setLocationSelect(name);
          setIsVisible(false);
        }}
        style={styles.locationTouchArea}>
        <Text style={styles.locationTextStyle}>{name}</Text>
      </TouchableOpacity>
    ),
  );
  const SeJongLocationComponents = SeJongLocation.map((name, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setLocationSelect(name);
        setIsVisible(false);
      }}
      style={styles.locationTouchArea}>
      <Text style={styles.locationTextStyle}>{name}</Text>
    </TouchableOpacity>
  ));
  const JejuLocationComponents = JejuLocation.map((name, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        setLocationSelect(name);
        setIsVisible(false);
      }}
      style={styles.locationTouchArea}>
      <Text style={styles.locationTextStyle}>{name}</Text>
    </TouchableOpacity>
  ));

  const removeAsyncLocation = async () => {
    await AsyncStorage.removeItem('userLocation', e => {
      if (e) {
        alert('잠시후 시도해주세요.');
        return;
      }
    });
    alert('초기화 되었습니다.');
    setLocationSelect(null);
    return;
  };
  return (
    <Modal
      style={styles.wrapper}
      isVisible={isVisible}
      onBackdropPress={() => {
        setIsVisible(false);
        islandPress(null);
      }}>
      <View>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(false);
            islandPress(null);
          }}
          style={styles.cancelButton}>
          <Text style={styles.cancelTextStyle}>닫기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.locationsContainer}>
        <View style={styles.islandContainer}>
          <Container>
            <ModalLocationsButton islandPress={islandPress} location="서울" />
            <ModalLocationsButton islandPress={islandPress} location="경기도" />
            <ModalLocationsButton islandPress={islandPress} location="인천" />
            <ModalLocationsButton islandPress={islandPress} location="대구" />
            <ModalLocationsButton islandPress={islandPress} location="울산" />
            <ModalLocationsButton islandPress={islandPress} location="부산" />
            <ModalLocationsButton islandPress={islandPress} location="광주" />
            <ModalLocationsButton islandPress={islandPress} location="강원도" />
            <ModalLocationsButton islandPress={islandPress} location="대전" />
            <ModalLocationsButton
              islandPress={islandPress}
              location="충청북도"
            />
            <ModalLocationsButton
              islandPress={islandPress}
              location="충청남도"
            />
            <ModalLocationsButton islandPress={islandPress} location="세종" />
            <ModalLocationsButton
              islandPress={islandPress}
              location="경상북도"
            />
            <ModalLocationsButton
              islandPress={islandPress}
              location="경상남도"
            />
            <ModalLocationsButton
              islandPress={islandPress}
              location="전라북도"
            />
            <ModalLocationsButton
              islandPress={islandPress}
              location="전라남도"
            />
            <ModalLocationsButton islandPress={islandPress} location="제주도" />
            {reset && (
              <TouchableOpacity
                onPress={() => {
                  removeAsyncLocation();
                }}
                style={styles.resetButton}>
                <Text style={styles.resetTextStyle}>초기화</Text>
              </TouchableOpacity>
            )}
          </Container>
        </View>

        <View style={styles.locationContainer}>
          {island === '서울' && (
            <Container>{SeoulLocationComponents}</Container>
          )}
          {island === '경기도' && (
            <Container>{GyeongGiLocationComponents}</Container>
          )}
          {island === '인천' && (
            <Container>{InCheonLocationComponents}</Container>
          )}
          {island === '대구' && (
            <Container>{DaeguLocationComponents}</Container>
          )}
          {island === '울산' && (
            <Container>{UlsanLocationComponents}</Container>
          )}
          {island === '부산' && (
            <Container>{BusanLocationComponents}</Container>
          )}
          {island === '광주' && (
            <Container>{GwangJuLocationComponents}</Container>
          )}
          {island === '강원도' && (
            <Container>{GangWonDoLocationComponents}</Container>
          )}
          {island === '대전' && (
            <Container>{DaeJeonLocationComponents}</Container>
          )}
          {island === '충청북도' && (
            <Container>{NorthChoongCheongLocationComponents}</Container>
          )}
          {island === '충청남도' && (
            <Container>{SouthChoongCheongComponents}</Container>
          )}
          {island === '세종' && (
            <Container>{SeJongLocationComponents}</Container>
          )}
          {island === '경상북도' && (
            <Container>{NorthGyeongSangLocationComponents}</Container>
          )}
          {island === '경상남도' && (
            <Container>{SouthGyeongSangLocationComponents}</Container>
          )}
          {island === '전라북도' && (
            <Container>{NorthJeonLaDoLocationComponents}</Container>
          )}
          {island === '전라남도' && (
            <Container>{SouthJeonLaDoLocationComponents}</Container>
          )}
          {island === '제주도' && (
            <Container>{JejuLocationComponents}</Container>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomLocationModal;
