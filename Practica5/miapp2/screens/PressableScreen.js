// Zona 1 - Importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { Pressable, View, StyleSheet, Text, Switch } from "react-native";
import { useState } from "react";

// Zona 2 - Main - Hogar de los componentes
export default function PressableScreen() {

  const [buttonText, setButtonText] = useState("Dame Clic");
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#000000ff" : "#FFFFFF"  }]}>

      <Pressable
        style={styles.button}

        onPress={() => {
          console.log("Se presionó el botón");
          setButtonText("Botón presionado");
        }}

        onPressIn={() => {
          console.log("Se acaba de presionar el botón");
        }}

        onPressOut={() => {
          console.log("Se acaba de soltar el botón");
        }}

        onLongPress={() => {
          console.log("Presión prolongada");
          setButtonText("Presión prolongada detectada");
        }}
      >
        <Text style={styles.buttonText}>
          {buttonText}
        </Text>
      </Pressable>

      <Text style={{ color: isDarkMode ? "#FFFFFF" : "#000000", marginBottom: 10 }}>

      </Text>

      <Switch
        value={isDarkMode}
        onValueChange={() =>
          setIsDarkMode((previousState) => !previousState)
        }
        trackColor={{ false: "#767577", true: "lightblue" }}
        thumbColor="#f4f3f4"
      />

      <StatusBar style="auto" />

    </View>
  );
}

// Zona 3 - Estilos - Personalización de los componentes
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },

  button: {
    width: 220,
    height: 55,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 25,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

});