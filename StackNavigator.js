import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import useAuth from "./hooks/useAuth";
import LoginScreen from "./screens/LoginScreen";
import StockScreen from "./screens/StockScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user } = useAuth();

    return (
        <Stack.Navigator>
            {user ? (
                <Stack.Screen name="Stocks" component={StockScreen} />
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
};

export default StackNavigator;