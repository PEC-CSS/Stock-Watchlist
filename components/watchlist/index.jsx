import React, { useState, useEffect, useCallback } from 'react';
import {
	ActivityIndicator,
	Image,
	RefreshControl,
	ScrollView,
	StyleSheet,
	View,
	Text,
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
import { X_MESSARI_API_KEY } from '@env';
import WatchListItem from './item';
import useAuth from '../../hooks/useAuth';
import { db } from '../../firebase';

const NoWatchlistFound = () => {
	return (
		<View style={styles.noWatchlistFoundContainer}>
			<Image
				style={styles.image}
				source={require('../../assets/depositphotos_29671351-stock-photo-searching.jpg')}
			/>
			<Text>You seem to have no watchlists</Text>
			<Text>Create one to start tracking your favourite assets</Text>
		</View>
	);
};

const WatchList = () => {
	const { user } = useAuth();
	const docRef = doc(db, 'users', user.uid);
	const [refreshing, setRefreshing] = useState(false);
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
		getDoc(docRef).then((docSnap) => {
			setWatchlistData(docSnap.data().watchlist);
		});
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

	const filterData = (data, cryptoData) => {
		return cryptoData.filter((item) =>
			data.find((symbol) => symbol === item.symbol)
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{ flex: 1 }}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			>
				{!cryptoData.data.length ? (
					<ActivityIndicator
						size={'large'}
						color={'#0000ff'}
						style={{ flex: 1 }}
					/>
				) : !watchlistData.length ? (
					<NoWatchlistFound />
				) : (
					filterData(watchlistData, cryptoData.data).map((item) => (
						<WatchListItem
							key={item.id}
							item={item}
							match={watchlistData.includes(item.symbol)}
							updateWatchlistData={updateWatchlistData}
						/>
					))
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
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

export default WatchList;
