import React from 'react';
import {
	Image,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

// definition of the Item, which will be rendered in the FlatList
const Item = ({ item }) => {
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
		</View>
	);
};

const NoItemFound = ({ searchPhrase }) => {
	return (
		<View style={styles.imageContainer}>
			<Image
				style={styles.image}
				source={require('../../../assets/search-result-not-found-2130361-1800925.png')}
			/>
			<Text style={styles.notFoundText}>
				Sorry, No results found for "{searchPhrase}"
			</Text>
		</View>
	);
};

const List = (props) => {
	const filterData = (data) => {
		return data.filter(
			(item) =>
				props.searchPhrase === '' ||
				item.name
					.toUpperCase()
					.includes(
						props.searchPhrase
							.toUpperCase()
							.trim()
							.replace(/\s/g, '')
					) ||
				item.symbol
					.toUpperCase()
					.includes(
						props.searchPhrase
							.toUpperCase()
							.trim()
							.replace(/\s/g, '')
					)
		);
	};

	return (
		<SafeAreaView style={styles.list__container}>
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={props.refreshing}
						onRefresh={props.onRefresh}
					/>
				}
			>
				<View
					onStartShouldSetResponder={() => {
						props.setClicked(false);
					}}
				>
					{!filterData(props.data).length ? (
						<NoItemFound searchPhrase={props.searchPhrase} />
					) : (
						filterData(props.data).map((item) => (
							<Item key={item.id} item={item} />
						))
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default List;

const styles = StyleSheet.create({
	list__container: {
		margin: 10,
		height: '85%',
		width: '100%',
	},
	item: {
		margin: 30,
		borderBottomWidth: 2,
		borderBottomColor: 'lightgrey',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 5,
		fontStyle: 'italic',
	},
	image: {
		alignSelf: 'center',
		resizeMode: 'center',
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		flexDirection: 'column',
	},
	notFoundText: {
		textAlign: 'center',
	},
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
	},
	rate: {
		textAlign: 'center',
		fontWeight: '400',
		color: 'white',
	},
	subTitle: {
		color: '#6e6969',
	},
	price: {
		fontWeight: '600',
		fontSize: 16,
	},
});
