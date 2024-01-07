import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect } from "react";
import Chat from "./Chat";
import Icon from "react-native-vector-icons/MaterialIcons";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [background, setBackground] = useState("");
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

  const handleColorSelect = (color) => {
    setBackground(color);
  };

  const backimage = require("../assets/backgroundimage.png");
  // Background image for the whole screen
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "null"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100}
    >
      <ImageBackground
        source={backimage}
        resizeMode="cover"
        style={styles.bigContainer}
      >
        <Text style={styles.title}>Chitchat App</Text>

        <View style={styles.whiteContainer}>
          <Icon
            name="person"
            size={25}
            color="#757083"
            style={styles.iconStyle}
          />
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />

          <Text style={styles.selectedColorText}>Choose Background Color:</Text>
          <View style={styles.colorContainer}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color },
                  color === background && styles.selectedColor,
                ]}
                onPress={() => handleColorSelect(color)}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.buttonStart}
            onPress={() =>
              navigation.navigate("Chat", {
                name: name,
                backgroundColor: background,
              })
            }
          >
            <Text style={styles.textButton}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bigContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    position: "absolute",
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    top: 110,
  },
  whiteContainer: {
    position: "relative",
    width: "88%",
    height: "auto",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 30,
  },
  textInput: {
    width: "88%",
    borderWidth: 2,
    padding: 15,
    margin: 10,
    borderColor: "#757083",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
    paddingLeft: 45,
  },
  iconStyle: {
    position: "absolute",
    top: 26,
    left: 35,
    zIndex: 1,
    opacity: 0.7,
  },
  selectedColorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    alignSelf: "flex-start",
    marginLeft: 20,
    opacity: 1,
    marginTop: 25,
  },
  colorContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginLeft: 10,
  },
  colorCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    margin: 10,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: "#757083",
    opacity: 0.7,
  },
  buttonStart: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    backgroundColor: "#757083",
    padding: 20,
    width: "88%",
    borderRadius: 2,
    justifyContent: "center",
  },
  textButton: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Start;
