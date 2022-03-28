import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import CustomButton from '../common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {LOGIN} from '../../Constants/routeNames';
import Container from '../common/Container';
import styles from './styles';
import CustomModal from '../common/CustomModal';
import {GlobalContext} from '../../Context/GlobalProvider';
import colors from '../../Assets/theme/colors';
import CheckBox from '@react-native-community/checkbox';
import send_message from '../../Server';
import CustomLabelInput from '../CustomLabelInput';

const RegisterComponent = ({
  isLoading,
  errors,
  onChange,
  onSubmit,
  form,
  setIsFinishConfirm,
  setForm,
  isReadCheck,
  setIsReadCheck,
}) => {
  const checkDailyHours = 43200000;
  const [confirmError, setConfirmError] = useState();
  const [code, setCode] = useState();
  const [verityCheckCode, setVerityCheckCode] = useState();
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    authState: {loading},
  } = useContext(GlobalContext);
  const {navigate} = useNavigation();
  const onSendMessageClick = async () => {
    if (isEditable === false) {
      alert(
        `이미 문자를 보냈습니다. 문제가 있으시다면 easyhelpsp@gmail.com로 이메일을 보내주세요.`,
      );
      return;
    }
    if (!form.phone) {
      alert('휴대폰번호를 입력해주세요.');
      return;
    }
    setModalVisible(true);
  };
  const negativeButtonPress = () => {
    setModalVisible(false);
  };
  const positiveButtonPress = async () => {
    setIsEditable(false);
    setModalVisible(false);

    let verityCode = '';
    for (let i = 0; i < 5; i++) {
      verityCode += Math.floor(Math.random() * 10);
    }
    setVerityCheckCode(verityCode);

    send_message(verityCode, form.phone);
    setIsConfirmClicked(true);
  };
  const onConfirm = async () => {
    if (verityCheckCode === code) {
      setIsFinishConfirm(true);
      alert('확인 되었습니다.');
    } else {
      alert('코드가 다릅니다.');
    }
  };
  return (
    <>
      <Container style={styles.wrapper}>
        <Image
          source={require('../../Assets/images/logo.png')}
          style={styles.imageStyle}
        />
        <CustomLabelInput
          onChangeText={value => {
            onChange({name: 'email', value});
          }}
          label="이메일"
          value={form.email}
          error={errors.email}
        />
        <CustomLabelInput
          onChangeText={value => {
            onChange({name: 'username', value});
          }}
          label="닉네임"
          value={form.username}
          error={errors.username}
        />

        <CustomLabelInput
          label="비밀번호"
          onChangeText={value => {
            onChange({name: 'password', value});
          }}
          isPassword
          customShowPasswordComponent={<Text>Show</Text>}
          customHidePasswordComponent={<Text>Hide</Text>}
          value={form.password}
          error={errors.password}
        />
        <CustomLabelInput
          label="휴대폰 번호(01012341234)"
          onChangeText={value => {
            onChange({name: 'phone', value});
          }}
          editable={isEditable}
          rightComponent={
            <TouchableOpacity
              onPress={() => {
                onSendMessageClick();
              }}>
              <Text>코드전송</Text>
            </TouchableOpacity>
          }
          placeholder="01012341234 (숫자만 적어주세요)"
          keyboardType="number-pad"
          value={form.phone}
          error={errors.phone}
        />
        {isConfirmClicked && (
          <CustomLabelInput
            label="확인번호(5자리)"
            onChangeText={value => {
              setCode(value);
            }}
            rightComponent={
              <TouchableOpacity
                onPress={() => {
                  onConfirm();
                }}>
                <Text>코드확인</Text>
              </TouchableOpacity>
            }
            keyboardType="number-pad"
            value={code}
            error={confirmError}
          />
        )}
        <View style={styles.termsContainer}>
          <CheckBox
            value={isReadCheck}
            onValueChange={() => setIsReadCheck(!isReadCheck)}
          />
          <Text>이용약관을 읽었으며 동의합니다.</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.easyhelpneighborhood.com/terms');
            }}>
            <Text style={{color: colors.primary}}>이용약관</Text>
          </TouchableOpacity>
        </View>
        {errors.readcheck && (
          <Text style={{color: colors.danger}}>{errors.readcheck}</Text>
        )}
        <CustomButton
          loading={isLoading}
          onPress={onSubmit}
          primary
          title={
            loading ? (
              <ActivityIndicator size="large" color={colors.danger} />
            ) : (
              '회원가입'
            )
          }
        />
        <View style={styles.textAndTouch}>
          <Text>이미 아이디가 있으신가요?</Text>
          <TouchableOpacity
            onPress={() => {
              navigate(LOGIN);
              setForm({});
              setCode();
            }}>
            <Text style={styles.clickText}>로그인</Text>
          </TouchableOpacity>
        </View>
      </Container>
      <CustomModal
        negativeButton="취소"
        positiveButton="보내기"
        negativeButtonPress={negativeButtonPress}
        positiveButtonPress={positiveButtonPress}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title="확인 코드"
        description="이 버튼을 누르면 휴대폰 번호를 바꿀 수 없습니다. 진행하시겠습니까?"
      />
    </>
  );
};

export default RegisterComponent;
