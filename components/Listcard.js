import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
} from "react-native";

function Listcard({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  price,
  changeRate,
}) {
  return (
    <TouchableHighlight underlayColor="#f8f4f4" onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image style={styles.image} source={{ uri: image }} />}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subTitle && (
            <Text style={styles.subTitle} numberOfLines={1}>
              {subTitle}
            </Text>
          )}
        </View>
        <View style={styles.leftdetailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            ${price}
          </Text>
          {subTitle && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {changeRate}
            </Text>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "flex-end",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: "#6e6969",
  },
  title: {
    fontWeight: "500",
  },
});

export default Listcard;
