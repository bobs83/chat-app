# React Native Mobile Chat App

## Project Brief

![Project Brief VS Reality ](assets/readmePics/ProjectVSReality.png)

## Approach

In this project, I closely followed the design brief to meet every job requirement with care and precision. My focus was on understanding the details and making sure the final work would would be delivered as orderd.

## Objective

To develop a mobile chat application using React Native, providing a user-friendly chat interface with image and location sharing capabilities.

## Design Specifications

- Vertical and horizontal spacing: evenly distributed
- App title: font size 45, font weight 600, font color #FFFFFF
- “Your name”: font size 16, font weight 300, font color #757083, 50% opacity
- “Choose background color”: font size 16, font weight 300, font color #757083, 100% opacity
- Color options HEX codes: #090C08; #474056; #8A95A5; #B9C6AE
- Start chatting button: font size 16, font weight 600, font color #FFFFFF, button color #757083

## Technical Requirements

- Written in React Native and developed using Expo.
- Utilizes Google Firestore Database for storing chat conversations.
- Google Firebase authentication for anonymous user authentication.
- Local storage of chats.
- Integration with phone's image library and camera for image sharing.
- Ability to read user's location data and share it in the chat.

## Features

- Easy-to-use chat room access for new users.
- Options for users to send messages, share images, and locations.
- Offline message access.
- Compatibility with screen readers for visually impaired users.
- Online and offline data storage.

## Chat App In Action - Android / IOS

![Chat App In Action - Android / IOS](assets/readmePics/ChatAppAction.png)

## Installation and Setup

To get started with chats, follow these steps:

1. **Downgrade Node.js to version "16.19.0":**
   Expo only supports Node.js versions 16 and lower. You can use a version manager like [nvm](https://github.com/nvm-sh/nvm) to manage your Node.js installations.

2. **Clone the reposetory or download the ZIP file:**
   Clone this project using Git or download the ZIP file from the project repository on GitHub.

3. **Open your terminal:**
   Navigate to the root directory of the downloaded or cloned project.

4. **Package Installation:**
   Before you can run the project, make sure to install the following packages and dependencies: in terminal:
   
```bash
npm install --save @react-navigation/native @react-navigation/native-stack
expo install react-native-screens react-native-safe-area-context
npm install react-native-gifted-chat --save
npm install firebase@9.13.0 --save
expo install @react-native-async-storage/async-storage
expo install @react-native-community/netinfo
expo install expo-image-picker
expo install expo-location
expo install react-native-maps
```


## Firebase Configuration and Using Your Own Database

To set up Firebase for your project and use your own Firebase database, follow these steps:

### Firebase Setup

1. **Sign in to Google Firebase:**
   - Go to [Google Firebase](https://firebase.google.com/).
   - Sign in or create a Google account if you don't have one.

2. **Create a Project:**
   - Create a new Firebase project. Be sure to uncheck "Enable Google Analytics for this project" during project creation.

3. **Set up Firestore Database:**
   - In the Firebase Console, navigate to "Build" > "Firestore Database."
   - Click "Create Database" and choose a region from the dropdown.
   - Start the database in production mode.

4. **Adjust Firestore Rules:**
   - In the Firebase Console, go to "Firestore Database" and navigate to the "Rules" tab.
   - Change `allow read, write: if false;` to `allow read, write: if true;` to allow read and write access for testing purposes. Be sure to configure security rules appropriately for your production use case.
   
5. **Configure Firebase Storage (optional):**
   - In the Firebase Console, navigate to "Firestore Database" and go to the "Rules" tab.
   - Change `allow read, write: if false;` to `allow read, write: if true;`, and click Publish.

### App Integration

6. **Register Your App (</>) in Project Overview:**
   - In the Firebase Console, go to your project's overview.
   - Click on "Add app" (</>) and select the appropriate platform (iOS or Android) for your project.

7. **Follow Firebase SDK Instructions:**
   - Install (MAKE SURE) the Firebase SDK by running the following command in your project directory:

     ```bash
     npm install firebase
     ```

   - (IMPORTANT) Initialize Firebase by copying and pasting the provided Firebase configuration code (starting with `const firebaseConfig =`) into the appropriate location in your `App.js` file within the downloaded repository.

### Running the Project

1. **Download the Expo app to your phone and sign up:**
   - Download the [Expo Go app](https://expo.dev/client) to your mobile device from the respective app store (iOS App Store or Google Play Store).
   - Sign up for an Expo account if you haven't already.

2. **Option 1: Run on a Physical Device:**
   - Connect your physical device to the same network as your development machine.
   - Run the following command to start the Expo development server:

     ```bash
     npx expo start
     ```

   - Open the Expo Go app on your phone, and scan the QR code displayed in your terminal to load the app on your device.

3. **Option 2: Use the Android Studio Emulator:**
   - If you prefer using an emulator, make sure you have [Android Studio](https://developer.android.com/studio) installed.
   - Create and configure an Android Virtual Device (AVD) in Android Studio.
   - Run the following command to start the Expo development server:

     ```bash
     npx expo start
     ```

   - In the Expo Developer Tools that open in your browser, click on "Run on Android device/emulator" to launch the app on your Android emulator.

Now, you should have the project up and running, and you can access and interact with the chat features.

