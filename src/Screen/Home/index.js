import React, {useState, useEffect, useCallback} from 'react';
import {ActivityIndicator, FlatList, Text, TextInput, View} from 'react-native';
import {db} from '../../../firebase';
import RenderPosts from '../../Components/renderPosts';
import styles from './styles';
import CustomLocationModal from '../../Components/common/CustomLocationModal';
import CustomButton from '../../Components/common/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../Assets/theme/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
const Home = () => {
  const [locationSelect, setLocationSelect] = useState(null);
  const [refreshTimer, setRefreshTimer] = useState(false);
  const [island, setIsland] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [postList, setPostList] = useState([]);
  const [startAt, setStartAt] = useState();
  const [isGetPostLoading, setIsGetPostLoading] = useState(false);
  const [lastPost, setLastPost] = useState(false);
  const [noPostText, setNoPostText] = useState('우리동네 게시글이 없어요');
  const renderItem = useCallback(
    ({item}) => <RenderPosts item={item} />,
    [postList],
  );
  const keyExtractor = useCallback(item => item.id, []);
  const postLimit = 10;

  const getLocationPosts = async () => {
    try {
      const querySnapshot = db
        .collection('zone')
        .doc(`${locationSelect}`)
        .collection('posts')
        .orderBy('createAt', 'desc')
        .limit(postLimit)
        .get();
      const startPost = (await querySnapshot).docs[
        (await querySnapshot).docs.length - 1
      ];
      await querySnapshot.then(post => {
        setPostList(
          post.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
            uid: doc.id,
          })),
        );
      });
      setLastPost(false);
      setStartAt(startPost);
    } catch (e) {
      alert('불러오지 못 했습니다. 잠시후 다시 시도해주세요.');
      await db.collection('errorLogs').doc().set({
        homeError: e,
      });
    }
  };
  useEffect(() => {
    getLocationPosts();
    console.log(locationSelect);
  }, [locationSelect]);
  useEffect(() => {
    const getUserSettingLocation = async () => {
      try {
        await AsyncStorage?.getItem('userLocation', (e, res) => {
          setLocationSelect(res);
        });
      } catch (e) {
        alert('내 지역을 불러오지 못 했습니다.');
      }
    };
    getUserSettingLocation();
  }, []);
  useEffect(() => {
    console.log(locationSelect);
  }, [locationSelect]);
  const onRefresh = () => {
    setTimeout(() => {
      getLocationPosts();
    }, 1000);
  };
  const getMorePosts = async () => {
    if (lastPost === true) return;
    setIsGetPostLoading(true);
    try {
      const query = await db
        .collection('zone')
        .doc(`${locationSelect}`)
        ?.collection('posts')
        .orderBy('createAt', 'desc')
        .startAfter(startAt)
        .limit(postLimit)
        .get();

      const posts = query.docs.map(doc => ({id: doc.id, data: doc.data()}));
      posts.length === 0 ? setLastPost(true) : setLastPost(false);
      if (!lastPost) {
        setStartAt(query.docs[query.docs.length - 1]);
        setPostList([...postList, ...posts]);
        setIsGetPostLoading(false);
      } else {
        setIsGetPostLoading(false);
      }
    } catch (e) {
      alert('불러오지 못 했습니다. 잠시후에 다시 시도해주세요.');
      await db.collection('errorLogs').doc().set({
        homeError: e,
      });
    }
  };
  const renderFooter = () => {
    if (!isGetPostLoading) return true;
    return (
      <ActivityIndicator
        size="large"
        color={'#D83E64'}
        style={{marginBottom: 10}}
      />
    );
  };
  const islandPress = value => {
    setIsland(value);
  };
  const refreshPosts = async () => {
    setRefreshTimer(true);
    setNoPostText('새로고침 중이에요');
    setTimeout(() => {
      setRefreshTimer(false);
    }, 5000);
    console.log(locationSelect);
    setPostList([]);
    getLocationPosts();
    setNoPostText('우리동네 게시글이 없어요');
  };
  return (
    <>
      <View style={styles.wrapper}>
        <View style={{flexDirection: 'row'}}>
          <CustomButton
            title="내 지역"
            green
            onPress={() => {
              setIsVisible(true);
            }}
            style={{marginBottom: 7, flex: 9}}
          />
          <TouchableOpacity
            disabled={refreshTimer}
            onPress={() => refreshPosts()}
            style={[
              styles.refreshButton,
              {backgroundColor: refreshTimer ? colors.grey : colors.primary},
            ]}>
            <AntDesign name="reload1" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
        {locationSelect === null && (
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text>"내 지역" 버튼을 눌러 내 지역의 게시글을 확인해보세요.</Text>
          </View>
        )}
        {locationSelect !== null && postList.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text>{noPostText}</Text>
            {noPostText === '우리동네 게시글이 없어요' && (
              <Text style={{fontSize: 20}}>😢</Text>
            )}
          </View>
        ) : (
          <View style={styles.flatListPostsWrapper}>
            <FlatList
              data={postList}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              ListFooterComponent={renderFooter}
              initialNumToRender={5}
              onEndReachedThreshold={0.1}
              updateCellsBatchingPeriod={40}
              maxToRenderPerBatch={5}
              disableVirtualization={false}
              refreshing={onRefresh}
              showsVerticalScrollIndicator={false}
              onEndReached={() => {
                if (!isGetPostLoading && !lastPost) {
                  getMorePosts();
                }
              }}
            />
          </View>
        )}
      </View>
      <CustomLocationModal
        islandPress={islandPress}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        island={island}
        setLocationSelect={setLocationSelect}
      />
    </>
  );
};

export default Home;
