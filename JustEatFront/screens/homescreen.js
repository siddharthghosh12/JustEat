import React, { useEffect, useState } from "react";
import { Text, View, Button, ScrollView, VirtualizedList } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import RestResultcompo from "../components/restaurantresultcompo";
import Netinfo from "../components/Netinfo";

const homeScreen = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const Subscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setIsConnected(true);
      } else setIsConnected(false);
    });

    return () => Subscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isConnected ? (
        <RestResultcompo title="Restaurants Nearby" />
      ) : (
        <Netinfo />
      )}
    </View>
  );
};

export default homeScreen;
