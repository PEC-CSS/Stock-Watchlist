import React from "react";
import { Button, FlatList, SafeAreaView, View } from "react-native";
import Listcard from "../components/Listcard";
import useAuth from "../hooks/useAuth";
import * as data from '../static/data/db.json';

export default function StockScreen() {
    const currencies = data.currencies;
    const { logout } = useAuth();

    return (
        <SafeAreaView>
            <View>
                <Button title='Logout' onPress={logout} />
            </View>
            <FlatList 
                data={currencies}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Listcard 
                        title={item.symbol}
                        subTitle={item.name}
                        image={item.image}
                        onPress={() => console.log(item)}
                        price={item.price}
                        changeRate={item.changeRate}
                    />
                )}
            />
        </SafeAreaView>
    );
};