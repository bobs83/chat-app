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
  // Extract parameters from navigation route
  const { name, backgroundColor, bubbleColors, userID } = route.params;
  // State to hold messages
  const [messages, setMessages] = useState([]);

  const onSend = async (newMessages) => {
    try {
      // Add the first message in newMessages array to the Firestore 'messages' collection
      await addDoc(collection(db, "messages"), newMessages[0]);
    } catch (error) {
      console.error("Failed to send message: ", error.message);
      // Optionally, display an error message to the user
    }
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
      console.error("Failed to cache messages: ", error.message);
      // Optionally, display an error message to the user
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

  // // Set the navigation title using useEffect
  // useEffect(() => {
  //   navigation.setOptions({ title: name });
  // }, [name, navigation]);

  // let unsubMessages;
  // useEffect(() => {
  //   // when there is connection fetch data from db otherwise fetch from AsyncStorage
  //   if (isConnected === true) {
  //     // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
  //     if (unsubMessages) unsubMessages();
  //     unsubMessages = null;

  //     navigation.setOptions({ title: name });
  //     const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  //     unsubMessages = onSnapshot(q, (documentsSnapshot) => {
  //       let newMessages = [];
  //       documentsSnapshot.forEach((doc) => {
  //         newMessages.push({
  //           id: doc.id,
  //           ...doc.data(),
  //           createdAt: new Date(doc.data().createdAt.toMillis()),
  //         });
  //       });
  //       cacheMessages(newMessages);
  //       setMessages(newMessages);
  //     });
  //   } else loadCachedMessages();

  //   // Cleanup code
  //   return () => {
  //     if (unsubMessages) unsubMessages(); // This invocation is meant to stop listening to changes in the Firestore collection initiated by the onSnapshot call earlier in the useEffect. It's not a traditional unsubscribe, but rather a way to stop the listening process initiated by onSnapshot.
  //   };
  // }, [isConnected]);

  // Fetching and caching messages from Firestore or local storage based on connectivity
  useEffect(() => {
    console.log("Setting up snapshot listener");
    let isActive = true;

    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = isConnected
      ? onSnapshot(
          messagesQuery,
          (snapshot) => {
            const newMessages = snapshot.docs.map((doc) => ({
              _id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis()),
            }));
            if (isActive) {
              console.log("Received snapshot data");
              cacheMessages(newMessages);
              setMessages(newMessages);
            }
          },
          (error) => {
            console.error("Firestore onSnapshot error: ", error);
          }
        )
      : () => {
          console.log("Unsubscribing from snapshot due to no connectivity");
        };

    if (!isConnected) {
      console.log("Loading cached messages");
      loadCachedMessages();
    }

    return () => {
      isActive = false;
      console.log("Unsubscribing from snapshot");
      unsubscribe(); // Unsubscribe when the component unmounts or isConnected changes
    };
  }, []); // Ensure useEffect is called only when db or isConnected changes

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
