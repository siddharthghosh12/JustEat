import React, { useContext, useState, useRef } from "react";
import { Button, Divider, BottomSheet } from "react-native-elements";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  LayoutAnimation,
  UIManager,
  Platform,
  Animated,
  Linking,
  FlatList,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Context } from "../Context/userContext";
import Managecompo from "../components/manage_account";
import { SafeAreaView } from "react-native-safe-area-context";
import Border from "../thickborder";
import Ordercompo from "../components/ordercompo";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import EditInfoCompo from "../components/editinfo";

const screen_width = Dimensions.get("screen").width;
const screen_height = Dimensions.get("screen").height;
const AccountScreen = () => {
  const AnimatedView = Animated.createAnimatedComponent(MaterialIcons);
  const navigation = useNavigation();
  const { state, Logout } = useContext(Context);
  const [expanded, setexpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const Rotate_anim = useRef(new Animated.Value(0)).current;

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  )
    UIManager.setLayoutAnimationEnabledExperimental(true);

  const Img_icon = () => {
    return (
      <View style={styles.name_img}>
        <Text style={styles.name_img_text}>{state.user.user.name[0]}</Text>
      </View>
    );
  };

  //Comment
  // console.log(state?.user);
  const SendDelivered = () => {
    return (state?.user?.orders || []).filter((item) => {
      return item.delivered === true;
    });
  };

  const listHeader = () => {
    return (
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Img_icon />
            <Text style={styles.heading}>
              {state.user.user.name.toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <Text
              style={[styles.heading, { color: "#4dc9ff", marginRight: 15 }]}
            >
              edit
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Entypo
            name="dot-single"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.Text}>{state.user.user.Phone}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Entypo
            name="dot-single"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.Text}>{state.user.user.email}</Text>
        </View>
        <Divider
          style={{ margin: 15, height: 2, backgroundColor: "#ecfaff" }}
        />
        <TouchableOpacity
          onPress={() => {
            Toggle_expand();
            expanded ? Reverse_anim() : Start_anim();
          }}
        >
          <View style={styles.expandable_tile}>
            <View>
              <Text style={styles.LayoutText}>My Account</Text>
              <Text style={styles.desc}>Addresses, Favourites & others </Text>
            </View>
            <AnimatedView
              name="keyboard-arrow-right"
              size={25}
              style={{
                alignSelf: "center",
                transform: [
                  {
                    rotate: rotate,
                  },
                ],
              }}
            />
          </View>
        </TouchableOpacity>
        {expanded && (
          <TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Address")}>
              <Managecompo iconname="location" title="Manage Address" />
            </TouchableOpacity>
            <Managecompo iconname="credit-card" title="Payments" />
            <TouchableOpacity onPress={() => navigation.navigate("Favourites")}>
              <Managecompo iconname="heart" title="Favourites" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "mailto:JustEatsupport@gmail.com?subject=Get Support"
            )
          }
        >
          <Managecompo iconname="envelope" title="Send Feedback" />
        </TouchableOpacity>
        <Border height={15} />
      </View>
    );
  };

  const Toggle_expand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpanded(!expanded);
  };

  const listFooter = () => {
    return (
      <View>
        <Border height={20} />
        <TouchableOpacity style={styles.logout_cont} onPress={() => Logout()}>
          <Text style={[styles.heading, { marginTop: 15 }]}>Logout</Text>
          <AntDesign
            name="poweroff"
            size={20}
            color="black"
            style={{ margin: 15 }}
          />
        </TouchableOpacity>
        <BottomSheet isVisible={isVisible}>
          <View style={styles.bottomsheet}>
            <EditInfoCompo
              phone={state.user.user.Phone}
              email={state.user.user.email}
              closeSheet={() => setIsVisible(false)}
            />
            <Button
              title="Cancel"
              type="outline"
              onPress={() => setIsVisible(!isVisible)}
              buttonStyle={{ borderColor: "#4dc9ff", marginVertical: 10 }}
              titleStyle={{ color: "#4dc9ff" }}
            />
          </View>
        </BottomSheet>
      </View>
    );
  };

  const listEmpty = () => {
    return (
      <View style={styles.order_cont}>
        <Text style={styles.Past_order_text}>Past Orders</Text>
        <Image
          source={require("../assets/Tummy.png")}
          style={{ height: 200, width: 200, alignSelf: "center" }}
        />
        <Text style={{ alignSelf: "center", color: "#a9a9a9" }}>
          You don't have any past orders yet!!!
        </Text>
      </View>
    );
  };

  const Start_anim = () => {
    Animated.timing(Rotate_anim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const Reverse_anim = () => {
    Animated.timing(Rotate_anim, {
      toValue: 2,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const rotate = Rotate_anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["0 deg", "90 deg", "0 deg"],
  });

  return state?.user === null ? (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Food.png")}
        style={styles.image}
      />
      <Button
        title="Login / Register"
        buttonStyle={{
          width: 300,
          alignSelf: "center",
          backgroundColor: "#4dc9ff",
          borderRadius: 10,
          marginVertical: 10,
        }}
        type="solid"
        titleStyle={{ color: "#ecfaff", fontSize: 18 }}
        onPress={() => navigation.navigate("Login")}
      />
      <Divider style={{ margin: 20, height: 2, backgroundColor: "#4dc9ff" }} />
      <Managecompo iconname="envelope" title="Send Feedback" />
    </View>
  ) : (
    <SafeAreaView style={styles.account_container}>
      <FlatList
        data={SendDelivered()}
        keyExtractor={(res) => res.OrderId}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        ListEmptyComponent={listEmpty}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={1}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <Ordercompo order={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    flex: 1,
  },
  image: {
    height: screen_height / 1.5,
    width: screen_width,
    resizeMode: "cover",
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 25,
  },
  Text: {
    marginLeft: 5,
    fontWeight: "900",
    color: "#a9a9a9",
  },
  icon: {
    marginLeft: 10,
  },
  account_container: {
    marginTop: 20,
    flex: 1,
  },
  order_cont: {
    backgroundColor: "#f2f0f0",
    justifyContent: "center",
  },
  logout_cont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  Past_order_text: {
    justifyContent: "center",
    color: "black",
    marginLeft: 15,
    fontWeight: "bold",
    marginVertical: 15,
  },
  name_img: {
    backgroundColor: "#ecfaff",
    marginHorizontal: 12,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginVertical: 10,
    borderColor: "#4dc",
    borderWidth: 1,
  },
  name_img_text: {
    color: "#4dc9ff",
    fontWeight: "800",
    fontSize: 22,
  },
  LayoutText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expandable_tile: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  desc: {
    marginLeft: 5,
    color: "#a9a9a9",
    fontSize: 12,
    marginVertical: 2,
  },
  bottomsheet: {
    backgroundColor: "#fff",
    padding: 20,
  },
});

export default AccountScreen;
