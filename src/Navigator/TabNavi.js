import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavi from './HomeStackNavi';
import ProfileStackNavi from './ProfileStackNavi';
import MessageStackNavi from './MessageStackNavi';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../Assets/theme/colors';
import {GlobalContext} from '../Context/GlobalProvider';

const Tab = createBottomTabNavigator();
const TabNavi = () => {
  const {
    badgeState: {badge},
  } = useContext(GlobalContext);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.black,
        inactiveTintColor: colors.white,
        style: {backgroundColor: colors.primary},
      }}>
      <Tab.Screen
        name="홈"
        component={HomeStackNavi}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="메시지"
        component={MessageStackNavi}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="message" size={25} color={color} />
          ),
          tabBarBadge: badge,
          tabBarBadgeStyle: {
            top: 7,
            minWidth: 10,
            maxHeight: 10,
            borderRadius: 7,
            fontSize: 10,
          },
        }}
      />
      <Tab.Screen
        name="내정보"
        component={ProfileStackNavi}
        options={{
          tabBarIcon: ({color}) => <Icon name="user" size={25} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavi;
