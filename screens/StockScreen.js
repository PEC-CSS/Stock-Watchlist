import React, { useState, useEffect, useCallback } from 'react';
import {
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
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
import Listcard from '../components/Listcard';
import Constants from 'expo-constants';
import Header from '../components/header/headerLoginPage';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';

export default function StockScreen() {
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

	console.log(watchlistData);
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

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			{!cryptoData.data.length && !watchlistData ? (
				<ActivityIndicator
					size={'large'}
					color={'#0000ff'}
					style={{ flex: 1 }}
				/>
			) : (
				<>
					{/* <Search data={cryptoData.data} /> */}
					<FlatList
						data={cryptoData.data}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Listcard
								title={item.symbol}
								subTitle={item.name}
								image={`https://messari.io/asset-images/${item.id}/128.png`}
								onPress={() =>
									console.log(item.symbol, watchlistData)
								}
								price={
									item.metrics.market_data.price_usd < 1.01
										? Math.round(
												item.metrics.market_data
													.price_usd * 1000000
										  ) / 1000000
										: Math.round(
												item.metrics.market_data
													.price_usd * 100
										  ) / 100
								}
								changeRate={
									Math.round(
										item.metrics.market_data
											.percent_change_usd_last_24_hours *
											100
									) / 100
								}
								match={watchlistData.includes(item.symbol)}
								updateWatchlistData={updateWatchlistData}
							/>
						)}
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				</>
			)}
			<StatusBar backgroundColor='#11468f' style='light' />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
	},
});
