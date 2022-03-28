import React from 'react';
import {View, Text, TextInput} from 'react-native';
import styles from './styles';

const Input = ({
  style,
  label,
  onChangeText,
  value,
  icon,
  iconPosition,
  error,
  ...props
}) => {
  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };
  return (
    <View style={styles.wrapper}>
      {label && <Text>{label}</Text>}
      <View
        style={[
          styles.iconWrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {flexDirection: getFlexDirection()},
          style,
        ]}>
        <View>{icon && icon}</View>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          value={value}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;
