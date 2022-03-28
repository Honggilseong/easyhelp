import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../../../Assets/theme/colors';
import styles from './styles';
const LoadingModal = ({modalVisible, setModalVisible, loadingText}) => {
  return (
    <Modal isVisible={modalVisible}>
      <View style={styles.wrapper}>
        <View style={styles.itemWrapper}>
          <ActivityIndicator size={'large'} color={colors.danger} />
          <Text style={styles.text}>{loadingText}...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
