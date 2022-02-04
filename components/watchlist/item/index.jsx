import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const WatchListItem = ({ item, match, updateWatchlistData }) => {
	const image = `https://messari.io/asset-images/${item.id}/128.png`;
	const price =
		item.metrics.market_data.price_usd < 1.01
			? Math.round(item.metrics.market_data.price_usd * 1000000) / 1000000
			: Math.round(item.metrics.market_data.price_usd * 100) / 100;
	const changeRate =
		Math.round(
			item.metrics.market_data.percent_change_usd_last_24_hours * 100
		) / 100;

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: image }}
				style={{ width: 50, height: 50, borderRadius: 35 }}
			/>
			<View style={styles.detailsContainer}>
				<Text numberOfLines={1} style={styles.title}>
					{item.name}
				</Text>
				<Text numberOfLines={1} style={styles.subTitle}>
					{item.symbol}
				</Text>
			</View>
			<View style={styles.leftdetailsContainer}>
				<Text numberOfLines={1} style={styles.price}>
					${price}
				</Text>
				<View
					style={{
						backgroundColor: changeRate > 0 ? '#00E59F' : '#FC7682',
						borderRadius: 10,
						paddingVertical: 6,
						position: 'absolute',
						marginTop: 20,
						right: 0,
						width: 68,
						textAlign: 'center',
					}}
				>
					<Text numberOfLines={1} style={styles.rate}>
						{changeRate}%
					</Text>
				</View>
			</View>
			<FontAwesome
				name={match ? 'bookmark' : 'bookmark-o'}
				size={24}
				color='black'
				onPress={() => updateWatchlistData(match, item.symbol)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		padding: 15,
		backgroundColor: '#f0f8ff',
		borderBottomWidth: 1,
		borderBottomColor: 'white',
	},
	detailsContainer: {
		flex: 1,
		marginLeft: 10,
		justifyContent: 'flex-end',
	},
	leftdetailsContainer: {
		alignSelf: 'flex-start',
		marginTop: 2,
		marginRight: 10,
	},
	rate: {
		textAlign: 'center',
		fontWeight: '400',
		color: 'white',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 5,
		fontStyle: 'italic',
	},
	subTitle: {
		color: '#6e6969',
	},
	price: {
		fontWeight: '600',
		fontSize: 16,
	},
});

export default WatchListItem;
