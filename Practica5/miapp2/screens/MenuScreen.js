/*Zona1: Importaciones de componentes y archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import FlatListScreen from './FlatListScreen';
import ImageBackgroundScreen from './ImageBackgroundScreen';
import ModalScreen from './ModalScreen';
import PressableScreen from './PressableScreen';
import SafeAreaScreen from './SafeAreaScreen';
import TarjetasScreen from './TarjetasScreen';
import TextInputScreen from './TextInputScreen';

/*Zona2: Main - Hogar de los componentes */
export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');
    switch(screen) {
        case 'tarjetas':
            return <TarjetasScreen />;
        case 'safeArea':
            return <SafeAreaScreen />;
        case 'flatList':
            return <FlatListScreen />;
        case 'imageBackground':
            return <ImageBackgroundScreen />;
        case 'modal':
            return <ModalScreen />;
        case 'pressable':
            return <PressableScreen />;
        case 'textInput':
            return <TextInputScreen />;
        case 'ActivityIndicator':
            return <ActivityIndicatorScreen />;
        case 'menu':
            default:
                return (
                    <View style={styles.container}>
                        
                        <View style={styles.tarjetaFondo}>
                            <Text style={styles.titulo}>Menú de Prácticas</Text>
                            <Text style={styles.subtitulo}>React Native Components</Text>

                            <View style={styles.contenedorBotones}>
                                <Button title="Tarjetas" onPress={() => setScreen('tarjetas')}  />
                                <Button title="SafeAreaView" onPress={() => setScreen('safeArea')}  />
                                <Button title="FlatList" onPress={() => setScreen('flatList')}  />
                                <Button title="ImageBackground" onPress={() => setScreen('imageBackground')} />
                                <Button title="Modal" onPress={() => setScreen('modal')}  />
                                <Button title="Pressable" onPress={() => setScreen('pressable')}  />
                                <Button title="TextInput" onPress={() => setScreen('textInput')} />
                                <Button title="ActivityIndicator" onPress={() => setScreen('ActivityIndicator')} />
                            </View>
                        </View>

                        <StatusBar style="light" />
                    </View>
            );
    }
}

/*Zona3: Estilos y posicionamiento*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  tarjetaFondo: {
    backgroundColor: '#2D3748',
    paddingVertical: 35,
    paddingHorizontal: 25,
    borderRadius: 20,
    width: '85%', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  titulo: {
    color: '#FFFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitulo: {
    color: '#A0AEC0',
    fontSize: 14,
    marginBottom: 25,
  },
  contenedorBotones: {
    width: '100%',
    gap: 12,
  }
});