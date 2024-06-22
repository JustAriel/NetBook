import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DeleteFolder({ folderName, onDelete, onCancel }) {
  return (
    <View style={styles.containerMain}>
    <View style={styles.container}>
      <Text style={styles.title}>Delete Folder</Text>
      <Text style={styles.message}>Are you sure you want to delete "{folderName}" folder?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMain: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 190,
    marginLeft: 53.5,
    backgroundColor: '#fff',
    width: 300,
    height: 190,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Right',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 50,
    textAlign: 'center',
    fontFamily: 'Right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: 'white',
    height: 40,
    width: 100,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    height: 40,
    width: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Right',
  },
});