import React from 'react';
import {
	View,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Text,
	ImageBackground,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import useAuth, { AuthProvider } from '../hooks/useAuth';
import Constants from 'expo-constants';
// import Logout from '../shared/buttonLogout';
import Header from '../components/header/headerLoginPage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import UserComponent from '../components/profile';

const window = Dimensions.get('window');

const Logout = ({ text, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.button}>
				<Text style={styles.buttonText}> {text} </Text>
			</View>
		</TouchableOpacity>
	);
};

export default function ProfileScreen() {
	const navigation = useNavigation();
	const { user, logout } = useAuth();

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<View style={styles.container}>
				<ImageBackground
					source={{ uri: user.providerData[0].photoURL }}
					style={styles.imageContainer}
					resizeMode="cover"
					blurRadius={1}
				>
					<TouchableOpacity>
						<Ionicons
							name='arrow-back-sharp'
							size={35}
							color='black'
							onPress={() => {
								// console.log(JSON.stringify(user, null, 4));
								navigation.navigate('Stocks', {
									clicked: true,
								});
							}}
						/>
					</TouchableOpacity>
					<View style={styles.logOut}>
						<Logout text='LogOut' onPress={logout} />
					</View>
				</ImageBackground>
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
		zIndex: 1,
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// height: 150,
		width: window.width,
		zIndex: 2,
	},
	imageContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 100,
		width: window.width,
		zIndex: 2,
	},
	logOut: {
		// position: 'relative',
		// bottom: 33,
		// left: 263,
		// width: 350,
	},
	button: {
		backgroundColor: '#0a2351',
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 7,
	},
	buttonText: {
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		fontWeight: 'bold',
		margin: 5,
	},
});
