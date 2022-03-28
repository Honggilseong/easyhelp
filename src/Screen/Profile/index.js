import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {auth, db} from '../../../firebase';
import CustomButton from '../../Components/common/CustomButton';
import {
  QNA,
  MYPOSTS,
  USER_INFO,
  USER_SETTINGS,
  NOTICE,
} from '../../Constants/routeNames';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../Assets/theme/colors';
import Container from '../../Components/common/Container';
import UserChart from '../../Components/UserChart';

const Profile = () => {
  const [user] = useAuthState(auth);
  const [graphData, setGraphData] = useState();
  const [isGraphLoading, setIsGraphLoading] = useState(true);
  const {navigate} = useNavigation();
  const {width} = Dimensions.get('screen');
  const navigateProfile = name => {
    navigate(name);
  };

  useEffect(() => {
    const getGraphData = async () => {
      try {
        setIsGraphLoading(true);
        const graphBar = new Array();
        const UserQuery = await db.collection('users').doc(user.uid).get();
        const userGraphData = await UserQuery.data().recommends;
        console.log(userGraphData);

        for (const [key, value] of Object.entries(userGraphData)) {
          graphBar.push({x: key, y: value > 25 ? 25 : value});
        }
        console.log(graphBar);
        setGraphData(graphBar);
        setIsGraphLoading(false);
        return;
      } catch (e) {
        alert('그래프를 불러오지 못 했습니다. 잠시후에 다시 시도해주세요.');
        await db.collection('errorLogs').doc().set({
          graphError: e,
        });
        return;
      }
    };
    getGraphData();
    return () => {
      setGraphData(), setIsGraphLoading(false);
    };
  }, []);
  return (
    <Container>
      <View style={styles.wrapper}>
        <View style={styles.userContainer}>
          <Text style={styles.email}>{user.email}</Text>
          {/* <Text style={styles.displayName}>{user.displayName}</Text> */}
          {isGraphLoading === true ? (
            <ActivityIndicator
              size="large"
              color={colors.danger}
              style={{
                borderWidth: 1,
                borderColor: 'black',
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          ) : (
            graphData && (
              <UserChart width={width} height={300} data={graphData} />
            )
          )}
        </View>

        <CustomButton
          primary
          title="작성글"
          style={styles.myPostsButton}
          onPress={() => {
            navigate(MYPOSTS);
          }}
        />
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => navigateProfile(USER_INFO)}>
            <View style={styles.iconContainer}>
              <AntDesign name="user" size={50} color={colors.black} />
              <Text>유저</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateProfile(NOTICE)}>
            <View style={styles.iconContainer}>
              <AntDesign name="notification" size={50} color={colors.black} />
              <Text>공지</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateProfile(USER_SETTINGS)}>
            <View style={styles.iconContainer}>
              <AntDesign name="setting" size={50} color={colors.black} />
              <Text>세팅</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateProfile(QNA)}>
            <View style={styles.iconContainer}>
              <AntDesign
                name="questioncircleo"
                size={50}
                color={colors.black}
              />
              <Text>Q&A</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Profile;
