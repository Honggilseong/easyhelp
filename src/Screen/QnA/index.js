import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Container from '../../Components/common/Container';
import Mailer from 'react-native-mail';
import CustomButton from '../../Components/common/CustomButton';
import DeviceInfo from 'react-native-device-info';
const QnA = () => {
  const [qnaCheck, setQnaCheck] = useState({
    block: false,
    leaveChat: false,
    contact: false,
    chatRoom: false,
    deletePost: false,
  });
  const onPress = ({name, value}) => {
    setQnaCheck({...qnaCheck, [name]: !value});
  };
  const onMail = () => {
    const brand = DeviceInfo.getBrand();
    const model = DeviceInfo.getModel();
    const systemVersion = DeviceInfo.getSystemVersion();
    const version = DeviceInfo.getVersion();
    Mailer.mail(
      {
        subject: '',
        recipients: ['easyhelpsp@gmail.com'],
        body: `Brand: ${brand} Model: ${model} SystemVersion: ${systemVersion} Version: ${version} (Please keep the information above. It may help to solve your problems in the future.)`,
        isHTML: true,
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response'),
            },
          ],
          {cancelable: true},
        );
      },
    );
  };
  return (
    <Container>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => onPress({name: 'contact', value: qnaCheck.contact})}>
        <View style={styles.textAndIcon}>
          <Text style={styles.titleText}>피드백 또는 서포트</Text>
          <AntDesign name="caretdown" size={20} />
        </View>
      </TouchableOpacity>
      {qnaCheck.contact && (
        <View style={styles.wrapper}>
          <Text style={styles.description}>
            문제가 있거나 다른 질문이 있으시다면 아래의 버튼을 누르시거나
            easyhelpsp@gmail.com로 메일을 부탁드리겠습니다.
          </Text>
          <CustomButton onPress={onMail} primary title="이메일 전송" />
        </View>
      )}
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => onPress({name: 'block', value: qnaCheck.block})}>
        <View style={styles.textAndIcon}>
          <Text style={styles.titleText}>유저 차단은 어떻게 하나요?</Text>
          <AntDesign name="caretdown" size={20} />
        </View>
      </TouchableOpacity>
      {qnaCheck.block && (
        <View style={styles.wrapper}>
          <Text style={styles.description}>
            채팅방에 있는 버튼을 눌러주세요.
          </Text>
          <Image
            source={require('../../Assets/images/block1.png')}
            style={styles.image}
          />
          <Image
            source={require('../../Assets/images/block2.png')}
            style={styles.image}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => onPress({name: 'leaveChat', value: qnaCheck.leaveChat})}>
        <View style={styles.textAndIcon}>
          <Text style={styles.titleText}>채팅방은 어떻게 나가나요?</Text>
          <AntDesign name="caretdown" size={20} />
        </View>
      </TouchableOpacity>
      {qnaCheck.leaveChat && (
        <View style={styles.wrapper}>
          <Image
            source={require('../../Assets/images/deleteChat1.png')}
            style={styles.image}
          />
          <Image
            source={require('../../Assets/images/deleteChat2.png')}
            style={styles.image}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() =>
          onPress({name: 'deletePost', value: qnaCheck.deletePost})
        }>
        <View style={styles.textAndIcon}>
          <Text style={styles.titleText}>내 게시물은 어떻게 지우나요?</Text>
          <AntDesign name="caretdown" size={20} />
        </View>
      </TouchableOpacity>
      {qnaCheck.deletePost && (
        <View style={styles.wrapper}>
          <Image
            source={require('../../Assets/images/statePost1.png')}
            style={styles.image}
          />
          <Image
            source={require('../../Assets/images/statePost2.png')}
            style={styles.image}
          />
          <Image
            source={require('../../Assets/images/statePost3.png')}
            style={styles.image}
          />
          <Image
            source={require('../../Assets/images/deletePost.png')}
            style={styles.image}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => onPress({name: 'chatRoom', value: qnaCheck.chatRoom})}>
        <View style={styles.textAndIcon}>
          <Text style={styles.titleText}>
            내 게시물에서 메시지를 그만 받고 싶어요.
          </Text>
          <AntDesign name="caretdown" size={20} />
        </View>
      </TouchableOpacity>
      {qnaCheck.chatRoom && (
        <View style={styles.wrapper}>
          <Image
            source={require('../../Assets/images/statePost1.png')}
            style={styles.image}
          />
          <Image
            source={require('../../Assets/images/statePost2.png')}
            style={styles.image}
          />
          <Image
            source={require('../../Assets/images/statePost3.png')}
            style={styles.image}
          />
          <Image
            source={require('../../Assets/images/finishPost.png')}
            style={styles.image}
          />
        </View>
      )}
    </Container>
  );
};

export default QnA;
