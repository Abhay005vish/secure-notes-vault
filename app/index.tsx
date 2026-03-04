import { Ionicons } from "@expo/vector-icons";
import CryptoJS from "crypto-js";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "./context/AuthContext";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function NotesScreen() {
  const router = useRouter();
  const { grantUnlockAccess } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // 🔐 Generate hash from secret key (0000)
  const SECRET_HASH = CryptoJS.SHA256("0000").toString();

  const handleSearch = (text: string) => {
    setSearch(text);

    const hashedInput = CryptoJS.SHA256(text.trim()).toString();

    if (hashedInput === SECRET_HASH) {
      setSearch("");
      grantUnlockAccess(); // allow unlock screen
      router.push("/unlock"); // navigate
    }
  };

  const addNote = () => {
    if (!newTitle.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      content: newContent.trim(),
    };

    setNotes((prev) => [newNote, ...prev]);
    setNewTitle("");
    setNewContent("");
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: Note }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardContent} numberOfLines={6}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFD600" />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="black" />
        <Text style={styles.headerTitle}>Notes</Text>
        <Ionicons name="grid" size={22} color="black" />
      </View>

      {/* Search Bar (Secret Trigger Here) */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#888" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#888"
          value={search}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Notes Grid */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 15, paddingBottom: 100 }}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={28} color="black" />
      </TouchableOpacity>

      {/* Add Note Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Title"
            value={newTitle}
            onChangeText={setNewTitle}
            style={styles.modalTitle}
          />
          <TextInput
            placeholder="Write your note..."
            value={newContent}
            onChangeText={setNewContent}
            multiline
            style={styles.modalContent}
          />

          <TouchableOpacity style={styles.saveButton} onPress={addNote}>
            <Text style={{ color: "white" }}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    margin: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 40,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    width: "48%",
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardContent: {
    color: "#555",
    fontSize: 13,
  },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#FFD600",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalContent: {
    flex: 1,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#6c5ce7",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    alignItems: "center",
    padding: 10,
  },
});
