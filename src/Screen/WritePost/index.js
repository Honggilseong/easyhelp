import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, Text} from 'react-native';
import {auth, db} from '../../../firebase';
import Container from '../../Components/common/Container';
import CustomButton from '../../Components/common/CustomButton';
import Input from '../../Components/common/Input';
import {HOME} from '../../Constants/routeNames';
import styles from './styles';
import {useAuthState} from 'react-firebase-hooks/auth';
import CustomModal from '../../Components/common/CustomModal';
import colors from '../../Assets/theme/colors';
import CustomLocationModal from '../../Components/common/CustomLocationModal';
import CustomLabelInput from '../../Components/CustomLabelInput';

const WritePost = () => {
  const [writePost, setWritePost] = useState({});
  const [location, setLocation] = useState('Select-Location');
  const [island, setIsland] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const {navigate} = useNavigation();
  const [user] = useAuthState(auth);

  const onSubmit = () => {
    if (!writePost.writeTitle) {
      setErrors(prev => {
        return {...prev, writeTitle: '제목을 적어주세요.'};
      });
    }
    if (!writePost.price) {
      setErrors(prev => {
        return {...prev, price: '가격을 적어주세요.'};
      });
    }
    if (!writePost.neighborhood) {
      setErrors(prev => {
        return {...prev, neighborhood: '동네를 적어주세요.'};
      });
    }
    if (!writePost.writeDescription) {
      setErrors(prev => {
        return {
          ...prev,
          writeDescription: '내용을 적어주세요.',
        };
      });
    }
    if (location === 'Select-Location') {
      setErrors(prev => {
        return {
          ...prev,
          location: '지역을 선택해 주세요.',
        };
      });
    }
    if (
      writePost.writeDescription &&
      writePost.price &&
      writePost.writeTitle &&
      writePost.neighborhood &&
      location !== 'Select-Location'
    )
      setModalVisible(true);
  };
  const onChange = ({name, value}) => {
    setWritePost({...writePost, [name]: value});
    if (value !== '') {
      setErrors(prev => {
        return {...prev, [name]: null};
      });
    }
  };
  const islandPress = value => {
    setIsland(value);
  };
  const locationPress = value => {
    setLocation(value);
  };
  const negativeButtonPress = () => {
    setModalVisible(false);
  };
  const positiveButtonPress = async () => {
    const {writeTitle, price, writeDescription, neighborhood} = writePost;
    if (
      Object.values(writePost).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      try {
        await db.collection('zone').doc(`${location}`).collection('posts').add({
          writeTitle,
          price,
          writeDescription,
          neighborhood,
          username: user.displayName,
          email: user.email,
          userUid: user.uid,
          createAt: new Date(),
          location,
          isFinish: false,
          reportCount: 0,
          reportUsers: [],
        });
        setModalVisible(false);
        navigate(HOME);
      } catch (e) {
        alert('작성하지 못 했습니다. 잠시후 다시 시도해주세요.');
        await db.collection('errorLogs').doc().set({
          writePost: e,
        });
      }
    }
  };
  useEffect(() => {
    setErrors(prev => {
      return {...prev, location: null};
    });
  }, [location]);
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : -300}>
        <Container style={styles.wrapper}>
          <CustomLabelInput
            label="제목"
            onChangeText={value => onChange({name: 'writeTitle', value})}
            value={writePost.writeTitle}
            error={errors.writeTitle}
          />
          <CustomLabelInput
            label="가격(숫자만 적어주세요)"
            onChangeText={value => onChange({name: 'price', value})}
            value={writePost.price}
            error={errors.price}
            keyboardType="number-pad"
          />
          <CustomButton
            style={{marginTop: 12}}
            onPress={() => {
              setLocationModalVisible(true);
            }}
            title="내 지역"
            primary
          />
          {location !== 'Select-Location' && (
            <Text style={{marginTop: 12, color: colors.primary}}>
              내 지역:{island} {location}
            </Text>
          )}
          {errors.location && (
            <Text style={{color: colors.danger}}>{errors.location}</Text>
          )}
          <CustomLabelInput
            label="동네 이름 (예: 중화 1동)"
            onChangeText={value => onChange({name: 'neighborhood', value})}
            value={writePost.neighborhood}
            error={errors.neighborhood}
          />
          <Input
            style={styles.textArea}
            label="내용"
            onChangeText={value => onChange({name: 'writeDescription', value})}
            value={writePost.writeDescription}
            error={errors.writeDescription}
            numberOfLines={10}
            multiline={true}
          />
          <CustomButton title="글작성" primary onPress={() => onSubmit()} />
        </Container>
      </KeyboardAvoidingView>
      <CustomLocationModal
        setIsVisible={setLocationModalVisible}
        isVisible={locationModalVisible}
        islandPress={islandPress}
        setLocationSelect={locationPress}
        island={island}
      />
      <CustomModal
        negativeButton="취소"
        positiveButton="글작성"
        negativeButtonPress={negativeButtonPress}
        positiveButtonPress={positiveButtonPress}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title="글작성"
        description="작성후에 수정이 불가능합니다. 게시하시겠습니까?"
      />
    </>
  );
};

export default WritePost;
