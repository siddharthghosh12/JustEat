import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { Divider, Button } from "react-native-elements";
import { Context as dishContext } from "../Context/dishContext";
import { useNavigation } from "@react-navigation/native";

const arrMonth = [
  { index: 1, Month: "Jan" },
  { index: 2, Month: "Feb" },
  { index: 3, Month: "Mar" },
  { index: 4, Month: "Apr" },
  { index: 5, Month: "May" },
  { index: 6, Month: "Jun" },
  { index: 7, Month: "Jul" },
  { index: 8, Month: "Aug" },
  { index: 9, Month: "Sep" },
  { index: 10, Month: "Oct" },
  { index: 11, Month: "Nov" },
  { index: 12, Month: "Dec" },
];

const Ordercompo = ({ order }) => {
  const { addToCart } = useContext(dishContext);
  const navigation = useNavigation();

  const getTotal = order?.dishes.reduce((sum, item) => {
    return sum + item.quantity * item.Price;
  }, 0);

  const DeliveredAt = new Date(order.deliveredAt);
  const delMonth = function () {
    let dateindex = arrMonth.findIndex(
      (item) => item.index === DeliveredAt.getMonth() + 1
    );
    return arrMonth[dateindex].Month;
  };
  const delDate = DeliveredAt.getDate();
  const timeStamp = function () {
    let timeString =
      DeliveredAt.getHours() + 1 >= 12
        ? "24" - DeliveredAt.getHours() + 1
        : String(DeliveredAt.getHours() + 1);
    timeString = timeString + ":" + DeliveredAt.getMinutes();
    timeString =
      DeliveredAt.getHours() + 1 >= 12
        ? timeString + " PM"
        : timeString + " AM";
    return timeString;
  };

  //console.log(order);
  const handleReorder = () => {
    let i;
    for (i = 0; i < order.dishes.length; i++) {
      let item = {
        restid: order.restId,
        restname: order.restName,
        restimg: order.restimg,
        dish: order.dishes[i],
        quantity: order.dishes[i].quantity,
      };

      addToCart(item);
      navigation.navigate("CART");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.heading}>{order.restName}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 14, fontWeight: "900" }}>Delivered</Text>
          <AntDesign
            name="checkcircle"
            size={15}
            color="#00d100"
            style={styles.iconStyle}
          />
        </View>
      </View>
      <View style={styles.Pricecontainer}>
        <FontAwesome
          name="rupee"
          size={15}
          color="#dcdcdc"
          style={styles.iconStyle}
        />
        <Text style={styles.Text}>{getTotal}</Text>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={20}
          color="#dcdcdc"
          style={styles.iconStyle}
        />
      </View>
      <Divider style={{ backgroundColor: "#dcdcdc", marginVertical: 10 }} />
      <Text style={styles.Text}>
        {delMonth()} {delDate}, {timeStamp()}
      </Text>
      <View style={[styles.orderStyle, { marginVertical: 10 }]}>
        {order?.dishes.map((item, index) => {
          return (
            <View key={index} style={styles.orderStyle}>
              <Text style={styles.Text}>{item.name}</Text>
              <Entypo
                name="cross"
                size={18}
                color="#dcdcdc"
                style={styles.iconStyle}
              />
              <Text style={styles.Text}>{item.quantity}</Text>
              {index === order.dishes.length - 1 ? null : (
                <Text style={styles.Text}>,</Text>
              )}
            </View>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 10,
        }}
      >
        <Button
          title="REORDER"
          type="outline"
          titleStyle={{ color: "#4dc9ff", fontSize: 14 }}
          buttonStyle={{ width: 120, borderColor: "#4dc9ff" }}
          onPress={() => handleReorder()}
        />
        <Button
          title="RATE ORDER"
          type="outline"
          titleStyle={{ color: "#000", fontSize: 14 }}
          buttonStyle={{ width: 120, borderColor: "black" }}
        />
      </View>
      <Divider
        style={{ backgroundColor: "#000", height: 1, marginVertical: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Pricecontainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    margin: 10,
  },
  Text: {
    color: "#a9a9a9",
    fontSize: 12,
  },
  orderStyle: {
    flexDirection: "row",
    marginHorizontal: 2,
    flexWrap: "wrap",
  },
  iconStyle: {
    alignSelf: "center",
    marginHorizontal: 2,
  },
});

export default Ordercompo;
