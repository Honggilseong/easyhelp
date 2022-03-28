import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Container from '../../Components/common/Container';
import styles from './styles';

const Notices = () => {
  const route = useRoute();
  const {notice} = route.params;
  const navigation = useNavigation();
  return (
    <Container>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{notice.title}</Text>
        <Text style={styles.titleDate}>{notice.date}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{notice.description}</Text>
      </View>
    </Container>
  );
};

export default Notices;
