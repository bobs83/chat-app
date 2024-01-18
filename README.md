# React Native Mobile Chat App

## Brief Introduction
Welcome to the React Native Mobile Chat App! This application offers a modern and user-friendly platform for mobile communication, allowing users to easily send messages, share images, and even their location. Built with React Native and integrated with Firebase, this chat app is designed to provide a seamless chat experience on both Android and iOS devices.

## Table of Contents
- [Project Brief](#project-brief)
- [Approach](#approach)
- [Objective](#objective)
- [Design Specifications](#design-specifications)
- [Technical Requirements](#technical-requirements)
- [Features](#features)
- [Chat App In Action - Android / IOS](#chat-app-in-action---android--ios)
- [Installation and Setup](#installation-and-setup)
  - [Prerequisites](#prerequisites)
  - [Node.js Version](#nodejs-version)
  - [Project Setup](#project-setup)
- [Firebase Configuration and Using Your Own Database](#firebase-configuration-and-using-your-own-database)
  - [Firebase Setup](#firebase-setup)
  - [App Integration](#app-integration)
- [Running the Project](#running-the-project)

## Project Brief
![Project Brief VS Reality](assets/readmePics/ProjectVSReality.png)

## Approach
In this project, I closely followed the design brief to meet every job requirement with care and precision. My focus was on understanding the details and ensuring that the final work would be delivered as ordered.

## Objective
To develop a mobile chat application using React Native, providing a user-friendly chat interface with image and location sharing capabilities.

## Design Specifications
- Vertical and horizontal spacing: evenly distributed
- App title: font size 45, font weight 600, font color #FFFFFF
- "Your name": font size 16, font weight 300, font color #757083, 50% opacity
- "Choose background color": font size 16, font weight 300, font color #757083, 100% opacity
- Color options HEX codes: #090C08; #474056; #8A95A5; #B9C6AE
- Start chatting button: font size 16, font weight 600, font color #FFFFFF, button color #757083

## Technical Requirements
- Written in React Native and developed using Expo.
- Utilizes Google Firestore Database for storing chat conversations.
- Google Firebase authentication for anonymous user authentication.
- Local storage of chats.
- Integration with the phone's image library and camera for image sharing.
- Ability to read the user's location data and share it in the chat.

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

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 16.x.x): Required for running the JavaScript codebase.
- [Expo CLI](https://expo.dev/): Install it globally using `npm install -g expo-cli`. This tool is necessary for managing and testing your Expo app.
- [Watchman](https://facebook.github.io/watchman/): A file-watching service used for React Native development (recommended for macOS users).
- [Android Studio](https://developer.android.com/studio): Required for Android app development and running an Android emulator.
- [Xcode](https://developer.apple.com/xcode/): Required for iOS app development and running an iOS simulator (macOS only).

### Node.js Version

1. **Downgrade Node.js to version "16.19.0":**
   - Expo only supports Node.js versions 16 and lower. You can use a version manager like [nvm](https://github.com/nvm-sh/nvm) to manage your Node.js installations. Install and use Node.js version 16.19.0 by running:

     ```sh
     nvm install 16.19.0
     nvm use 16.19.0
     ```

### Project Setup

2. **Clone the Repository:**
   - Clone the chat app repository to your local machine by running:

     ```sh
     git clone https://github.com/bobs83/chat-app.git
     cd chat-app
     ```

3. **Install Dependencies:**
   - Before you can run the project, navigate to the project directory and install the required packages by running the following in your terminal:

     ```sh
     npm install
     ```

After completing these steps, your environment should be set up and ready for development with the chat app.

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

