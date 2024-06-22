import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CreateNote({ handlePostNote, handleCloseModal }) {
  const [note, setNote] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleNoteChange = (text) => {
    setNote(text);
  };

  const handleSelectImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 1],
      quality: 1,
    });
    
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };  

  const handlePostButtonPress = () => {
    if (note.trim() !== '') {
      const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
      });
      
      handlePostNote(note, selectedImage);
      setNote('');
      setSelectedImage(null);
      handleCloseModal();
    }
  };

  const handleCloseButtonPress = () => {
    handleCloseModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCloseButtonPress} style={styles.closeButton}>
        <Image source={require('../../assets/closePng.png')} style={styles.closeImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSelectImage} style={styles.imageButton}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        ) : (
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/cameraPng2.png')} style={styles.cameraImage} />
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.noteInput}
        placeholder="Write whatever you want, such as your work, goal, mission or any other text you'd like to save. Feel free to add more content to this..."
        value={note}
        onChangeText={handleNoteChange}
        multiline
        textAlignVertical="top"
        maxLength={10000}
      />
      <TouchableOpacity onPress={handlePostButtonPress} style={styles.postButton}>
        <Text style={styles.postButtonText}>POST</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    width: 350,
    height: 429,
    borderRadius: 12,
    shadowColor: '#000',
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noteInput: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    marginTop: 10,
    fontFamily: 'Zilla',
    fontSize: 18,
  },
  postButton: {
    height: 48,
    width: 310,
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
  postButtonText: {
    fontSize: 16,
    fontFamily: 'Pacifico',
    color: '#000',
  },
  selectedImage: {
    width: 309.4,
    height: 150,
  },
  imageButton:{
    width: 309.4,
    height: 150,
    borderColor: 'black',
    borderWidth: .4,
  },
  cameraImage: {
    width: 130,
    height: 80,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginRight: 25,
  },
  canvasContainer: {
    flex: 1,
    aspectRatio: 1,
    width: 200,
    height: 200,
    backgroundColor: '#000',
  },
  canvas: {
    flex: 1,
  },
  snapshot: {
    width: 100,
    height: 100,
    marginTop: 16,
  },
  closeImage: {
    width: 40,
    height:40,
  },
  closeButton: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: -100,
    right: 135,
  }
});
