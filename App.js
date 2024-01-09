// import local components
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

export default function App() {
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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
