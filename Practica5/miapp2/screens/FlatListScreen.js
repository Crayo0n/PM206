//zona1: importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, SectionList } from 'react-native';
import { useState } from 'react';

//Zona2: main - hogar de la aplicación, donde se renderizan los componentes y se define la estructura visual de la app
export default function FlatSectionListScreen() {

  const [elementos, setElementos] = useState([
    { id: '1', nombre: 'Elemento A' },
    { id: '2', nombre: 'Elemento B' },
    { id: '3', nombre: 'Elemento C' },
    { id: '4', nombre: 'Elemento D' },
    { id: '1', nombre: 'Elemento A' },
    { id: '2', nombre: 'Elemento B' },
    { id: '3', nombre: 'Elemento C' },
    { id: '4', nombre: 'Elemento D' },
    { id: '1', nombre: 'Elemento A' },
    { id: '2', nombre: 'Elemento B' },
    { id: '3', nombre: 'Elemento C' },
    { id: '4', nombre: 'Elemento D' },
  ]);

  const [secciones, setSecciones] = useState([
    {
      tituloCategoria: 'Refrescos',
      data: ['Coca-cola', 'Fanta', 'Pepsi'],
    },
    {
      tituloCategoria: 'Jugos',
      data: ['Zanahoria', 'Naranja', 'Remolacha']
    },
    {
      tituloCategoria: 'Refrescos',
      data: ['Coca-cola', 'Fanta', 'Pepsi'],
    },
    {
      tituloCategoria: 'Jugos',
      data: ['Zanahoria', 'Naranja', 'Remolacha']
    },
    {
      tituloCategoria: 'Refrescos',
      data: ['Coca-cola', 'Fanta', 'Pepsi'],
    },
    {
      tituloCategoria: 'Jugos',
      data: ['Zanahoria', 'Naranja', 'Remolacha']
    },
  ]);

  const eliminarElemento = (id) => {
    setElementos(elementos.filter(item => item.id != id));
  };

  const renderContenidoSuperior = () => (
    <View>
      <Text style={styles.titulo}> Práctica FlatList </Text>
      
      <FlatList
        data={elementos}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.itemFlat}>
            <Text style={styles.texto}>{item.nombre}</Text>
            <Button title="Eliminar" onPress={() => eliminarElemento(item.id)} />
          </View>
        )}
      />

      <View style={styles.barraDivisora} />

      <Text style={styles.titulo}> Práctica SectionList </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <SectionList

        sections={secciones}

        keyExtractor={(item, index) => item + index}

        ListHeaderComponent={renderContenidoSuperior}

        renderItem={({ item }) => (

          <View style={styles.itemSection}>
            <Text style={styles.texto}>{item}</Text>
          </View>
          
        )}

        renderSectionHeader={({ section: { tituloCategoria } }) => (

          <View style={styles.encabezado}>
            <Text style={styles.textoEncabezado}>{tituloCategoria}</Text>
          </View>

        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

//Zona3: estilos - define los estilos para los componentes de la aplicación, en este caso, el contenedor principal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemFlat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  itemSection: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#b50000',
  },
  encabezado: {
    backgroundColor: '#ff0202',
    padding: 8,
    marginTop: 15,
  },
  textoEncabezado: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  texto: {
    fontSize: 16,
  },
  barraDivisora: {
    height: 2,
    backgroundColor: '#444444',
    marginVertical: 30,
    borderRadius: 1,
  },
});