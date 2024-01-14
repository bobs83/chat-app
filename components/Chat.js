import CustomActions from "./CustomActions";
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
import MapView from "react-native-maps";

// Chat component: Handles the chat interface
const Chat = ({ route, isConnected, db, navigation, storage }) => {
  // Load cached lists from local storage
  const loadCachedLists = async () => {
    const cachedLists = (await AsyncStorage.getItem("messages")) || [];
    setLists(JSON.parse(cachedLists));
  };

  // Extract parameters from navigation route
  const { name, backgroundColor, bubbleColors, userID } = route.params;
  // State to hold messages
  const [messages, setMessages] = useState([]);

  // onSend function: Handles sending of a new message
  const onSend = (newMessages) => {
    // Add the first message in newMessages array to the Firestore 'messages' collection
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // Customize message bubble appearance
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: bubbleColors?.right || "#2a9d8f" },
        left: { backgroundColor: bubbleColors?.left || "#fff" },
      }}
    />
  );

  // Function to cache messages in local storage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to load messages from local storage
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  // Conditional rendering of input toolbar based on connectivity
  const renderInputToolBar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // Render custom actions (like sending images, etc.)
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  // Render custom view for messages (like map view for location messages)
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  // Set the navigation title using useEffect
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  // Fetching and caching messages from Firestore or local storage based on connectivity
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
  }, [isConnected]); // Dependency array

  // Keyboard Avoiding View for different platforms
  const keyboardAvoidingViewProps = Platform.select({
    ios: { behavior: "padding" },
    android: { behavior: "height" },
  });

  // Main component rendering
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: backgroundColor || "#fff" }]}
    >
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolBar}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" && (
        <KeyboardAvoidingView {...keyboardAvoidingViewProps} />
      )}
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
});

export default Chat;
