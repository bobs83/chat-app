import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const { backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: name || "Chat",
    });
  }, [navigation, name]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text>Chat Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
