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
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getAuth, signInAnonymously } from "firebase/auth";

// Component for the Start screen of the app
const Start = ({ navigation }) => {
  // Get the auth service for the default app
  const auth = getAuth();
  // State for user's name and selected background color
  const [name, setName] = useState("");
  const [background, setBackground] = useState("");
  // Array of color options for background
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

  // Function to sign in anonymously

  // After the user successfully signs in, the app transitions to the Chat screen and passes result.user.uid as a route parameter, assigning it to userID. This is the unique ID for the user that will be used to query the shopping lists from the database.
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          name: name,
          backgroundColor: background,
          userID: result.user.uid,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  // Function to set the background color
  const handleColorSelect = (color) => {
    setBackground(color);
  };

  // Background image for the screen
  const backimage = require("../assets/backgroundimage.png");

  // Main render method
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
        {/* Title of the app */}
        <Text style={styles.title}>Chitchat App</Text>

        {/* Container for user input and options */}
        <View style={styles.whiteContainer}>
          {/* Icon for the input field */}
          <Icon
            name="person"
            size={25}
            color="#757083"
            style={styles.iconStyle}
          />
          {/* Text input for the user's name */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />

          {/* Text prompting user to choose a background color */}
          <Text style={styles.selectedColorText}>Choose Background Color:</Text>
          {/* Color options */}
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

          {/* Button to start chatting */}
          <TouchableOpacity style={styles.buttonStart} onPress={signInUser}>
            <Text style={styles.textButton}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

// Stylesheet for the Start component
const styles = StyleSheet.create({
  // General background style for the app
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  // Style for the main container of the screen
  bigContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  // Style for the app's title text
  title: {
    position: "absolute",
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    top: 110,
  },
  // Style for the white container holding user inputs
  whiteContainer: {
    position: "relative",
    width: "88%",
    height: "auto",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 30,
  },
  // Style for the text input where user enters their name
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
  // Style for the icon next to the text input
  iconStyle: {
    position: "absolute",
    top: 26,
    left: 35,
    zIndex: 1,
    opacity: 0.7,
  },
  // Style for the text indicating color selection
  selectedColorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    alignSelf: "flex-start",
    marginLeft: 20,
    opacity: 1,
    marginTop: 25,
  },
  // Style for the container of color options
  colorContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginLeft: 10,
  },
  // Style for each color selection circle
  colorCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    margin: 10,
  },
  // Style for highlighting selected color
  selectedColor: {
    borderWidth: 3,
    borderColor: "#757083",
    opacity: 0.7,
  },
  // Style for the 'Start Chatting' button
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
  // Style for the text inside the 'Start Chatting' button
  textButton: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Start;
