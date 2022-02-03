import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import StackNavigator from './routes/StackNavigator';
import { AuthProvider } from './hooks/useAuth';

export default function App() {
	return (
		<NavigationContainer>
			<AuthProvider>
				<RootSiblingParent>
					<StackNavigator />
				</RootSiblingParent>
			</AuthProvider>
		</NavigationContainer>
	);
}
