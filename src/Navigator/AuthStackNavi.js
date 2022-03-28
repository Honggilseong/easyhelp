import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LOGIN, REGISTER} from '../Constants/routeNames';
import Login from '../Screen/Login';
import Register from '../Screen/Register';

const AuthStack = createStackNavigator();
const AuthStackNavi = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={LOGIN} component={Login} />
      <AuthStack.Screen name={REGISTER} component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavi;
