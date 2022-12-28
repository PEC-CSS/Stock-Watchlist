import 'expo-dev-client';
import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import StackNavigator from './routes/StackNavigator';
import { AuthProvider } from './hooks/useAuth';

const MyTheme = {
	...DefaultTheme,
	colors: {
        ...DefaultTheme.colors,
		secondary: 'transparent',
		onSurface: '#ffffff',
	}
};

export default function App() {
	return (
		<NavigationContainer>
			<AuthProvider>
				<RootSiblingParent>
					<PaperProvider theme={MyTheme}>
						<StackNavigator />
					</PaperProvider>
				</RootSiblingParent>
			</AuthProvider>
		</NavigationContainer>
	);
}
