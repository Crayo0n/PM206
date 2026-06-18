import{Text,View, Button, StyleSheet} from 'react-native';
import React,{useState} from 'react';

export const Menu = ({}) => {
    const [mostrar, setMostrar] = useState(false)
    return(
        <View style={estilos.tarjeta}>
    
        </View>
    )
}

const estilos = StyleSheet.create({
    tarjeta: {
        borderWidth: 3,
        margin: 20,
        padding: 25,
        backgroundColor: '#6BCB77',
    },

});

