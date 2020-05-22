import React, { useState } from "react";
import {} from "react-native";

export const Context = React.createContext();

export default Provider = (props) => {
  const [host, setHost] = useState("1a9ab9bf");

  return (
    <Context.Provider value={{ host, setHost }}>
      {props.children}
    </Context.Provider>
  );
};
