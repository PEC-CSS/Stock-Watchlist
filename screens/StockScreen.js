import React, { useState, useEffect } from 'react';
import {
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	StyleSheet,
} from 'react-native';
import { X_MESSARI_API_KEY } from '@env';
import Listcard from '../components/Listcard';
import Constants from 'expo-constants';
import Header from '../components/header/headerLoginPage';

export default function StockScreen() {
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
			.catch((error) => console.log(error))
			.finally(() => console.log(cryptoData));
	}, [a]);

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			{console.log(!cryptoData.data.length)}
			{!cryptoData.data.length ? (
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
								onPress={() => console.log(item)}
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
							/>
						)}
					/>
				</>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
	},
});
