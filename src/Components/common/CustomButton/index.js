import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import colors from '../../../Assets/theme/colors';
import styles from './styles';

const CustomButton = ({
  style,
  red,
  grey,
  primary,
  title,
  label,
  loading,
  onPress,
  danger,
  green,
  children,
}) => {
  const getBgColor = () => {
    if (red) {
      return 'red';
    }
    if (primary) {
      return colors.primary;
    }
    if (grey) {
      return colors.grey;
    }
    if (danger) {
      return colors.danger;
    }
    if (green) {
      return colors.green;
    }
  };
  return (
    <TouchableOpacity
      style={[style, styles.wrapper, {backgroundColor: getBgColor()}]}
      onPress={onPress}>
      {label && <Text>{label}</Text>}
      <View>
        {loading && loading ? (
          <Text style={styles.titleText}>loading...</Text>
        ) : (
          <Text style={styles.titleText}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
