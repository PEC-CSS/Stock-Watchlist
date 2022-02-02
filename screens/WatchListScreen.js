import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Header from '../components/header/headerLoginPage';

const NoWatchlistFound = () => {
	return (
		<View style={styles.noWatchlistFoundContainer}>
			<Image
				style={styles.image}
				source={require('../assets/depositphotos_29671351-stock-photo-searching.jpg')}
			/>
			<Text>You seem to have no watchlists</Text>
			<Text>Create one to start tracking your favourite assets</Text>
		</View>
	);
};

const WatchListScreen = () => {
	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<NoWatchlistFound />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#f0f8ff',
	},
	noWatchlistFoundContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		height: 200,
		width: 200,
	},
});

export default WatchListScreen;