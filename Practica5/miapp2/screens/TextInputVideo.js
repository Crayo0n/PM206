import React, {useState} from 'react';
import {View, TextInput, Button, Alert, StyleSheet} from 'react-native';

export default function TextInputScreen(){
  const [usuario, setUsuario] = useState('');
  const [pin, setPin] = useState('');

  const procesarAcceso = ()=> {
    if(!usuario.trim() || pin.length!==4){
      Alert.alert("Error de validacion");
      return;
    }
    Alert.alert("Acceso Concedido",`Hola, ${usuario}.\n.`);
  
  };

  return(
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      placeholder="Nombre de usuario"
      value={usuario}
      onChangeText={setUsuario}
      />
      <TextInput
      style={styles.input}
      placeholder="PIN de seguridad"
      value={pin}
      onChangeText={setPin}
      secureTextEntry={true}
      keyboardType="numeric"
      maxLength={4}
      />
      <Button title="Iniciar Sesion" onPress={procesarAcceso}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffff'
  },
  input:{
    borderWidth: 1,
    borderColor: '#fff2',
    padding: 12,
    borderRadius: 8,
    marginBottom:16
  }
});
