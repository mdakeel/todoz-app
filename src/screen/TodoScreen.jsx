import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { IconButton } from 'react-native-paper'

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const handleAddTodo = () => {
    if (todo.trim().length > 0) {
      const newTodo = { id: Date.now().toString(), title: todo };
      setTodos([...todos, newTodo]);
      setTodo(""); 
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo); 
    setTodo(todo.title); 
  };

  const handleSaveEditTodo = () => {
    if (editTodo) {
      const updatedTodos = todos.map((item) =>
        item.id === editTodo.id ? { ...item, title: todo } : item
      );
      setTodos(updatedTodos);
      setEditTodo(null); 
      setTodo(""); 
    }
  };

  const renderTodo = ({ item }) => {
    return (
      <View style={styles.todoData}>
        <Text style={styles.todoDataText}>{item.title}</Text>
        <IconButton icon="pencil" iconColor="#fff" onPress={() => handleEditTodo(item)} />
        <IconButton icon="trash-can" iconColor="red" onPress={() => handleDeleteTodo(item.id)} />
      </View>
    );
  };

  return (
    <View style={styles.todoContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add a Task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />
      {editTodo ? (
        <Text style={styles.addButton} onPress={handleSaveEditTodo}>
          Save Task
        </Text>
      ) : (
        <Text style={styles.addButton} onPress={handleAddTodo}>
          Add Task
        </Text>
      )}

      <FlatList data={todos} renderItem={renderTodo}  />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  todoContainer: {
    marginHorizontal: 16,
  },

  input: {
    borderWidth: 2,
    borderColor: "#1e90ff",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  addButton: {
    backgroundColor: "#000",
    color: "#ffffff",
    fontWeight: "bold",
    borderRadius: 6,
    paddingVertical: 8,
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
  },

  todoData: {
    backgroundColor: "#1e90ff",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  todoDataText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
});
