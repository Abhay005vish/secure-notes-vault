import { StyleSheet, Text, View } from "react-native";

interface Props {
  text: string;
  timestamp: string;
  isMe: boolean;
  status?: string;
}

export default function ChatBubble({ text, timestamp, isMe, status }: Props) {
  return (
    <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.meta}>
        {timestamp} {isMe && status === "sent" ? "✓" : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  myBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#6c5ce7",
  },
  otherBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e0e0",
  },
  text: {
    color: "white",
  },
  meta: {
    fontSize: 10,
    marginTop: 4,
    color: "white",
    opacity: 0.7,
  },
});
