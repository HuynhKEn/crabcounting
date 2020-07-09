import React, { useState, useEffect, useContext } from "react";
import * as ImagePicker from "expo-image-picker";

import {
  Alert,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Slider } from "react-native-elements";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import moment from "moment";
import axios from "axios";
import { Context } from "../../context";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

const CameraScreen = ({ navigation }) => {
  let RefCamera;
  const { config } = useContext(Context);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [list, addList] = useState([]);
  const [disableSnap, setSnap] = useState(false);
  const [zoomValue, setZoomValue] = useState(0);
  async function requestPermission() {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA
    );
    setHasPermission(status === "granted");
  }

  useEffect(() => {
    requestPermission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    Alert.alert("Lỗi", "Bạn chưa cấp quyền cho ứng dụng");
    navigation.goBack();
  }

  const takePicture = async () => {
    const photo = await RefCamera.takePictureAsync({ skipProcessing: true });
    const manipResult = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { height: 1024, width: 768 } }, { rotate: 90 }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    request(manipResult);
  };

  const pickImage = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!photo.cancelled) {
      setSnap(true);
      const manipResult = await ImageManipulator.manipulateAsync(
        photo.uri,
        [
          {
            resize:
              photo.height > photo.width
                ? { height: 1024, width: 768 }
                : { width: 1024, height: 768 },
          },
          { rotate: photo.height > photo.width ? 90 : 0 },
        ],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );

      request(manipResult);
    }
  };

  const request = (image) => {
    let uri =
      Platform.OS === "android" ? image.uri : image.uri.replace("file://", "");

    const formData = new FormData();
    formData.append("file", {
      uri: uri,
      type: "image/jpeg",
      name: "image.jpg",
    });
    formData.append("id_client", 1);
    formData.append("date_post", moment().unix());
    formData.append("types", "jpg");
    axios({
      url: `${config.host}/api/predict`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST",
      timeout: 2 * 60 * 1000,
    })
      .then(({ data }) => {
        console.log(data);
        addList([
          { filename: data.filename, predict: data.predict, uri: uri },
          ...list,
        ]);
        setSnap(false);
      })
      .catch(({ response }) => {
        console.log("error", response);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "black", justifyContent: "flex-end" }}>
        <Camera
          style={{
            width: width,
            height: width * (4 / 3),
          }}
          ratio={"4:3"}
          type={type}
          zoom={zoomValue}
          ref={(ref) => {
            RefCamera = ref;
          }}
          flashMode={flash}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.textBtn}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.textBtn}>Ghi</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "column",
              }}
            >
             
                <Slider
                  value={zoomValue}
                  onValueChange={(value) => setZoomValue(value)}
                  style={{marginHorizontal:80}}
                />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={[styles.button, { alignSelf: "flex-end" }]}
                  onPress={() => pickImage()}
                  disabled={disableSnap}
                >
                  <Ionicons name="md-folder" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgba(0,0,0,0)",
                    height: 70,
                    width: 70,
                    marginBottom: 10,
                    borderRadius: 35,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "red",
                    borderWidth: 2,
                  }}
                  disabled={disableSnap}
                  onPress={() => {
                    //Delay to snap
                    setSnap(true);

                    takePicture();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: disableSnap ? "white" : "red",
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator animating={disableSnap} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    flash == Camera.Constants.FlashMode.off
                      ? setFlash(Camera.Constants.FlashMode.on)
                      : setFlash(Camera.Constants.FlashMode.off);
                  }}
                >
                  {flash == Camera.Constants.FlashMode.off ? (
                    <Ionicons name="md-flash-off" size={32} color="white" />
                  ) : (
                    <Ionicons name="md-flash" size={32} color="white" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Camera>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          scrollToOverflowEnabled={true}
          data={list}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View>
              <Image
                source={{ uri: item.uri }}
                style={{
                  height: 100,
                  width: 100,
                  margin: 10,
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderRadius: 10,
                    padding: 2,
                    backgroundColor: "grey",
                    top: 25,
                    right: 25,
                  }}
                >
                  <Text
                    style={{ fontSize: 20, color: "white" }}
                  >{`#${item.predict}`}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default CameraScreen;
const styles = StyleSheet.create({
  button: {
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    fontSize: 20,
    padding: 10,
    color: "white",
    fontWeight: "bold",
  },
});
