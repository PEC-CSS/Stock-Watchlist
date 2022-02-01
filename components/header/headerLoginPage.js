import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import Apploading from 'expo-app-loading';

export default function HeaderLogin() {
	let [fontsLoaded, error] = useFonts({
		Overpass: require('../../assets/fonts/Overpass-Bold.ttf'),
	});

	if (!fontsLoaded) {
		return <Apploading />;
	}

	return (
		<View style={styles.header}>
			<TouchableOpacity>
				<Image
					style={styles.logo}
					source={require('../../assets/logo.png')}
				/>
			</TouchableOpacity>
			<Text style={styles.headerContent}>STOCK WATCHLIST</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		height: 50,
		backgroundColor: '#11468f',
		paddingTop: 5,
	},
	headerContent: {
		position: 'absolute',
		top: 2,
		color: 'white',
		left: '14%',
		fontFamily: 'Overpass',
		fontSize: 30,
	},
	logo: {
		height: 40,
		width: 40,
		marginLeft: 5,
	},
});
