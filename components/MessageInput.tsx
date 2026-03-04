import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
}

export default function MessageInput({ value, onChange, onSend }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type message..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={onSend}>
        <Ionicons name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  button: {
    backgroundColor: "#6c5ce7",
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});
