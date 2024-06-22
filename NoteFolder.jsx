import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Dimensions, FlatList, Image } from 'react-native';
import Header from '../Section/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateNote from './CreateNote';
import DeleteNote from './DeleteNote';

export default function NoteFolder({ handleBackPress, selectedFolder }) {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const handlePostNote = (note, imageUri) => {
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    });
    const newNote = { note, timestamp, folder: selectedFolder, imageUri };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setModalVisible(false);
    setSelectedImage(null);
  };

  const handleDeleteNote = () => {
    const updatedNotes = notes.filter((note) => note !== selectedNote);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setSelectedNote(null);
  };

  const saveNotes = async (notes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadNotes();
  }, []);

  const handleAddPress = () => {
    setModalVisible(true);
  };

  const handleNoteHold = (note) => {
    setSelectedNote(note);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24, marginBottom: 20, fontFamily: 'Right' }}>{selectedFolder === 'posts' ? 'Posts Folder' : selectedFolder}</Text>
        <View style={styles.HRtag} />
      </View>
      <View style={styles.noteContainer}>
        {notes.filter((note) => note.folder === selectedFolder).length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyMessage}>Start your journey!</Text>
            <TouchableOpacity onPress={handleAddPress} style={styles.addButton}>
              <Image source={require('../../assets/addPng2.png')} style={styles.image3} />
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={notes.filter((note) => note.folder === selectedFolder)}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.scrollViewContainer}
            renderItem={({ item, index }) => (
              <TouchableOpacity onLongPress={() => handleNoteHold(item)}>
                <View key={index} style={styles.noteItem}>
                  <View style={styles.noteContent}>
                    <Text style={styles.noteTitle}>{item.note}</Text>
                    <Text style={styles.noteTimestamp}>{item.timestamp}</Text>
                  </View>
                  {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.noteImage} />}
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <View style={styles.footerContainer}>
        <Header handleBackPress={handleBackPress} handleAddPress={handleAddPress} />
      </View>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          {selectedNote ? ( 
            <DeleteNote
              selectedNote={selectedNote}
              handleDeleteNote={handleDeleteNote}
              handleCloseModal={() => setModalVisible(false)}
            />
          ) : (
            <View style={styles.modalContent}>
              <CreateNote handlePostNote={handlePostNote} handleCloseModal={() => setModalVisible(false)} />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  backButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noteContainer: {
    width: windowWidth,
    backgroundColor: '#f3f3f3',
    marginTop: 107,
    height: windowHeight * .843,
    marginBottom: 50,
  },
  noteTitle: {
    fontFamily: 'Zilla',
  },
  noteInput: {
    fontWeight: 'bold',
    borderRadius: 8,
    fontSize: 16,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f3f3f3',
    color:'#000',
  },
  HRtag: {
    width: windowWidth * .9,
    height: 1,
    backgroundColor: 'grey',
    marginTop: 5
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
  },
  header: {
    position: 'absolute',
    top: 50,
  },
  noteItem: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noteTimestamp: {
    position:'absolute',
    bottom: -20,
    fontSize: 10,
    color: '#888',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
  },
  emptyMessage:{
    fontFamily: 'Zilla',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noteImage: {
    width: 200,
    height: 100,
    justifyContent: 'flex-end',
  },
  noteContent: {
    flex: 1,
    marginRight: 16,
    marginBottom: 10,
  },
  image3: {
    width: 34.5,
    height: 34.5,
    marginRight: 0,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  addButton: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});