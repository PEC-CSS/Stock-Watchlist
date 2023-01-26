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
					source={require('../../assets/logo-circle.png')}
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
		display: 'flex',
		flexDirection: 'row',
        alignItems: 'center',
		// paddingTop: 5,
	},
	headerContent: {
		color: 'white',
		fontFamily: 'Overpass',
		fontSize: 25,
		// position: 'absolute',
		// top: 2,
		// left: '14%',
	},
	logo: {
		height: 40,
		width: 40,
		marginLeft: 9,
		marginRight: 7,
		// margin: '0 auto',
		// borderRadius: 20,
	},
});
