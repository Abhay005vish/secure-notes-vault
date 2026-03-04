import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "./context/AuthContext";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
}

export default function ChatScreen() {
  const router = useRouter();
  const { unlocked, lock } = useAuth();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to Secret Chat 🔐",
      sender: "other",
    },
  ]);

  const flatListRef = useRef<FlatList>(null);

  // 🔐 Protect route
  useEffect(() => {
    if (!unlocked) {
      router.replace("/");
    }
  }, [unlocked]);

  if (!unlocked) return null;

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: "me",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "me" ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={22}
            color="black"
            onPress={() => {
              lock();
              router.replace("/");
            }}
          />
          <Text style={styles.headerTitle}>Secret Chat</Text>
          <Ionicons name="lock-closed" size={20} color="black" />
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 15 }}
        />

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            style={styles.input}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#FFD600",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#6c5ce7",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
  },
  messageText: {
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButton: {
    backgroundColor: "#6c5ce7",
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});
