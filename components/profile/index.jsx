import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const UserComponent = ({ user }) => {
	return (
		<React.Fragment>
			<View style={styles.container}>
				{/* <Image
					style={styles.image1}
					source={{ uri: user.providerData[0].photoURL }}
				/> */}
				<Text style={styles.name}>
					{user.providerData[0].displayName}
					{/* Name: {user.providerData[0].displayName} */}
				</Text>
				<Text style={styles.text}>
					{user.providerData[0].email}
					{/* Email: {user.providerData[0].email} */}
				</Text>
				{user.providerData[0].phoneNumber && (
					<Text>
						Phone Number: {user.providerData[0].phoneNumber}
					</Text>
				)}
			</View>
			<Image
				style={styles.image}
				source={{ uri: user.providerData[0].photoURL }}
			/>
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		// justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: '#9DD6EB',
		backgroundColor: '#ffffff',
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		marginTop: -20,
		paddingTop: 20,
		overflow: 'hidden',
		flex: 1,
		alignSelf: 'stretch',
		zIndex: 5,
	},
	image: {
		width: 55,
		height: 55,
		borderRadius: 50,
		padding: 5,
		// marginTop: -45,
		zIndex: 10,
		position: 'absolute',
		top: 126.5,
		left: window.width / 2 - 27.5,
	},
	image1: {
		width: 55,
		height: 55,
		borderRadius: 50,
		padding: 5,
		marginTop: -47.5,
		zIndex: 10,
	},
	name: {
		paddingTop: 10,
		fontSize: 25,
		fontWeight: 'bold',
	},
	text: {
		paddingTop: 10,
		fontSize: 15,
		fontWeight: 'bold',
	},
});

export default UserComponent;
