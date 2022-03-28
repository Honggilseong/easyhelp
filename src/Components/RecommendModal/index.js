import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../Assets/theme/colors';

const RecommendModal = ({recommendClick, onUserRecommendButton}) => {
  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {
            borderWidth: recommendClick === '매너' ? 5 : 0,
            borderBottomWidth: recommendClick === '매너' ? 5 : 1,
            borderRightWidth: recommendClick === '매너' ? 5 : 1,
            borderColor: recommendClick === '매너' ? colors.green : colors.grey,
          },
        ]}
        onPress={() => onUserRecommendButton('매너')}>
        <FontAwesome5 name="thumbs-up" size={20} />
        <Text style={styles.itemText}>매너</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {
            borderWidth: recommendClick === '친절함' ? 5 : 0,
            borderBottomWidth: recommendClick === '친절함' ? 5 : 1,
            borderRightWidth: recommendClick === '친절함' ? 5 : 1,
            borderColor:
              recommendClick === '친절함' ? colors.green : colors.grey,
          },
        ]}
        onPress={() => onUserRecommendButton('친절함')}>
        <SimpleLineIcons name="emotsmile" size={20} />
        <Text style={styles.itemText}>친절함</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {
            borderWidth: recommendClick === '시간약속' ? 5 : 0,
            borderBottomWidth: recommendClick === '시간약속' ? 5 : 1,
            borderRightWidth: recommendClick === '시간약속' ? 5 : 1,
            borderColor:
              recommendClick === '시간약속' ? colors.green : colors.grey,
          },
        ]}
        onPress={() => onUserRecommendButton('시간약속')}>
        <Ionicons name="time-outline" size={20} />
        <Text style={styles.itemText}>시간약속</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {
            borderWidth: recommendClick === '신뢰' ? 5 : 0,
            borderBottomWidth: recommendClick === '신뢰' ? 5 : 1,
            borderRightWidth: recommendClick === '신뢰' ? 5 : 1,
            borderColor: recommendClick === '신뢰' ? colors.green : colors.grey,
          },
        ]}
        onPress={() => onUserRecommendButton('신뢰')}>
        <MaterialIcons name="hail" size={20} />
        <Text style={styles.itemText}>신뢰</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {
            borderWidth: recommendClick === '책임감' ? 5 : 0,
            borderBottomWidth: recommendClick === '책임감' ? 5 : 1,
            borderRightWidth: recommendClick === '책임감' ? 5 : 1,
            borderColor:
              recommendClick === '책임감' ? colors.green : colors.grey,
          },
        ]}
        onPress={() => onUserRecommendButton('책임감')}>
        <Icon name="handshake-o" size={20} />
        <Text style={styles.itemText}>책임감</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecommendModal;
