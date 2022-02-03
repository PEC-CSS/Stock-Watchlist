import React, { useState, useEffect, useCallback } from 'react';
import {
	ActivityIndicator,
	RefreshControl,
	ScrollView,
	View,
} from 'react-native';
import { X_MESSARI_API_KEY } from '@env';
import WatchListItem from './item';

const WatchList = (props) => {
	const [refreshing, setRefreshing] = useState(false);
	const data = props.data;
	const [cryptoData, setCrytpoData] = useState({ data: [] });
	const a = 10;

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
			.catch((error) => console.log(error))
			.finally(() => console.log(cryptoData));
	}, []);

	const filterData = (data, cryptoData) => {
		return cryptoData.filter((item) =>
			data.find((symbol) => symbol === item.symbol)
		);
	};
	// console.log(filterData(data.symbol, cryptoData.data));

	return (
		<View style={{ flex: 1 }}>
			<ScrollView
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
				) : (
					filterData(data.symbol, cryptoData.data).map((item) => (
						<WatchListItem key={item.id} item={item} />
					))
				)}
			</ScrollView>
		</View>
	);
};

export default WatchList;
