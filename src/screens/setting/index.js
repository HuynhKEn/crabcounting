import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import {Button, Input } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome";
import { Context } from "../../context";
const Setting = ({navigation}) => {
  const { config, updateConfig } = React.useContext(Context);
  const [text, changeText] = React.useState(config.host);

  function handleSetHost() {
    updateConfig({ ...config, host: text });
  }
  return (
    <View style={styles.container}>
      <Text style={{fontSize:20,margin:20,fontWeight:'bold'}}>Cập nhật URL của HOST</Text>
      <Input
        onChangeText={(text) => changeText(text)}
        value={text}
        placeholder="host"
      />
      <Button style={{margin:10}} onPress={() => handleSetHost()} title="Cập nhật" />
      <Button style={{margin:10}} onPress={()=> navigation.goBack()} title="Huỷ" buttonStyle={{backgroundColor:'red'}} />
    </View>
  );
};
export default Setting;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
});
