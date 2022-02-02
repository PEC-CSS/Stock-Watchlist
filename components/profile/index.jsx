import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const UserComponent = ({ user }) => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={{ uri: user.providerData[0].photoURL }}
			/>
			<Text style={styles.text}>
				Name: {user.providerData[0].displayName}
			</Text>
			<Text style={styles.text}>Email: {user.providerData[0].email}</Text>
			{user.providerData[0].phoneNumber && (
				<Text>Phone Number: {user.providerData[0].phoneNumber}</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 50,
		padding: 5,
	},
	text: {
		padding: 5,
		fontSize: 17,
	},
});

export default UserComponent;
