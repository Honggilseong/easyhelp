import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import colors from '../../../Assets/theme/colors';

const ModalLocationsButton = ({islandPress, location}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        islandPress(location);
      }}
      style={{
        justifyContent: 'center',
        backgroundColor: colors.primary,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
        height: 50,
      }}>
      <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
        {location}
      </Text>
    </TouchableOpacity>
  );
};

export default ModalLocationsButton;
