import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function FlatButton({ text, onPress }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.button}>
				<AntDesign
					style={styles.google}
					name='google'
					size={24}
					color='white'
				/>
				<Text style={styles.buttonText}> {text} </Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#002D62',
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		fontWeight: 'bold',
		margin: 5,
	},
	google: {
		marginLeft: 10,
	},
});
