import React from 'react';
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

// definition of the Item, which will be rendered in the FlatList
const Item = ({ item }) => {
	const { name, symbol, image, price, changeRate } = item;

	return (
		<View style={styles.item}>
			<Text style={styles.title}>{name}</Text>
			<Text style={styles.details}>{symbol}</Text>
			<Text style={styles.details}>{image}</Text>
			<Text style={styles.details}>{price}</Text>
			<Text style={styles.details}>{changeRate}</Text>
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
			<ScrollView>
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
});
