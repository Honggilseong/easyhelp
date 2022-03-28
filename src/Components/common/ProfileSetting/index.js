import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../Assets/theme/colors';
import styles from './styles';
import {color} from 'react-native-reanimated';

const ProfileSetting = ({blocked, logout, deleteUser, text, onPress}) => {
  const getIcon = () => {
    if (blocked) {
      return (
        <MaterialCommunityIcons
          name="block-helper"
          size={30}
          color={colors.black}
        />
      );
    }
    if (logout) {
      return <Feather name="log-out" size={30} color={colors.black} />;
    }
    if (deleteUser) {
      return <Feather name="user-x" size={30} color={colors.black} />;
    }
  };
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      {getIcon()}
      <Text style={styles.blockedUsersText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ProfileSetting;
