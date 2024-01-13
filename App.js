// import local components
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import firebase
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore";

import { getStorage } from "firebase/storage";

//Import useNetInfo Hook
import { useNetInfo } from "@react-native-community/netinfo";

// Import useEffect Hook
import { useEffect } from "react";
// Import LogBox and Alert
import { LogBox, Alert } from "react-native";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  //state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  // Get the network state
  const netInfo = useNetInfo();

  // Enable network
  useEffect(() => {
    if (netInfo.isConnected) {
      enableNetwork(db);
    } else {
      disableNetwork(db);
    }
  }, [netInfo.isConnected]);

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCFPexLq4YReETZvDIQGKV4oou7taB5-ZE",
    authDomain: "chatapp-89900.firebaseapp.com",
    projectId: "chatapp-89900",
    storageBucket: "chatapp-89900.appspot.com",
    messagingSenderId: "392434048803",
    appId: "1:392434048803:web:e30474f230ea69c7dd3696",
    measurementId: "G-TSS9X9PM8E",
  };

  // Initialize Firebase with the configuration
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // Initialize Cloud Storage and get a reference to the service
  const storage = getStorage(app);

  //will display an alert popup if connection is lost
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
