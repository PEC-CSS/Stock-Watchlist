import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Linking,
	Image,
	TouchableOpacity,
} from 'react-native';
import useAuth from '../hooks/useAuth';
import FlatButton from '../shared/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/header/headerLoginPage';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons';

const LoginScreen = () => {
	const { signInWithGoogle, loading } = useAuth();

	let [fontsLoaded, error] = useFonts({
		Overpass: require('../assets/fonts/Overpass-ExtraBold.ttf'),
		'Overpass-light': require('../assets/fonts/Overpass-Light.ttf'),
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<ScrollView>
				<Text style={styles.slogan}>CHECK BEFORE YOU INVEST</Text>
				<View style={styles.imageContainer}>
					<Image
						style={styles.image}
						source={require('../assets/stock.png')}
					/>
				</View>
				<View style={styles.logButton}>
					<Text style={styles.logButtonText}>
						{loading ? 'Loading . . . ' : 'Login to the app'}
					</Text>
					<FlatButton
						text='Sign In With Google'
						onPress={signInWithGoogle}
					/>
				</View>
				<View style={styles.footer}>
					<Text style={styles.footerText}>
						This is an open source project made by student branch of
						ACM-CSS of Punjab Engineering College.
					</Text>
					<TouchableOpacity>
						<View style={styles.icons}>
							<AntDesign
								name='linkedin-square'
								size={24}
								color='white'
								onPress={() =>
									Linking.openURL(
										'https://www.linkedin.com/company/pec-acm-student-chapter'
									)
								}
							/>
							<AntDesign
								name='twitter'
								size={24}
								color='white'
								onPress={() =>
									Linking.openURL(
										'https://mobile.twitter.com/pec_acm'
									)
								}
							/>
							<AntDesign
								name='github'
								size={24}
								color='white'
								onPress={() =>
									Linking.openURL(
										'https://github.com/PEC-CSS'
									)
								}
							/>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		marginTop: 0,
		backgroundColor: '#f0f8ff',
	},
	imageContainer: {
		width: '95%',
		height: 400,
		alignSelf: 'center',
		marginTop: 30,
		backgroundColor: 'white',
		borderRadius: 30,
	},
	image: {
		width: '90%',
		height: '90%',
		alignSelf: 'center',
	},
	slogan: {
		textAlign: 'center',
		fontFamily: 'Overpass',
		fontSize: 48,
		marginTop: 25,
		lineHeight: 55,
	},
	logButton: {
		alignItems: 'center',
	},
	logButtonText: {
		fontSize: 24,
		fontWeight: 'bold',
		margin: 20,
	},
	footer: {
		backgroundColor: '#0a2351',
		height: 200,
		marginTop: 30,
	},
	footerText: {
		color: 'white',
		fontFamily: 'Overpass-light',
		fontSize: 18,
		marginTop: 30,
		textAlign: 'center',
	},
	icons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
	},
});

export default LoginScreen;
