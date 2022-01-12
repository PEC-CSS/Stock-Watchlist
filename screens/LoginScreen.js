import React from "react";
import { Button, Text, View } from "react-native";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
    const { signInWithGoogle, loading } = useAuth();

    return (
        <View>
            <Text>{loading ? "Loading..." : "Login to the app"}</Text>
            <Button title='login' onPress={signInWithGoogle} />
        </View>
    );
};

export default LoginScreen;