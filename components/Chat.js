import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor, bubbleColors } = route.params;
  const [messages, setMessages] = useState([]);

  // Debugging: Log the colors being used
  useEffect(() => {
    console.log("Background Color:", backgroundColor);
    console.log("Bubble Colors:", bubbleColors);
  }, [backgroundColor, bubbleColors]);

  // Send messages
  const onSend = useCallback((newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  // Customize message bubble
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: bubbleColors?.right || "#2a9d8f" },
        left: { backgroundColor: bubbleColors?.left || "#fff" },
      }}
    />
  );

  // Set the navigation title
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  // Default messages
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "A I",
        },
      },
      {
        _id: 2,
        text: "Automated Notification",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  // Keyboard Avoiding View for different platforms
  const keyboardAvoidingViewProps = Platform.select({
    ios: { behavior: "padding" },
    android: { behavior: "height" },
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor || "#fff" }]}
    >
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: 1 }}
        renderBubble={renderBubble}
      />
      {Platform.OS === "android" && (
        <KeyboardAvoidingView {...keyboardAvoidingViewProps} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
});

export default Chat;
