import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from './components/card/Card'

export default function App() {
  return (
    //just added to check the rendering of card component, can remove
    <View style={styles.container}>
      <Card 
      name="Bitcoin"
      symbol="BTC"
      image="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
      price={41959.66}
      changeRate={15.31}/>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
