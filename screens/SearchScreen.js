import { X_MESSARI_API_KEY } from '@env';
import React, { useState, useEffect, useCallback } from 'react';
import {
	ActivityIndicator,
	SafeAreaView,
	StyleSheet,
	View,
} from 'react-native';
import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore';
import Toast from 'react-native-root-toast';
import Constants from 'expo-constants';
import Header from '../components/header/headerLoginPage';
import SearchBar from '../components/search';
import List from '../components/search/suggestion';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';

const SearchScreen = (props) => {
	const { user } = useAuth();
	const docRef = doc(db, 'users', user.uid);
	const [refreshing, setRefreshing] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [clicked, setClicked] = useState(props.route.params.clicked | false);
	const [cryptoData, setCrytpoData] = useState({ data: [] });
	const [watchlistData, setWatchlistData] = useState([]);
	getDoc(docRef).then((docSnap) => {
		if (docSnap.exists()) {
			console.log('Document data:', docSnap.data());
			if (!watchlistData) {
				setWatchlistData(docSnap.data().watchlist);
			}
		} else {
			console.log('No such document!');
			setDoc(docRef, {
				name: user.providerData[0].displayName,
				email: user.providerData[0].email,
				watchlist: [],
			});
		}
	});
	const a = 10;

	const updateWatchlistData = (match, symbol) => {
		console.log(match, symbol);
		const toastOptions = {};
		if (match) {
			// symbol present in watchlist. remove it
			let toast = Toast.show(
				`Removing ${symbol} from watchlist...`,
				toastOptions
			);
			updateDoc(docRef, {
				watchlist: arrayRemove(symbol),
			});
			Toast.hide(toast);
			Toast.show(`Removed ${symbol} from watchlist...`, toastOptions);
		} else {
			// symbol not present in watchlist. add it
			let toast = Toast.show(
				`Adding ${symbol} to watchlist...`,
				toastOptions
			);
			updateDoc(docRef, {
				watchlist: arrayUnion(symbol),
			});
			Toast.hide(toast);
			Toast.show(`Added ${symbol} to watchlist...`, toastOptions);
		}
		getDoc(docRef).then((docSnap) => {
			setWatchlistData(docSnap.data().watchlist);
		});
	};

	useEffect(() => {
		fetch(
			'https://data.messari.io/api/v2/assets?fields=id,symbol,name,metrics/market_data',
			{
				method: 'GET',
				headers: { 'x-messari-api-key': X_MESSARI_API_KEY },
			}
		)
			.then((response) => response.json())
			.then((jsonResponse) => setCrytpoData(jsonResponse))
			.catch((error) => console.log(error));
		// .finally(() => console.log(cryptoData));
	}, [a]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		fetch(
			'https://data.messari.io/api/v2/assets?fields=id,symbol,name,metrics/market_data',
			{
				method: 'GET',
				headers: { 'x-messari-api-key': X_MESSARI_API_KEY },
			}
		)
			.then((response) => response.json())
			.then((jsonResponse) => setCrytpoData(jsonResponse))
			.then(() => setRefreshing(false))
			.catch((error) => console.log(error));
		// .finally(() => console.log(cryptoData));
		getDoc(docRef).then((docSnap) => {
			setWatchlistData(docSnap.data().watchlist);
		});
	}, []);

	return (
		<SafeAreaView style={styles.root}>
			<Header />
			<View style={styles.searchBox}>
				<SearchBar
					searchPhrase={searchPhrase}
					setSearchPhrase={setSearchPhrase}
					clicked={clicked}
					setClicked={setClicked}
				/>
				{!cryptoData.data.length ? (
					<ActivityIndicator
						size='large'
						color={'#0000ff'}
						style={{ flex: 1 }}
					/>
				) : (
					<List
						searchPhrase={searchPhrase}
						data={cryptoData.data}
						setClicked={setClicked}
						refreshing={refreshing}
						onRefresh={onRefresh}
						watchlistData={watchlistData}
						updateWatchlistData={updateWatchlistData}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	root: {
		marginTop: Constants.statusBarHeight,
		backgroundColor: '#f0f8ff',
	},
	searchBox: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default SearchScreen;
