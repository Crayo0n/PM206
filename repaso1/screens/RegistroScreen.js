import React, { useState } from 'react';
import { View, TextInput, Text, Button, Platform, Alert, StyleSheet, Keyboard, Switch} from 'react-native';

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

    const mensaje = `Nombre: ${nombre}
    Carrera: ${carrera}
    Semestre: ${semestre}
    Taller: ${taller ? 'Sí' : 'No'}
    Constancia: ${constancia ? 'Sí' : 'No'}
    Deportes: ${deportivas ? 'Sí' : 'No'}`;

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
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nombre Completo" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Carrera" value={carrera} onChangeText={setCarrera} />
      <TextInput style={styles.input} placeholder="Semestre" value={semestre} onChangeText={setSemestre} keyboardType="numeric" maxLength={2} />

      <Text style={styles.sectionTitle}>Opciones</Text>

      <View style={styles.switchContainer}>
        <Text>¿Asistirá al Taller?</Text>
        <Switch value={taller} onValueChange={setTaller} />
      </View>

      <View style={styles.switchContainer}>
        <Text>¿Requiere Constancia?</Text> 
        <Switch value={constancia} onValueChange={setConstancia} />
      </View>

      <View style={styles.switchContainer}>
        <Text>¿Participará en deportes?</Text>
        <Switch value={deportivas} onValueChange={setDeportivas} />
      </View>

      <Button title="Enviar Registro" onPress={procesarRegistro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#f5f6fa' },
  input: { 
    borderWidth: 1, 
    borderColor: '#dcdde1', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 12, 
    backgroundColor: '#fff' },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold',
    marginVertical: 10 },
  switchContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 }
});