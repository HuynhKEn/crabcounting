import React from "react";
import {
  Button,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  StyleSheet,YellowBox 
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Icon from "react-native-vector-icons/FontAwesome";
import { Context } from "../../context";
const Setting = () => {
  const { host, setHost } = React.useContext(Context);

  const [text, changeText] = React.useState(host);
  React.useEffect(() => console.log(host), [host]);
  function handleSetHost() {
    setHost(text);
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => changeText(text)}
        value={text}
        placeholder="host"
      />
      <Button style={styles.button_style} onPress={() => handleSetHost()} title="Cập nhật" />
    </View>
  );
};
export default Setting;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
	justifyContent:"center",
	width:wp('90%'),
	marginLeft:16
  },
  button_style:{
	  	width:wp('90%')
  }
});
