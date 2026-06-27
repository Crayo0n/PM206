import React, { useState } from 'react';
import { View, TextInput, Text, Button, Platform, Alert, StyleSheet, Keyboard, Switch, SafeAreaView, ScrollView } from 'react-native';

// Componente reutilizable: Encapsula la lógica de cada fila de opciones
const CustomSwitch = ({ label, value, onValueChange }) => (
  <View style={styles.switchContainer}>
    <Text style={styles.switchLabel}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

export default function RegistroScreen() {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');
  
  const [taller, setTaller] = useState(false);
  const [constancia, setConstancia] = useState(false);
  const [deportivas, setDeportivas] = useState(false);

  const procesarRegistro = () => {
    if (Platform.OS !== 'web') Keyboard.dismiss();

    if (!nombre || !carrera || !semestre) {
      alertasManager("Campos Incompletos", "Debes llenar todos los campos.");
      return;
    }

    const mensaje = `Nombre: ${nombre}\nCarrera: ${carrera}\nSemestre: ${semestre}\nTaller: ${taller ? 'Sí' : 'No'}\nConstancia: ${constancia ? 'Sí' : 'No'}\nDeportes: ${deportivas ? 'Sí' : 'No'}`;

    alertasManager("Registro enviado", mensaje);
  };

  const alertasManager = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}:\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        
        <TextInput style={styles.input} placeholder="Nombre Completo" value={nombre} onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="Carrera" value={carrera} onChangeText={setCarrera} />
        <TextInput style={styles.input} placeholder="Semestre" value={semestre} onChangeText={setSemestre} keyboardType="numeric" maxLength={2} />

        <Text style={styles.sectionTitle}>Opciones</Text>

        {/* Uso del componente reutilizable: limpio y mantenible */}
        <CustomSwitch label="¿Asistirá al Taller?" value={taller} onValueChange={setTaller} />
        <CustomSwitch label="¿Requiere Constancia?" value={constancia} onValueChange={setConstancia} />
        <CustomSwitch label="¿Participará en deportes?" value={deportivas} onValueChange={setDeportivas} />

        <View style={styles.buttonContainer}>
          <Button title="Enviar Registro" onPress={procesarRegistro} color="#007AFF" />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#f5f6fa' 
  },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 24
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#dcdde1', 
    padding: 14, 
    borderRadius: 8, 
    marginBottom: 14, 
    backgroundColor: '#fff',
    fontSize: 16
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#2f3640'
  },
  switchContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 18,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f2f5'
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 10
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden'
  }
});