import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "./context/AuthContext";

export default function UnlockScreen() {
  const router = useRouter();
  const { allowUnlock, revokeUnlockAccess, unlock } = useAuth();
  const [pin, setPin] = useState("");

  // 🚨 Block direct URL access
  useEffect(() => {
    if (!allowUnlock) {
      router.replace("/");
    }
  }, []);

  const handleUnlock = () => {
    if (pin === "1234") {
      unlock();
      revokeUnlockAccess();
      router.replace("/chat");
    }
  };

  if (!allowUnlock) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFD600" />

      {/* Yellow Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} color="black" />
        <Text style={styles.headerTitle}>Vault Access</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Unlock Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Enter Secret PIN</Text>

        <TextInput
          placeholder="••••"
          secureTextEntry
          value={pin}
          onChangeText={setPin}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.button} onPress={handleUnlock}>
          <Text style={styles.buttonText}>Unlock</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    margin: 20,
    backgroundColor: "white",
    padding: 25,
    borderRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6c5ce7",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
