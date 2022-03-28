import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const RenderNotices = ({item}) => {
  const {title, timestamp, description} = item;
  const [isClick, setIsClick] = useState(false);
  const onNoticeClick = () => {
    setIsClick(!isClick);
  };
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onNoticeClick}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>

      {isClick && (
        <>
          <View style={styles.lineView}></View>
          <Text style={styles.description}>{description}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default RenderNotices;
