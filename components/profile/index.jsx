import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const UserComponent = ({ user }) => {
	console.log(user);
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: user.image }} />
			<Text style={styles.text}>Name: {user.name}</Text>
			<Text style={styles.text}>Email: {user.email}</Text>
			{user.phone && <Text>PHone Number: {user.phone}</Text>}
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
