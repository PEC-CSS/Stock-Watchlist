import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

const Search = ({ data }) => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Stocks', { clicked: true });
				}}
			>
				<View style={styles.home}>
					<FontAwesome name='rupee' size={20} color='white' />
					<Text style={styles.text}>Stocks</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Search', {
						clicked: true,
						data: data,
					});
				}}
			>
				<View style={styles.search}>
					<Feather
						name='search'
						color='white'
						size={20}
						// onPress={() => {
						//     navigation.navigate('Search', { clicked: true });
						// }}
					/>
					<Text style={styles.text}>Search</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Profile', { clicked: true });
				}}
			>
				<View style={styles.profile}>
					<FontAwesome name='home' size={20} color='white' />
					<Text style={styles.text}>Profile</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default function navbarBottom(props) {
	return <Search {...props} />;
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#002D62',
		position: 'absolute',
		height: 53,
		width: '100%',
		bottom: 0,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontSize: 18,
	},
	home: {
		alignItems: 'center',
		paddingLeft: 25,
		paddingRight: 40,
		// borderRightWidth: 1,
		// borderRightColor: 'white',
	},
	search: {
		alignItems: 'center',
		paddingLeft: 40,
		paddingRight: 40,
		// borderRightWidth: 1,
		// borderRightColor: 'white',
	},
	profile: {
		alignItems: 'center',
		paddingLeft: 30,
		paddingRight: 30,
	},
});
