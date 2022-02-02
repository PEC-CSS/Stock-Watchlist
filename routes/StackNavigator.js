import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import useAuth from '../hooks/useAuth';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import IntroScreen from '../screens/Intro';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	const { user } = useAuth();

	const formatUserData = (user) => {
		const data = user.providerData[0];
		return {
			name: data.displayName,
			email: data.email,
			image: data.photoURL,
			phone: data.phoneNumber,
		};
	};

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{/* <Stack.Screen name='Intro' component={IntroScreen} /> */}
			{user ? (
				<Stack.Screen
					name='Home'
					component={TabNavigator}
					initialParams={{ user: formatUserData(user) }}
				/>
			) : (
				// <Stack.Screen name='Login' component={LoginScreen}
				<Stack.Screen name='Intro' component={IntroScreen} />
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
