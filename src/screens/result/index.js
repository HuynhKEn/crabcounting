import React, { useState, useEffect, useContext } from "react";
import { Platform, StyleSheet, Dimensions } from "react-native";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Context } from "../../context";

const W = Dimensions.get("window").width;
const ResultScreen = ({ route, navigation }) => {
  const [image, setUri] = useState();
  const { host } = useContext(Context);
  const [datePost, set_datePost] = useState();
  const [type_, set_Type] = useState();
  const [id_Client, set_id_Client] = useState();
  const [predict, set_Predict] = useState();

  const submitHandle = async () => {
    const formData = new FormData();
    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    });
    formData.append("id_client", 1);
    formData.append("date_post", moment().unix());
    formData.append("types", "jpg");
    console.log(formData);

    //   fetch(uploadUrl, {
    //     method: 'POST',
    //     body: formData
    //     })
    //     .then(response => response.json())
    //     .then(response => {
    //       console.log('upload succes', response);
    //       alert('Upload success!');
    //     })
    //     .catch(error => {
    //       console.log('upload error', error);
    //       alert('Upload failed!');
    //     });
    // }
    axios({
      url: `https://${host}.ngrok.io/show_images/`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST",
      timeout: 2 * 60 * 1000,
    })
      .then((res) => {
        var set_datePost_convert = res["data"]["data"]["date_post"];
        var dateTime = new Date(set_datePost_convert);
        // Returns "2013-05-31T11:54:44.000Z"
        var converted_date = moment(dateTime).format("MMMM Do YYYY hh:MM:ss");
        set_datePost(converted_date);
        set_Type(res["data"]["data"]["types"]);
        set_id_Client(res["data"]["data"]["id_client"]);
        set_Predict(res["data"]["data"]["predict"]);
      })
      .catch(({ response }) => {
        //   console.log("ponse", response);
      });
  };

  useEffect(() => {
    Platform.OS === "android"
      ? setUri(route.params.uri.uri)
      : setUri(route.params.uri.uri.replace("file://", ""));
  }, []);
  useEffect(() => {
    if (image) submitHandle();
  }, [image]);

  return (
    <View>
      <Image
        source={{ uri: route.params.uri.uri }}
        style={{ width: W, height: (W * 4) / 3 }}
      />
      <View style={style.sty_Text}>
        <Text style>Date_Post: {datePost}</Text>
      </View>
      <View style={style.sty_Text}>
        <Text style>Type: {type_}</Text>
      </View>

      <View style={style.sty_Text}>
        <Text style>Predict: {predict}</Text>
      </View>
    </View>
  );
};
export default ResultScreen;
var style = StyleSheet.create({
  sty_Text: {
    marginTop: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
