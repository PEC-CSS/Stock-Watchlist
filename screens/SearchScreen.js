import React, { useState, useEffect } from 'react';
import {
	ActivityIndicator,
	SafeAreaView,
	StyleSheet,
	Text,
} from 'react-native';
import Constants from 'expo-constants';
// import HeaderLogin from '../components/header/headerLoginPage';
import SearchBar from '../components/search';
import List from '../components/search/suggestion';
import * as localdata from '../static/data/db.json';

const SearchScreen = (props) => {
    const currencies = localdata.currencies;
    // console.log(currencies);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [clicked, setClicked] = useState( props.route.params.clicked | false);
	const [fakeData, setFakeData] = useState();

	// get data from the fake api endpoint
	useEffect(() => {
		const getData = async () => {
            const url = 'https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages';
			const apiResponse = await fetch(url);
			const data = await apiResponse.json();
            // console.log(data);
			setFakeData(data);
		};
		getData();
	}, []);

	return (
		<SafeAreaView style={styles.root}>
			{/* <HeaderLogin /> */}
			{!clicked && <Text>Search for Stocks</Text>}
			<SearchBar
				searchPhrase={searchPhrase}
				setSearchPhrase={setSearchPhrase}
				clicked={clicked}
				setClicked={setClicked}
			/>
			{/* {!fakeData ? ( */}
			{!currencies ? (
				<ActivityIndicator size='large' />
			) : (
				<List
					searchPhrase={searchPhrase}
					data={currencies}
					// data={fakeData}
					setClicked={setClicked}
				/>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#F0F8FF',
	},
	root: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#F0F8FF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		width: '100%',
		marginTop: 20,
		fontSize: 25,
		fontWeight: 'bold',
		marginLeft: '10%',
	},
});

export default SearchScreen;
