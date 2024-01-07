import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

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
      <Text style={{ fontSize: "30", color: "yellow" }}>Hello {name}</Text>
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
