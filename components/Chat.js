import React, { useEffect, useState } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  query,
  addDoc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, isConnected, db, navigation }) => {
  const loadCachedLists = async () => {
    const cachedLists = (await AsyncStorage.getItem("messages")) || [];
    setLists(JSON.parse(cachedLists));
  };

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

  //to push messages to storage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };
  //to get messages from storage
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  //to hide input field when user offline
  const renderInputToolBar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

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

  let unsubMessages;
  useEffect(() => {
    // when there is connection fetch data from db otherwise fetch from AsyncStorage
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      navigation.setOptions({ title: name });
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []); // tested with [isConnected] as dependency not working

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
        renderInputToolbar={renderInputToolBar}
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
