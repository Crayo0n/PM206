import React, { useState, useEffect } from 'react';
import {StyleSheet,View,Text,TextInput,Pressable,FlatList,ActivityIndicator,Alert,ImageBackground,SafeAreaView,} from 'react-native';

export default function App() {
  // Estados de control
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Estados del formulario
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [books, setBooks] = useState([]);

  const backgroundImageUri = 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1080&h=1920&q=80';
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddBook = () => {
    if (!title.trim() || !author.trim() || !genre.trim()) {
      Alert.alert('Alert', 'Todos los campos son obligatorios.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newBook = {
        id: Date.now().toString(),
        title: title.trim(),
        author: author.trim(),
        genre: genre.trim(),
      };

      setBooks((prevBooks) => [newBook, ...prevBooks]);
      setTitle('');
      setAuthor('');
      setGenre('');
      setIsLoading(false);

      Alert.alert('Alert', `Libro guardado correctamente`);
    }, 4000);
  };

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Bienvenido</Text>
        <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: backgroundImageUri }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.mainTitle}>Catálogo de Libros</Text>

          <View style={styles.formCard}>
            <TextInput
              style={styles.input}
              placeholder="Título del libro"
              placeholderTextColor="#7f8c8d"
              value={title}
              onChangeText={setTitle}
              editable={!isLoading}
            />
            <TextInput
              style={styles.input}
              placeholder="Autor"
              placeholderTextColor="#7f8c8d"
              value={author}
              onChangeText={setAuthor}
              editable={!isLoading}
            />
            <TextInput
              style={styles.input}
              placeholder="Género"
              placeholderTextColor="#7f8c8d"
              value={genre}
              onChangeText={setGenre}
              editable={!isLoading}
            />

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
                isLoading && styles.buttonDisabled,
              ]}
              onPress={handleAddBook}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Agregar libro</Text>
              )}
            </Pressable>
          </View>

          <FlatList
            data={books}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={styles.bookCard}>
                <Text style={styles.bookCardTitle}>{item.title}</Text>
                <Text style={styles.bookCardDetails}>{item.author} | {item.genre}</Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  // Imagen de Fondo
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50, 
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  // Formulario Glassmorphism
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)', 
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  input: {
    backgroundColor: '#ffffff',
    color: '#333333',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  // Lista de Libros
  listContainer: {
    paddingBottom: 20,
  },
  bookCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  bookCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  bookCardDetails: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
});