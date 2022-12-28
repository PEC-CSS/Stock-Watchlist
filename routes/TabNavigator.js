import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import SearchScreen from '../screens/SearchScreen';
import StockScreen from '../screens/StockScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import WatchListScreen from '../screens/WatchListScreen';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			shifting={true}
			initialRouteName='Stocks'
			activeColor='#ffffff'
			inactiveColor='#8ea1c5'
			labelStyle={{ fontSize: 15 }}
			style={{ backgroundColor: '#0f004c' }}
			barStyle={{ backgroundColor: '#11468f' }}
		>
			<Tab.Screen
				name='Stocks'
				component={StockScreen}
				options={{
					tabBarLabel: 'Stocks',
					tabBarIcon: ({ color }) => (
						<FontAwesome name='dollar' color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name='Watchlist'
				component={WatchListScreen}
				options={{
					tabBarLabel: 'Watchlist',
					tabBarIcon: ({ color }) => (
						<Ionicons name='bookmarks' color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name='Search'
				component={SearchScreen}
				initialParams={{ clicked: true }}
				options={{
					tabBarLabel: 'Search',
					tabBarIcon: ({ color }) => (
						<FontAwesome name='search' color={color} size={23} />
					),
				}}
			/>
			<Tab.Screen
				name='AboutUs'
				component={AboutScreen}
				options={{
					tabBarLabel: 'About Us',
					tabBarIcon: ({ color }) => (
						<FontAwesome name='group' color={color} size={22} />
					),
				}}
			/>
			<Tab.Screen
				name='Profile'
				component={ProfileScreen}
				options={{
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color }) => (
						<FontAwesome name='home' color={color} size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
