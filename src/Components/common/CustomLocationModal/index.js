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
        alert('????????? ??????????????????.');
        return;
      }
    });
    alert('????????? ???????????????.');
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
          <Text style={styles.cancelTextStyle}>??????</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.locationsContainer}>
        <View style={styles.islandContainer}>
          <Container>
            <ModalLocationsButton islandPress={islandPress} location="??????" />
            <ModalLocationsButton islandPress={islandPress} location="?????????" />
            <ModalLocationsButton islandPress={islandPress} location="??????" />
            <ModalLocationsButton islandPress={islandPress} location="??????" />
            <ModalLocationsButton islandPress={islandPress} location="??????" />
            <ModalLocationsButton islandPress={islandPress} location="??????" />
            <ModalLocationsButton islandPress={islandPress} location="??????" />
            <ModalLocationsButton islandPress={islandPress} location="?????????" />
            <ModalLocationsButton islandPress={islandPress} location="??????" />
            <ModalLocationsButton
              islandPress={islandPress}
              location="????????????"
            />
            <ModalLocationsButton
              islandPress={islandPress}
              location="????????????"
            />
            <ModalLocationsButton islandPress={islandPress} location="??????" />
            <ModalLocationsButton
              islandPress={islandPress}
              location="????????????"
            />
            <ModalLocationsButton
              islandPress={islandPress}
              location="????????????"
            />
            <ModalLocationsButton
              islandPress={islandPress}
              location="????????????"
            />
            <ModalLocationsButton
              islandPress={islandPress}
              location="????????????"
            />
            <ModalLocationsButton islandPress={islandPress} location="?????????" />
            {reset && (
              <TouchableOpacity
                onPress={() => {
                  removeAsyncLocation();
                }}
                style={styles.resetButton}>
                <Text style={styles.resetTextStyle}>?????????</Text>
              </TouchableOpacity>
            )}
          </Container>
        </View>

        <View style={styles.locationContainer}>
          {island === '??????' && (
            <Container>{SeoulLocationComponents}</Container>
          )}
          {island === '?????????' && (
            <Container>{GyeongGiLocationComponents}</Container>
          )}
          {island === '??????' && (
            <Container>{InCheonLocationComponents}</Container>
          )}
          {island === '??????' && (
            <Container>{DaeguLocationComponents}</Container>
          )}
          {island === '??????' && (
            <Container>{UlsanLocationComponents}</Container>
          )}
          {island === '??????' && (
            <Container>{BusanLocationComponents}</Container>
          )}
          {island === '??????' && (
            <Container>{GwangJuLocationComponents}</Container>
          )}
          {island === '?????????' && (
            <Container>{GangWonDoLocationComponents}</Container>
          )}
          {island === '??????' && (
            <Container>{DaeJeonLocationComponents}</Container>
          )}
          {island === '????????????' && (
            <Container>{NorthChoongCheongLocationComponents}</Container>
          )}
          {island === '????????????' && (
            <Container>{SouthChoongCheongComponents}</Container>
          )}
          {island === '??????' && (
            <Container>{SeJongLocationComponents}</Container>
          )}
          {island === '????????????' && (
            <Container>{NorthGyeongSangLocationComponents}</Container>
          )}
          {island === '????????????' && (
            <Container>{SouthGyeongSangLocationComponents}</Container>
          )}
          {island === '????????????' && (
            <Container>{NorthJeonLaDoLocationComponents}</Container>
          )}
          {island === '????????????' && (
            <Container>{SouthJeonLaDoLocationComponents}</Container>
          )}
          {island === '?????????' && (
            <Container>{JejuLocationComponents}</Container>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomLocationModal;
