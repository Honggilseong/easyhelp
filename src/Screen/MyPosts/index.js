import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useCallback} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {View, Text, FlatList} from 'react-native';
import {auth, db} from '../../../firebase';
import RenderMyPosts from '../../Components/renderMyPosts';
import styles from './styles';

const MyPosts = () => {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState({});
  //it will be high cost.
  const query = db
    .collectionGroup('posts')
    .where('email', '==', user.email)
    .orderBy('createAt', 'desc');
  const renderItem = useCallback(({item}) => <RenderMyPosts item={item} />, []);
  const keyExtractor = useCallback(item => item.id, []);
  useFocusEffect(
    React.useCallback(() => {
      const getMyPosts = async () => {
        try {
          if (query) {
            await query.get().then(querySnapshot => {
              setPosts(
                querySnapshot.docs.map(doc => ({id: doc.id, data: doc.data()})),
              );
            });
          } else {
            console.log('there is no post');
          }
        } catch (e) {
          alert('불러오지 못 했습니다. 잠시후 다시 시도해주세요.');
          await db.collection('errorLogs').doc().set({
            myPosts: e,
          });
        }
      };
      getMyPosts();
    }, []),
  );
  return (
    <>
      {Object.entries(posts).length <= 0 ? (
        <View style={styles.noPostContainer}>
          <Text style={styles.noPostText}>내 게시글이 없습니다.</Text>
        </View>
      ) : (
        <View style={styles.flatListContainer}>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
      )}
    </>
  );
};

export default MyPosts;
