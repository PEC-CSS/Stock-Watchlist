import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import SearchScreen from '../screens/SearchScreen';
import StockScreen from '../screens/StockScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Stocks') {
						iconName = 'rupee';
					} else if (route.name === 'Search') {
						iconName = 'search';
					} else if (route.name === 'Profile') {
						iconName = 'home';
					}

					return (
						<FontAwesome name={iconName} size={20} color={color} />
					);
				},
				tabBarStyle: { backgroundColor: '#002D62' },
			})}
		>
			<Tab.Screen name='Stocks' component={StockScreen} />
			<Tab.Screen
				name='Search'
				component={SearchScreen}
				initialParams={{ clicked: true }}
			/>
			<Tab.Screen name='Profile' component={ProfileScreen} />
		</Tab.Navigator>
	);
};

export default TabNavigator;
