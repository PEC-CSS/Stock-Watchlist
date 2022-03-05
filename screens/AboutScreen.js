import React from 'react';
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Header from '../components/header/headerLoginPage';
import { AntDesign } from '@expo/vector-icons';

export default function AboutScreen() {
	let [fontsLoaded, error] = useFonts({
		Ubuntu: require('../assets/fonts/Ubuntu-Medium.ttf'),
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<ScrollView>
				<View style={styles.header}>
					<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
						Punjab Engineering College's
					</Text>
					<Text style={styles.headerTitle}>ACM - CSS</Text>
					<Text style={styles.headerText}>
						"We are of ACM-CSS PEC, the Computer Science Society of
						PEC . Here we do everthing related to the world of
						coding ranging from Web Development to Open Source
						Contribution"
					</Text>
				</View>
				<View style={styles.body}>
					<Text style={styles.bodyTitle}>STOCK WATCHLIST</Text>
					<Text style={styles.bodyText}>
						What is Stock Watchlist about ? {'\n'} An open source
						project developed by ACM-CSS, where you can keep an eye
						on how the market changes day-to-day.
					</Text>
				</View>
				<View style={styles.contactUs}>
					<Text style={styles.contactTitle}>CONTACT US</Text>
					<TouchableOpacity>
						<View style={styles.iconContainer}>
							<View style={styles.icons}>
								<AntDesign
									name='linkedin-square'
									size={32}
									color='#161853'
									onPress={() =>
										Linking.openURL(
											'https://www.linkedin.com/company/pec-acm-student-chapter'
										)
									}
								/>
								<Text style={styles.iconText}>
									LinkedIn Page of ACM-CSS
								</Text>
							</View>
							<View style={styles.icons}>
								<AntDesign
									name='twitter'
									size={32}
									color='#161853'
									onPress={() =>
										Linking.openURL(
											'https://mobile.twitter.com/pec_acm'
										)
									}
								/>
								<Text style={styles.iconText}>
									Twitter Page of ACM-CSS
								</Text>
							</View>
							<View style={styles.icons}>
								<AntDesign
									name='github'
									size={32}
									color='#161853'
									onPress={() =>
										Linking.openURL(
											'https://github.com/PEC-CSS'
										)
									}
								/>
								<Text style={styles.iconText}>
									Github Page of ACM-CSS
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
				<View style={styles.footer}>
					<Text style={styles.footerText}>
						Github repository of our open source project
					</Text>
					<AntDesign
						name='github'
						size={48}
						color='#161853'
						onPress={() =>
							Linking.openURL(
								'https://github.com/PEC-CSS/Stock-Watchlist'
							)
						}
					/>
				</View>
			</ScrollView>
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
	header: {
		marginTop: 50,
		marginLeft: 5,
	},
	headerTitle: {
		fontFamily: 'Ubuntu',
		fontSize: 54,
		color: '#161853',
		textAlign: 'left',
		marginBottom: 20,
		paddingTop: 4,
	},
	headerText: {
		padding: 15,
		fontSize: 16,
		textAlign: 'right',
		lineHeight: 26,
	},
	body: {
		backgroundColor: '#b7ddff',
		marginTop: 40,
		paddingBottom: 30,
		paddingRight: 10,
	},
	bodyTitle: {
		fontFamily: 'Ubuntu',
		fontSize: 54,
		color: '#161853',
		textAlign: 'right',
		marginBottom: 20,
		marginTop: 50,
		paddingTop: 4,
	},
	bodyText: {
		padding: 20,
		fontSize: 16,
		textAlign: 'left',
		lineHeight: 26,
		color: 'black',
	},
	contactUs: {
		marginBottom: 50,
	},
	contactTitle: {
		fontFamily: 'Ubuntu',
		fontSize: 54,
		color: '#161853',
		marginBottom: 50,
		marginTop: 50,
		paddingTop: 4,
	},
	iconContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icons: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 5,
	},
	iconText: {
		fontSize: 18,
		marginLeft: 10,
	},
	footer: {
		backgroundColor: '#b7ddff',
		height: 200,
		marginTop: 30,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	footerText: {
		fontSize: 22,
		marginBottom: 20,
	},
});
