import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import Chat from "./Chat";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const colors = ["#FFFFFF", "#FFDFD3", "#FED2AA", "#FAE0E4", "#D8E2DC"];

  const handleColorSelect = (color) => {
    // Navigate to Chat screen with selected color and user's name
    navigation.navigate("Chat", { backgroundColor: color, userName: name });
  };

  const backgroundimage = {
    uri: "https://i.pinimg.com/originals/03/08/dc/0308dc58918fdc664d7eac00e3861c8a.jpg",
  };

  return (
    <ImageBackground
      source={backgroundimage}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.container}>
        <Text>Welcome to the Chat app!</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Type your username here"
        />

        <Button
          title="Start Chatting"
          onPress={() => navigation.navigate("Chat", { name: name })}
        />
      </View>
      <Text>Choose Background Color:</Text>
      <View style={styles.colorContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorCircle, { backgroundColor: color }]}
            onPress={() => handleColorSelect(color)}
          />
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  colorContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
});

export default Start;
