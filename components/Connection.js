import React, { useState } from "react";

//import all the components we are going to use
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

let mqttAddress = ""

const Connection = (connectBroker) => {
  const navigation = useNavigation();

  const onPressCamera = () => {
    navigation.navigate("CameraScreen");
  };

  const [mqttAddress, setUserName] = useState("");
  return (
    <SafeAreaView style={styles.saveView}>
      <View style={styles.container}>
        <Text>Mqtt Connection</Text>
        <TextInput
          value={mqttAddress}
          onChangeText={(mqttAddress) => setUserName(mqttAddress)}
          placeholder={"Broker address"}
          style={styles.input}
        />
        <Text style={{ color: "blue" }}>{mqttAddress}</Text>

        <Pressable>
            <TouchableOpacity onPress={(mqttAddress)=>{connectBroker(mqttAddress)}}>
            <View
                style={[
                { borderRadius: 60, alignItems: "center" },
                styles.pressableBg,
                ]}>
                <Text style={[styles.start, styles.pressable]}>Connect</Text>
            </View>
            </TouchableOpacity>
        </Pressable>

        <Pressable>
        <TouchableOpacity onPress={onPressCamera}>
          <View
            style={[
              { borderRadius: 60, alignItems: "center" },
              styles.pressableBg,
            ]}>
            <Text style={[styles.start, styles.pressable]}>Camera</Text>
          </View>
        </TouchableOpacity>
      </Pressable>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#ffffff",
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#e8e8e8",
  },
  pressableBg: {
    backgroundColor: "black",
    width: "100%",
    height: "50%",
  },
  pressable: {
    borderRadius: 67,
    height: "100%",
    flexDirection: "row",
    padding: 10,
  },
  start: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 323,
    height: 60,
    textAlign: "center",
  },
  saveView:{
    flex: 1,
    flexDirection: "column",
  }
});

export default Connection;
