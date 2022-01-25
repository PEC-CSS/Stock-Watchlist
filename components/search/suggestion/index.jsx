import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

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
}

const NoItemFound = ({ searchPhrase }) => {
    return (
        <View style={styles.imageContainer}>
            <Image 
                style={styles.image}
                source={require('../../../assets/search-result-not-found-2130361-1800925.png')}
            />
            <Text style={styles.notFoundText}>Sorry, No results found for "{searchPhrase}"</Text>
        </View>
    );
};

const List = (props) => {
    // const [found, setFound] = useState(false);

    const renderItem = ({ item }) => {
		// when no input, show all
		if (props.searchPhrase === '') {
            // setFound(true);
            return <Item item={item} />;
		}
        // filter of the name
        if (item.name.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            // setFound(true);
            return <Item item={item} />;
        }
        // filter of the description
        if (item.symbol.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            // setFound(true);
            return <Item item={item} />;
        }
        // setFound(false);
	};

	return (
		<SafeAreaView style={styles.list__container}>
			<View
				onStartShouldSetResponder={() => {
					props.setClicked(false);
				}}
			>
				<FlatList
					data={props.data}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
                {/* {!found && <NoItemFound searchPhrase={props.searchPhrase} />} */}
			</View>
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
        width: '100%',
        height: '100%',
        resizeMode: 'center',
    },
    imageContainer: {
        width: '95%',
        height: 300,
        alignSelf: 'center',
    },
    notFoundText: {
        textAlign: 'center',
    },
});
