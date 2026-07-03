/*Zona1: Importaciones de componentes y archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';

/*Zona2: Main - Hogar de los componentes */
export default function ModalScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Modal vs BottomSheet</Text>
      
      <View style={styles.contenedorBotones}>
        <Button title="Abrir Modal" onPress={() => setIsModalVisible(true)} />
        <View style={{ height: 10 }} />
        <Button title="Abrir BottomSheet" onPress={() => setIsBottomSheetVisible(true)} />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.fondoModalCentrado}>
          <View style={styles.modalClasico}>
            <Text style={styles.subtitulo}>Modal</Text>
            <Text style={styles.texto}>Hola soy un modal.</Text>
            <Button title="Cerrar" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomSheetVisible}
        onRequestClose={() => setIsBottomSheetVisible(false)}
      >
        <Pressable style={styles.fondoBottomSheet} onPress={() => setIsBottomSheetVisible(false)}>
          <View style={styles.bottomSheet}>
            <Text style={styles.subtitulo}>BottomSheet </Text>
            <Text style={styles.texto}>Panel BottomSheet</Text>
            <Button title="Cerrar" onPress={() => setIsBottomSheetVisible(false)} />
          </View>
        </Pressable>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

/*Zona3: Estilos y posicionamiento*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contenedorBotones: {
    width: '60%',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  texto: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  
  fondoModalCentrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalClasico: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  fondoBottomSheet: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});