import { Animated, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, { useRef, useEffect } from 'react';

export default function App() {
  const moonAnimation = useRef(new Animated.Value(0)).current; // Posición inicial ajustada

  const startAnimation = () => {
    moonAnimation.setValue(0); // Resetea la posición inicial cada vez que se inicia la animación
    Animated.timing(moonAnimation, {
      toValue: 1, // Ajusta este valor según el desplazamiento que necesites
      duration: 3000,
      useNativeDriver: false, //necesario para permitir la animación de colores
    }).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);
  //para obtener el tama;o de la pantalla
  const screenWidth = Dimensions.get('window').width;
  //para mover la luna de izquierda a derecha
  const MoonLeft = moonAnimation.interpolate({
    inputRange: [0, 3],
    outputRange: [0, screenWidth+500],
  });
  //para cambiar el color de fondo de la pantalla con animación
  const backgroundColor = moonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0.79)','rgba(255, 255, 255, 1)'], //cambia de blanco a negro oscuro
  });
  //para cambiar el color de la luna
  const moonColor = moonAnimation.interpolate({
    inputRange: [0,1],
    outputRange: ['rgb(0,0,0)', 'rgb(255,255,255)']
  })
  
  return (
    <Animated.View style={[styles.container, {backgroundColor:backgroundColor}]}>
      <View style={styles.eclipseData}>
        <Text style={styles.tittleText}>Eclipse solar</Text>
        <Text style={styles.dataText}>April 8, 2024</Text>
      </View>
      <View style={styles.eclipseView}>
        <View style = {styles.sun}></View>
        <Animated.View style = {[styles.moon, {transform: [{translateX: MoonLeft}], backgroundColor: moonColor}]}></Animated.View>
      </View>
      <View style={styles.repeatButton}>
        <TouchableOpacity onPress={startAnimation} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Repetir</Text>
        </TouchableOpacity>  
      </View>
    </Animated.View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  eclipseData: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  eclipseView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    padding: 10,
  },
  repeatButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  sun: {
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: 'yellow',
  },
  moon: {
    width: 170,
    height: 170,
    borderRadius: 100,
    backgroundColor: 'black',
    position: 'absolute',
  },
  tittleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataText: {
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: '#EA2027',
    padding: 10,
    width: 100,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});