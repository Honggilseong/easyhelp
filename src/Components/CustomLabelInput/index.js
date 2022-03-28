import React from 'react';
import {View, Text} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import colors from '../../Assets/theme/colors';
import styles from './styles';
const CustomLabelInput = ({
  style,
  label,
  onChangeText,
  value,
  error,
  ...props
}) => {
  return (
    <View>
      <FloatingLabelInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        containerStyles={{
          borderBottomColor: colors.grey,
          borderBottomWidth: 1,
          height: 55,
        }}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomLabelInput;
