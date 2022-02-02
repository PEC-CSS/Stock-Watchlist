import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Constants from 'expo-constants';
import FlatButton from '../shared/button';
import LoginScreen from './LoginScreen';
import useAuth from '../hooks/useAuth';
import AppIntroSlider from 'react-native-app-intro-slider';

const IntroScreen = () => {
	const [showRealApp, setshowRealApp] = useState(false);
	const { signInWithGoogle, loading } = useAuth();

	const RenderItem = ({ item }) => {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: item.backgroundColor,
					alignItems: 'center',
					justifyContent: 'center',
					paddingBottom: 100,
					marginTop: Constants.statusBarHeight,
				}}
			>
				<Text style={styles.title}>{item.title}</Text>
				<Image style={styles.image} source={item.image} />
				<Text style={styles.text}>{item.text}</Text>
				{item.key == 5 && (
					<View style={styles.logButton}>
						<Text style={styles.logButtonText}>
							{loading ? 'Loading . . . ' : 'Login to the app'}
						</Text>
						<FlatButton
							text='Sign In With Google'
							onPress={signInWithGoogle}
						/>
					</View>
				)}
			</View>
		);
	};
	return (
		<>
			{showRealApp ? (
				<LoginScreen />
			) : (
				<AppIntroSlider
					activeDotStyle={{ backgroundColor: '#30407b', width: '5%' }}
					dotStyle={{
						backgroundColor: '#eeeeee',
						width: '2%',
						height: 5,
					}}
					data={slides}
					renderItem={RenderItem}
					showSkipButton={true}
					showDoneButton={false}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 48,
		color: '#151965',
		textAlign: 'center',
		fontWeight: 'bold',
		paddingTop: 100,
		marginBottom: 10,
	},
	text: {
		fontSize: 18,
		color: '#32407b',
		textAlign: 'center',
		padding: 30,
		lineHeight: 24,
	},
	image: {
		width: 200,
		height: 200,
	},
	logButton: {
		position: 'relative',
		bottom: 80,
		alignItems: 'center',
	},
	logButtonText: {
		fontSize: 24,
		fontWeight: 'bold',
		margin: 20,
		color: '#32407b',
	},
});

const slides = [
	{
		key: 1,
		title: 'WELCOME !',
		text: 'Welcome to the #1 ads-free Stock Watchlist App, an Open Source Project by the students of ACM-CSS PEC',
		image: require('../assets/welcome.png'),
		backgroundColor: '#8cd0e2',
	},
	{
		key: 2,
		title: 'ADS FREE',
		text: 'A Stock Watchlist App, where you can keep a check on the change, with out getting interupted by ads',
		image: require('../assets/adfree.png'),
		backgroundColor: '#8cd0e2',
	},
	{
		key: 3,
		title: 'ACCURATE',
		text: 'No need to worry about wrong stats, just open the app, check the rate and invest with no fear of inaccuracy in change display.',
		image: require('../assets/accurate.png'),
		backgroundColor: '#8cd0e2',
	},
	{
		key: 4,
		title: 'EASY & USER-FRIENDLY',
		text: "With it's simple user interface, and easy to use funtions, it makes Stock research 10x Easier ",
		image: require('../assets/easytouse.png'),
		backgroundColor: '#8cd0e2',
	},
	{
		key: 5,
		title: 'GET STARTED',
		text: '',
		image: require('../assets/getstarted.png'),
		backgroundColor: '#8cd0e2',
	},
];

export default IntroScreen;
