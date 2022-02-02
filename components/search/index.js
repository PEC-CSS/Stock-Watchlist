import React from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';

const SearchBar = (props) => {
	return (
		<View style={styles.container}>
			{/* Search Icon */}
			<Feather
				name='search'
				size={23}
				color='black'
				style={{ marginLeft: 10 }}
			/>
			{/* Input Field */}
			<TextInput
				style={styles.input}
				placeholder='Search'
				value={props.searchPhrase}
				onChangeText={props.setSearchPhrase}
				onFocus={() => {
					props.setClicked(true);
				}}
			/>
			{/* cross Icon, depending on whether the search bar is clicked or not */}
			<Entypo
				name='cross'
				size={25}
				color='black'
				style={{ paddingRight: 10 }}
				onPress={() => {
					Keyboard.dismiss();
					props.setSearchPhrase('');
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: 'row',
		width: '95%',
		backgroundColor: '#d9dbda',
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	input: {
		fontSize: 22,
		paddingLeft: 20,
		width: '90%',
	},
});

export default SearchBar;
