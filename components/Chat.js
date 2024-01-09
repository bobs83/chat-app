import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  query,
  addDoc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { name, backgroundColor, bubbleColors, userID } = route.params;
  const [messages, setMessages] = useState([]);

  // onSend function: Handles sending of a new message
  const onSend = (newMessages) => {
    // Add the first message in newMessages array to the Firestore 'messages' collection
    // db: Reference to the Firestore database
    // "messages": Name of the collection where messages are stored
    // newMessages[0]: The newest message to be sent, assuming newMessages is an array of message objects
    addDoc(collection(db, "messages"), newMessages[0]);
  };

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

  // // Default messages
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Welcom developer, I am a chatbot",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "A I",
  //       },
  //     },
  //     {
  //       _id: 2,
  //       text: "Automated Notification",
  //       createdAt: new Date(),
  //       system: true,
  //     },
  //   ]);
  // }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });
    return () => {
      if (unsubMessages) unsubMessages();
    };
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
        user={{ _id: userID, name: name }}
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
