import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
	TouchableHighlight,
} from 'react-native';

const Listcard = ({
	title,
	subTitle,
	image,
	IconComponent,
	onPress,
	price,
	changeRate,
	match,
	updateWatchlistData,
}) => {
	const colorfun = () => {
		if (changeRate > 0) {
			return '#00E59F';
		}
		return '#FC7682';
	};

	return (
		<TouchableHighlight underlayColor='#f8f4f4' onPress={onPress}>
			<View style={styles.container}>
				{IconComponent}
				{image && (
					<Image style={styles.image} source={{ uri: image }} />
				)}
				<View style={styles.detailsContainer}>
					<Text style={styles.title} numberOfLines={1}>
						{title}
					</Text>
					{subTitle && (
						<Text style={styles.subTitle} numberOfLines={1}>
							{subTitle}
						</Text>
					)}
				</View>
				<View style={styles.leftdetailsContainer}>
					<Text style={styles.title} numberOfLines={1}>
						${price}
					</Text>
					{subTitle && (
						<View
							style={{
								backgroundColor: colorfun(),
								borderRadius: 10,
								paddingVertical: 6,
								position: 'absolute',
								marginTop: 20,
								right: 0,
								width: 68,
								textAlign: 'center',
							}}
						>
							<Text style={styles.rate} numberOfLines={1}>
								{changeRate}%
							</Text>
						</View>
					)}
				</View>
				<FontAwesome
					name={match ? 'bookmark' : 'bookmark-o'}
					size={24}
					color='black'
					onPress={() => updateWatchlistData(match, title)}
				/>
			</View>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
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
		justifyContent: 'center',
	},
	detailsContainer: {
		flex: 1,
		marginLeft: 10,
		justifyContent: 'flex-end',
	},
	leftdetailsContainer: {
		alignSelf: 'flex-start',
		marginTop: 2,
		marginRight: 10,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 35,
	},
	rate: {
		textAlign: 'center',
		fontWeight: '400',
		color: 'white',
	},
	subTitle: {
		color: '#6e6969',
	},
	title: {
		fontWeight: '600',
		fontSize: 16,
	},
});

export default Listcard;
