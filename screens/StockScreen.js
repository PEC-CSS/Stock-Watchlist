import React from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet ,TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import Listcard from '../components/Listcard';
import useAuth from '../hooks/useAuth';
import * as data from '../static/data/db.json';
import Constants from 'expo-constants';
import Header from '../components/header/headerLoginPage';

const Search = () => {
    const navigation = useNavigation();

	return (
        <View style={styles.container}>
            <View style={styles.searchBar__unclicked}>
                {/* Search Icon */}
				<Feather
					name='search'
					size={20}
					color='black'
					style={{ marginLeft: 1 }}
				/>
                {/* Input Field */}
				<TextInput
					style={styles.input}
					placeholder='Search'
					// value={props.searchPhrase}
					// onChangeText={props.setSearchPhrase}
					onFocus={() => {
                        navigation.navigate('Search', { clicked: true });
					}}
				/>
            </View>
        </View>
    );
};

export default function StockScreen() {
	const currencies = data.currencies;
	const { logout } = useAuth();

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<Search />
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
			<View>
				<Button title='Logout' onPress={logout} color={'#0a2351'} />
			</View>
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
