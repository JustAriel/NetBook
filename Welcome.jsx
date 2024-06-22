import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Welcome({ onPressNext }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NetBook</Text>
      <Text style={styles.description}>New notes application</Text>
      <TouchableOpacity style={styles.button} onPress={onPressNext}>
        <Text style={styles.buttonText}>Explore!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 75,
    marginBottom: 0,
    fontFamily: 'France',
    marginTop: 300,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: 300,
    height: 65,
    marginTop: 320,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    letterSpacing: 2,
    fontSize: 26,
    fontFamily: 'Normal',
  },
  description: {
    fontSize: 15,
    marginBottom: 20,
    fontFamily: 'Zilla',
  },
});