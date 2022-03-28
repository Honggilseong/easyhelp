import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
const CustomModal = ({
  modalVisible,
  setModalVisible,
  negativeButton,
  positiveButton,
  negativeButtonPress,
  positiveButtonPress,
  title,
  description,
  children,
}) => {
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}>
      <View style={styles.wrapper}>
        {title && <Text style={styles.modalTitle}>{title}</Text>}
        <View style={styles.modalTitleUnderline}></View>
        <View style={styles.descriptionContainer}>
          {description && (
            <Text style={styles.modalDescription}>{description}</Text>
          )}
        </View>

        {/* <View>{children}</View> */}
        <View style={styles.buttonContainer}>
          {negativeButton && (
            <TouchableOpacity
              onPress={() => negativeButtonPress()}
              style={styles.negativeButton}>
              <Text style={styles.negativeText}>{negativeButton}</Text>
            </TouchableOpacity>
          )}
          {positiveButton && (
            <TouchableOpacity
              onPress={() => positiveButtonPress()}
              style={styles.positiveButton}>
              <Text style={styles.positiveText}>{positiveButton}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
