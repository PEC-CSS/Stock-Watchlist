import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import useAuth from '../hooks/useAuth';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	const { user } = useAuth();

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{user ? (
				<Stack.Screen name='Home' component={TabNavigator} />
			) : (
				<Stack.Screen name='Login' component={LoginScreen} />
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
