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

const SearchScreen = (props) => {
	const data = props.route.params.data;
	const [searchPhrase, setSearchPhrase] = useState('');
	const [clicked, setClicked] = useState(props.route.params.clicked | false);

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
			{!data ? (
				<ActivityIndicator
					size='large'
					color={'#0000ff'}
					style={{ flex: 1 }}
				/>
			) : (
				<List
					searchPhrase={searchPhrase}
					data={data}
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
