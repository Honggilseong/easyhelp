import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {View, Text, FlatList} from 'react-native';
import {auth, db} from '../../../firebase';
import RenderBlockedUsers from '../../Components/renderBlockedUsers';

const BlockUsers = () => {
  const [user] = useAuthState(auth);
  const [listBlockedUsers, setListBlockedUsers] = useState(null);
  const userQuery = db.collection('users').doc(user.uid);
  const renderItem = useCallback(
    ({item}) => <RenderBlockedUsers item={item} />,
    [],
  );
  const keyExtractor = useCallback(item => item.id, []);
  useFocusEffect(
    React.useCallback(() => {
      const getBlockedUsers = async () => {
        try {
          await userQuery?.get().then(snap => {
            let newUsersArray = [];
            let blockUsers = snap.data().blockedUsers;
            blockUsers.map(value => {
              newUsersArray.push({
                id:
                  Math.floor(Math.random() * 10010) +
                  Math.floor(Math.random() * 10010),
                email: value,
              });
            });
            setListBlockedUsers(newUsersArray);
          });
        } catch (e) {
          alert('불러오지 못 했습니다. 잠시후 다시 시도해주세요.');
          await db.collection('errorLogs').doc().set({
            blockUsers: e,
          });
        }
      };
      getBlockedUsers();
    }, []),
  );
  useEffect(() => {
    console.log(listBlockedUsers);
  }, []);
  return (
    <View>
      {listBlockedUsers?.length === 0 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <Text>차단된 유저가 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          data={listBlockedUsers}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={7}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default BlockUsers;
