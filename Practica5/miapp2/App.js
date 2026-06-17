/*Zona1: Importaciones de componentes y archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import {Perfil} from './components/Perfil';



/*Zona2: Main - Hogar de los componentes */
export default function App() {
  return (
    <View style={styles.container}>
      <Perfil style={styles.tarjetaRoja} nombre="Mauricio Rodriguez Molina" carrera="Ingeniera en Sistemas Computaciones" materia="Programación Móvil" cuatrimestre="9 no Cuatrimestre"></Perfil>
      
      <Perfil 
      style={styles.tarjetaVerde}
      nombre="Hola" 
      carrera="Medicina"
      materia="Notas" 
      cuatrimestre="6">
      </Perfil>


      <Perfil style={styles.tarjetaRoja} nombre="Mauricio Rodriguez Molina2" carrera="Ingeniera en Sistemas Computaciones" materia="Programación Móvil" cuatrimestre="9 no Cuatrimestre"></Perfil>


      <StatusBar style="auto" />
    </View>
  );
}

/*Zona3: Estilos y posicionamiento*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  tarjetaRoja: {
    backgroundColor: '#FF6B6B',
  },
  tarjetaVerde:{
    backgroundColor: '#6BCB77',
  },
});
