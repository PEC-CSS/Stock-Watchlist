import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import Listcard from "./components/Listcard";
import * as data from "./static/data/db.json";
import Constants from "expo-constants";

export default function App() {
  const currencies = data.currencies;
  return (
    <SafeAreaView style={styles.screen}>
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
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
