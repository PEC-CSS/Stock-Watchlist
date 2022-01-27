import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Listcard from '../components/Listcard';
import * as data from '../static/data/db.json';
import Constants from 'expo-constants';
import Header from '../components/header/headerLoginPage';
import Navbar from '../components/navbar/navbarBottom';



export default function StockScreen() {
	const currencies = data.currencies;

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<FlatList
				data={currencies}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Listcard
						title={item.symbol}
						subTitle={item.name}
						image={item.image}
						onPress={() => console.log(item)}
						price={item.price}
						changeRate={item.changeRate}
					/>
				)}
			/>
			<Navbar />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#F0F8FF',
	},
    container: {
		margin: 15,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		width: '90%',
	},
	searchBar__unclicked: {
		padding: 10,
		flexDirection: 'row',
		width: '95%',
		backgroundColor: '#d9dbda',
		borderRadius: 15,
		alignItems: 'center',
	},
	input: {
		fontSize: 20,
		marginLeft: 10,
		width: '90%',
	},
});
