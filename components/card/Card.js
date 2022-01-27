import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export const Card = ({ name, symbol, image, price, changeRate }) => {
	const growth = changeRate < 0 ? '↓ ' : '↑ ';
	return (
		<TouchableOpacity style={styles.containerStyle}>
			<Image style={styles.imageStyle} source={{ uri: image }} />
			<View style={styles.textStyle}>
				<Text style={styles.symbolStyle}>{symbol}</Text>
				<Text style={styles.nameStyle}>{name}</Text>
			</View>
			<View style={styles.numStyle}>
				<Text style={styles.priceStyle}>{'$' + price}</Text>
				<Text
					style={[
						styles.changeStyle,
						{ backgroundColor: changeRate < 0 ? 'red' : 'green' },
					]}
				>
					{growth + Math.abs(changeRate) + '%'}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	containerStyle: {
		flexDirection: 'row',
		padding: 10,
		marginHorizontal: 2,
		marginVertical: 5,
		borderRadius: 30,
		elevation: 5,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.8,
		shadowRadius: 1,
	},
	imageStyle: {
		height: 70,
		width: 70,
		flex: 1,
	},
	textStyle: {
		justifyContent: 'center',
		alignContent: 'center',
		marginHorizontal: 10,
		flex: 3,
	},
	symbolStyle: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	nameStyle: {
		fontSize: 18,
	},
	numStyle: {
		justifyContent: 'center',
		alignContent: 'flex-end',
		alignItems: 'center',
		marginHorizontal: 5,
		flex: 1.1,
	},
	priceStyle: {
		fontWeight: 'bold',
		marginVertical: 5,
		fontSize: 15,
	},
	changeStyle: {
		color: 'white',
		fontWeight: 'bold',
		padding: 2,
		borderRadius: 5,
		marginVertical: 5,
	},
});
