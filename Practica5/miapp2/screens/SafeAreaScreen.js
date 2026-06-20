/*Zona1: Importaciones de componentes y archivos*/
import { StatusBar } from 'expo-status-bar';
import React ,{useState} from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Switch} from 'react-native';

/*Zona2: Main - Hogar de los componentes */
export default function SafeAreaScreen() {
  const [activo,setActivo] = useState(true);
  const Contenedor = activo ? SafeAreaView : View;

  return (
    <Contenedor style={styles.fondo}>
      <Text style ={styles.titulo}>SafeAreaScreen y ScrollView</Text>
      <Text style ={styles.descripcion}>SafeAreaView evita que el contenedor se tape con el notch del celular</Text>
      
      <View style={styles.fila}>
        <Text style={styles.etiqueta}>Usar SafeAreaView</Text>
        <Switch value={activo} onValueChange={(valor) => setActivo(valor)} />
      </View>

      <Text style={styles.descripcion}>
        ScrollView permite hacer scroll cuando hay mucho contenido
      </Text>

      
      <ScrollView style={styles.lista}>
        <View style={[styles.tarjeta, { backgroundColor: 'red' }]}>
          <Text style ={styles.textoTarjeta}>Elemento 1</Text>
        </View>
        <View style={[styles.tarjeta, { backgroundColor: 'purple' }]}>
          <Text style ={styles.textoTarjeta}>Elemento 2</Text>
        </View>
        <View style={[styles.tarjeta, { backgroundColor: 'blue' }]}>
          <Text style ={styles.textoTarjeta}>Elemento 3</Text>
        </View>
        <View style={[styles.tarjeta, { backgroundColor: 'yellow' }]}>
          <Text style ={styles.textoTarjeta}>Elemento 4</Text>
        </View>
        <View style={[styles.tarjeta, { backgroundColor: 'green' }]}>
          <Text style ={styles.textoTarjeta}>Elemento 5</Text>
        </View>
        <View style={[styles.tarjeta, { backgroundColor: 'red' }]}>
          <Text style ={styles.textoTarjeta}>Elemento 6</Text>
        </View>
        <View style={[styles.tarjeta, { backgroundColor: 'reblue' }]}>
          <Text style ={styles.textoTarjeta}>Elemento 7</Text>
        </View>
      </ScrollView>
      
      
      <StatusBar style="auto" />
    </Contenedor>
  );
}

/*Zona3: Estilos y posicionamiento*/
const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  descripcion: {
    fontSize: 13,
    color: '#aaaaaa',
    textAlign: 'center',
    marginBottom: 12,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  etiqueta: {
    color: '#ffffff',
    fontSize: 14,
  },
  lista: {
    flex: 1,
  },
  tarjeta: {
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textoTarjeta: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});