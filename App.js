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

LogBox.ignoreLogs(["@firebase/auth: Auth"]);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  //state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  // Get the network state
  const netInfo = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBZ1-dM50b-Bs7xj2_NjEHuujsI4oJDoQ8",
    authDomain: "chat-app2-e3f06.firebaseapp.com",
    projectId: "chat-app2-e3f06",
    storageBucket: "chat-app2-e3f06.appspot.com",
    messagingSenderId: "191097914131",
    appId: "1:191097914131:web:f9c40934ff80e39c7350e6",
    measurementId: "G-7WV0KNH07W",
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
