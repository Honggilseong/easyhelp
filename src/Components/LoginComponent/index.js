import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Container from '../common/Container';
import CustomButton from '../common/CustomButton';
import {REGISTER} from '../../Constants/routeNames';
import styles from './styles';
import colors from '../../Assets/theme/colors';
import {GlobalContext} from '../../Context/GlobalProvider';
import CustomLabelInput from '../CustomLabelInput';
const LoginComponent = ({
  onChange,
  errors,
  onLogin,
  setForm,
  form,
  setErrors,
}) => {
  const {
    authState: {loading},
  } = useContext(GlobalContext);
  const {navigate} = useNavigation();
  return (
    <Container style={styles.wrapper}>
      <Image
        source={require('../../Assets/images/logo.png')}
        style={styles.imageStyle}
      />
      <CustomLabelInput
        label="이메일"
        autoFocus={true}
        onChangeText={value => {
          onChange({name: 'email', value});
        }}
        value={form.email}
        error={errors.email}
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
      <CustomButton
        onPress={onLogin}
        style={styles.signInButton}
        primary
        title={
          loading ? (
            <ActivityIndicator size="large" color={colors.danger} />
          ) : (
            '로그인'
          )
        }
      />
      {errors.valid && (
        <Text style={{color: colors.danger}}>{errors.valid}</Text>
      )}
      <View style={styles.signupButton}>
        <Text>아이디가 없으신가요?</Text>
        <TouchableOpacity
          onPress={() => {
            navigate(REGISTER);
            setForm({});
            setErrors({});
          }}>
          <Text style={styles.clickText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default LoginComponent;
