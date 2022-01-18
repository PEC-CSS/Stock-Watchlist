import React from "react";
import { 
    Button, 
    FlatList, 
    SafeAreaView, 
    StyleSheet,
    View,
} from "react-native";
import Listcard from "../components/Listcard";
import useAuth from "../hooks/useAuth";
import * as data from '../static/data/db.json';
import Constants from "expo-constants";
import Header from "../components/header/headerLoginPage";

export default function StockScreen() {
    const currencies = data.currencies;
    const { logout } = useAuth();

    return (
        <SafeAreaView style={styles.screen}>
            <Header />
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
            <View>
                <Button title='Logout' onPress={logout} color={'#0a2351'}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F0F8FF'
    },
});
