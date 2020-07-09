import React, { useContext, useState, useReducer, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { View, Text, ImageBackground } from "react-native";
import styles from "./style";
import { Context } from "../../context";
import axios from "axios";

export default Index = (props) => {
  const { config, updateConfig } = React.useContext(Context);
  const [values, setValues] = React.useState({
    username: "lucky",
    password: "1",
  });
  const [status, setStatus] = useState(null);
  const [submit, setSubmit] = useState(false);

  const onChangeHanlde = (key, value) => {
    setValues({ ...values, [key]: value });
  };

  const submitHandle = () => {
    setSubmit(true);
    if (values.username && values.password) {
      axios
        .post(`${config.host}/api/auth/login`, {
          username: values.username,
          password: values.password,
        })
        .then(({ data }) => {
          updateConfig({ ...config, token: data.token });
          axios.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        })
        .catch((err) => {
          alert("User name or password is invalid");
        });
    }
  };

  return (
    <ImageBackground
	  style={ styles.image_}
      source={require("../../../assets/logo.png")}
    >
      <View style={styles.container}>
        <Text style={styles.subTitle}>{`ỨNG DỤNG`}</Text>
        <Text style={styles.title}>{`ĐẾM CUA GIỐNG`}</Text>
        <View style={styles.fromX}>
          <Input
            placeholder={"Số điện thoại"}
            value={values.username}
            onChangeText={(t) => onChangeHanlde("username", t)}
            type={"username"}
            leftIcon={
              <Icon name="user" size={24} color="white" style={styles.icon} />
            }
            containerStyle={styles.input}
            placeholderTextColor="lightgrey"
            inputStyle={{ color: "white" }}
          />

          <Input
            value={values.password}
            onChangeText={(t) => onChangeHanlde("password", t)}
            type={"password"}
            placeholder={"Mật khẩu"}
            secureTextEntry={true}
            leftIcon={
              <Icon name="key" size={24} color="white" style={styles.icon} />
            }
            placeholderTextColor="lightgrey"
            inputStyle={{ color: "white" }}
            containerStyle={styles.input}
          />

          <Button
            title={"Đăng nhập"}
            containerStyle={styles.login}
            onPress={submitHandle}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
