import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function HomeScreen() {
	let [fontsLoaded, error] = useFonts({
		'Architects-Daughter': require('../assets/fonts/ArchitectsDaughter-Regular.ttf'),
		'Montserrat-Alternates': require('../assets/fonts/MontserratAlternates-ExtraBold.ttf'),
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<SafeAreaView style={s1.screen}>
			<View style={s1.bod}>
				<Header />
				<View>
					<Text>PEC</Text>
					<Text>ACM - CSS</Text>
				</View>
				<View>
					<Text style={s1.stock}>STOCK</Text>
					<Text style={s1.watchlist}>WATCHLIST</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}

const s1 = StyleSheet.create({
	bod: {
		position: 'absolute',
		top: 6,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#F0F8FF',
	},
	stock: {
		textAlign: 'center',
		fontSize: 48,
		justifyContent: 'space-between',
		fontFamily: 'Architects-Daughter',
	},
	watchlist: {
		textAlign: 'center',
		fontSize: 48,
		fontFamily: 'Montserrat-Alternates',
	},
	screen: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
	},
});
