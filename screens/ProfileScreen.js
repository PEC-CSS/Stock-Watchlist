import React from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import useAuth, { AuthProvider } from '../hooks/useAuth';
import Constants from 'expo-constants';
import Logout from '../shared/buttonLogout';
import Header from '../components/header/headerLoginPage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import UserComponent from '../components/profile';

export default function ProfileScreen() {
	const navigation = useNavigation();
	const { user, logout } = useAuth();

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<View style={styles.container}>
				<TouchableOpacity>
					<Ionicons
						name='arrow-back-sharp'
						size={35}
						color='black'
						onPress={() => {
							navigation.navigate('Stocks', { clicked: true });
						}}
					/>
				</TouchableOpacity>
				<View style={styles.logOut}>
					<Logout text='LogOut' onPress={logout} />
				</View>
			</View>
			<UserComponent user={user} />
			<StatusBar backgroundColor='#11468f' style='light' />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#f0f8ff',
	},
	logOut: {
		position: 'relative',
		bottom: 33,
		left: 263,
	},
});
