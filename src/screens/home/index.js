import React from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

import { Context } from "../../context";

const Home = ({ navigation }) => {
  const { config, updateConfig } = React.useContext(Context);
  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"black" }}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#8929AD", "#436AAC", "#43B7B8"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("scanner")}
            style={styles.cardContainer}
          >
            <Icon style={styles.icon} name="camera" size={32} color="red" />
            <Text style={styles.label}>Quét</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("setting")}
            style={styles.cardContainer}
          >
            <View style={styles.cardContainer}>
              <Icon style={styles.icon} name="book" size={32} color="brown" />
              <Text style={styles.label}>Lịch sử</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("setting")}
            style={styles.cardContainer}
          >
            <Icon style={styles.icon} name="cog" size={32} color="black" />
            <Text style={styles.label}>Cài đặt</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => updateConfig({ ...config, token: null })}
            style={styles.cardContainer}
          >
            <Icon style={styles.icon} name="sign-out" size={32} color="black" />
            <Text style={styles.label}>Thoát</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    //marginTop: StatusBar.currentHeight,
  },
  cardContainer: {
    margin: 10,
    padding: 0,
    backgroundColor: "white",
    height: 100,
    width: 100,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 5,
  },
});
