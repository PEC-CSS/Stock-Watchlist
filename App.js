import { FlatList, SafeAreaView } from "react-native";
import Listcard from "./components/Listcard";
import * as data from "./static/data/db.json";

export default function App() {
  const currencies = data.currencies;
  return (
    <SafeAreaView>
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
