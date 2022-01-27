import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export default function logoutButton ( {text , onPress} ) {
    return (
        <TouchableOpacity onPress={ onPress }>
            <View style={styles.button}>
                <Text style={styles.buttonText}> {text} </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0a2351',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '25%',
    },
    buttonText: {
        color: 'white',
        fontSize: 20 ,
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 5,
    },
})
