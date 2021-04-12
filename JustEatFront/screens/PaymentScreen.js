import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";
import { useRoute, StackActions } from "@react-navigation/native";
import { Context as DishContext } from "../Context/dishContext";
import { Context as UserContext } from "../Context/userContext";
import { Button } from "react-native-elements";
import NetInfo from "@react-native-community/netinfo";
import Border from "../thickborder";
import Billcompo from "../components/Bill";
import Loading_compo from "../components/Loadingcompo";
import CustomWebView from "../components/CustomWebView";
import api from "../api/dishapi";
import useCart from "../hooks/useCart";
import Netinfo from "../components/Netinfo";

const PaymentScreen = ({ navigation }) => {
  const route = useRoute();
  const { state: cartState } = useContext(DishContext);
  const { state: userState, Place_Order } = useContext(UserContext);
  const [isConnected, setIsConnected] = useState(true);
  const [checked, setChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [req_status, setReq_status] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  let { deliveryFee, title, address } = route.params;
  let { toPay } = useCart(cartState, 0);

  let TotalItems = cartState.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  useEffect(() => {
    let mounted = true;
    const getClientSecret = async () => {
      try {
        setReq_status("loading");
        let response = await api.post("/pay/payViaCard", {
          email: userState.user.user.email,
          amount: (toPay + deliveryFee) * 100,
          address: address,
        });
        if (mounted) {
          setReq_status("");
          setClientSecret(response.data.clientSecret);
        }
      } catch (e) {
        console.log(e);
        setReq_status("");
      }
    };

    getClientSecret();
    return () => {
      mounted = false;
    };
  }, [cartState, isConnected]);

  useEffect(() => {
    let mounted = true;
    const placeOrder = async () => {
      setReq_status("placing_order");
      let response = await api.post("/order/place_order", {
        userName: userState.user.user.name,
        userPhone: userState.user.user.Phone,
        userAddress: address,
        restname: cartState[0]?.restname,
        dishes: cartState,
        totalCost: toPay + deliveryFee,
      });
      if (mounted && response.status === 200) {
        Place_Order(response.data.lastOrder);
        navigation.dispatch(
          StackActions.replace("Delivery", {
            restId: cartState[0]?.restid,
          })
        );
        setPaymentStatus("");
        setReq_status("");
      }
    };
    if (paymentStatus === "success") {
      placeOrder();
    }
    return () => (mounted = false);
  }, [paymentStatus]);

  useEffect(() => {
    const Subscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setIsConnected(true);
      } else setIsConnected(false);
    });

    return () => Subscribe();
  }, []);

  const Currency_Icon = () => {
    return (
      <View style={styles.cashContainer}>
        <MaterialCommunityIcons name="currency-inr" size={12} color="#00a300" />
      </View>
    );
  };

  return req_status === "loading" ? (
    <View style={styles.loadingcontainer}>
      <Loading_compo />
    </View>
  ) : isConnected ? (
    <SafeAreaView style={{ flex: 1 }}>
      {req_status === "placing_order" ? (
        <View style={styles.loadingcontainer}>
          <Loading_compo />
          <Text style={styles.loadingtext}>
            Please wait, your order is being placed...{" "}
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableHighlight
              style={{ margin: 10 }}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={15} />
            </TouchableHighlight>
            <Text
              style={{
                alignSelf: "center",
                marginHorizontal: 10,
                fontWeight: "bold",
              }}
            >
              To Pay :
            </Text>
            <MaterialCommunityIcons
              name="currency-inr"
              size={20}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              {toPay + deliveryFee}
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <FontAwesome5 name="hotel" size={20} style={styles.iconStyle} />
              <View>
                <Text style={styles.heading}>{cartState[0]?.restname}</Text>
                <View style={{ flexDirection: "row" }}>
                  {TotalItems > 1 ? (
                    <Text style={styles.normalText}>{TotalItems} items</Text>
                  ) : (
                    <Text style={styles.normalText}>{TotalItems} item</Text>
                  )}
                  <Text style={{ color: "#a9a9a9", fontSize: 12 }}>
                    {" "}
                    | ETA : 30 MINS
                  </Text>
                </View>
              </View>
            </View>
            <AntDesign
              name="arrowdown"
              size={35}
              color="#a9a9a9"
              style={{ position: "absolute", marginTop: 45, marginLeft: 3 }}
            />
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              {title.toLowerCase().includes("work") ||
              title.toLowerCase().includes("office") ? (
                <Entypo name="suitcase" size={20} style={styles.iconStyle} />
              ) : null}
              {title.toLowerCase().includes("home") ? (
                <Entypo name="home" size={20} style={styles.iconStyle} />
              ) : null}
              {title.toLowerCase().includes("other") ? (
                <Entypo
                  name="location-pin"
                  size={25}
                  style={styles.iconStyle}
                />
              ) : null}
              <View>
                <Text style={styles.heading}>{title}</Text>
                <Text style={styles.normalText}>{address}</Text>
              </View>
            </View>
            <Border height={30} />
            <Billcompo total={toPay} />
            <View style={styles.bordercontainer}>
              <Text style={styles.normalText}>Credit/Debit Cards</Text>
            </View>
            <View>
              <Text
                style={{ fontSize: 12, alignSelf: "center", marginTop: 10 }}
              >
                You can either pay via{" "}
                {<Text style={{ fontWeight: "bold" }}>CREDIT/DEBIT/VISA</Text>}{" "}
                to order
              </Text>
              <View style={{ flexDirection: "row", marginHorizontal: 35 }}>
                <Fontisto
                  name="mastercard"
                  size={20}
                  color="#a9a9a9"
                  style={{ margin: 5 }}
                />
                <Fontisto
                  name="visa"
                  size={20}
                  color="#a9a9a9"
                  style={{ margin: 5 }}
                />
                <Fontisto
                  name="american-express"
                  size={20}
                  color="#a9a9a9"
                  style={{ margin: 5 }}
                />
              </View>
              <Button
                title="Pay via card"
                buttonStyle={{
                  backgroundColor: "#00a300",
                  width: 200,
                  alignSelf: "center",
                  marginVertical: 15,
                }}
                onPress={() => setIsModalOpen(!isModalOpen)}
              />
            </View>
            <View>
              <Modal visible={isModalOpen} animationType="slide" transparent>
                <View style={styles.modalView}>
                  <CustomWebView
                    clientSecret={clientSecret}
                    checkStatus={(term) => setPaymentStatus(term)}
                    closeModal={() => {
                      setIsModalOpen(!isModalOpen);
                    }}
                  />
                  <Button
                    title="Cancel"
                    type="solid"
                    buttonStyle={{ backgroundColor: "#4dc9ff" }}
                    onPress={() => setIsModalOpen(!isModalOpen)}
                  />
                </View>
              </Modal>
            </View>
            <View style={styles.bordercontainer}>
              <Text style={styles.normalText}>PAY ON DELIVERY</Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  marginHorizontal: 5,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Currency_Icon />
                  <Text style={[styles.heading, { marginLeft: 10 }]}>Cash</Text>
                </View>
                {checked ? (
                  <Ionicons
                    name="ios-checkmark-circle"
                    size={20}
                    color="#00d100"
                  />
                ) : (
                  <Pressable onPress={() => setChecked(!checked)} hitSlop={5}>
                    <Ionicons
                      name="ios-checkmark-circle-outline"
                      size={20}
                      color="#a9a9a9"
                    />
                  </Pressable>
                )}
              </View>
              <Text
                style={{ fontSize: 12, color: "#a9a9a9", textAlign: "center" }}
              >
                Online payment recommended to reduce contact
              </Text>
              {checked ? (
                <Button
                  title="Pay with cash"
                  buttonStyle={{
                    width: 200,
                    alignSelf: "center",
                    backgroundColor: "#00a300",
                    marginVertical: 15,
                  }}
                />
              ) : null}
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  ) : (
    <Netinfo />
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  iconStyle: {
    marginHorizontal: 10,
    alignSelf: "center",
  },
  normalText: {
    color: "#a9a9a9",
    marginLeft: 20,
    fontSize: 12,
  },
  bordercontainer: {
    backgroundColor: "#f2f0f0",
    height: 50,
    justifyContent: "center",
  },
  cashContainer: {
    backgroundColor: "#c3f6c3",
    borderColor: "#00d100",
    borderWidth: 1,
    width: 25,
    alignItems: "center",
    height: 15,
    alignSelf: "center",
  },
  modalView: {
    flex: 1,
  },
  loadingtext: {
    color: "#4dc9ff",
    marginVertical: 10,
  },
});
