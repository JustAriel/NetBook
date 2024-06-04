import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateFolder({ setModalVisible, onCreateFolder }) {
  const [folderName, setFolderName] = useState('');

  const createFolder = async () => {
    if (folderName.length >= 4) {
      await AsyncStorage.setItem('folderName', folderName);
      setModalVisible(false);
      onCreateFolder(folderName);
    }
  };

  return (
    <View style={styles.center}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Folder Name"
          placeholderTextColor="#888"
          value={folderName}
          onChangeText={setFolderName}
          maxLength={26}
        />
        <TouchableOpacity style={styles.button} onPress={createFolder}>
          <Text style={styles.buttonText}>CREATE FOLDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height:140,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 300,
    borderColor: 'grey',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 48,
    width: 272,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    marginTop: 10,
    fontFamily: 'Zilla'
  },
  button: {
    height: 48,
    width: 272,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 16,
    color: '#000',
    fontFamily: 'Pacifico'
  },
  title: {
    fontWeight: '900',
    fontSize: 20,
    justifyContent: 'flex-start',
    marginTop: 50,
    marginBottom: 20,
  },
  HRtag: {
    width: windowWidth * .9,
    height: 1,
    backgroundColor: 'grey',
    marginBottom: 20,
  },
  litContainer:{
    alignItems: 'center',
  },
});