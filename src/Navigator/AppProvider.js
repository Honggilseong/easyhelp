import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavi from './TabNavi';
import AuthStackNavi from './AuthStackNavi';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, db} from '../../firebase';
import firebase from 'firebase';

const AppProvider = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      db.collection('users').doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        {merge: true},
      );
    }
  }, [user]);
  return (
    <>
      {user ? (
        <NavigationContainer>
          <TabNavi />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AuthStackNavi />
        </NavigationContainer>
      )}
    </>
  );
};

export default AppProvider;
