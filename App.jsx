import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Dimensions, TouchableWithoutFeedback, Image, } from 'react-native';
import Folder from './JavaScript/Section/Folder';
import CreateFolder from './JavaScript/Screen/CreateFolder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import NoteFolder from './JavaScript/Screen/NoteFolder';
import DeleteFolder from './JavaScript/Screen/DeleteFolder';
import EditFolder from './JavaScript/Screen/EditFolder';
import Welcome from './JavaScript/Screen/Welcome';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [editedFolder, setEditedFolder] = useState(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const openModal = () => {
    setModalVisible(true);
  };

  const openDeleteModal = (folderName) => {
    setFolderToDelete(folderName);
    setDeleteModalVisible(true);
  };

  const createFolder = async (folderName) => {
    try {
      if (folders.includes(folderName)) {
        alert('Folder already exists');
        return;
      }
      const newFolders = [...folders, folderName];
      setFolders(newFolders);
      await AsyncStorage.setItem('folders', JSON.stringify(newFolders));
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadFolders = async () => {
      try {
        const savedFolders = await AsyncStorage.getItem('folders');
        if (savedFolders) {
          setFolders(JSON.parse(savedFolders));
        } else {
          setFolders(["Default folder"]);
          await AsyncStorage.setItem('folders', JSON.stringify(["Default folder"]));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadFolders();
  }, []);

  const deleteFolder = async () => {
    try {
      const updatedFolders = folders.filter((folder) => folder !== folderToDelete);
      setFolders(updatedFolders);
      await AsyncStorage.setItem('folders', JSON.stringify(updatedFolders));
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteModalVisible(false);
      setFolderToDelete(null);
    }
  };

  const editFolder = (folderName) => {
    setEditedFolder(folderName);
    setEditModalVisible(true);
  };

  const handleEditFolder = (newFolderName) => {
    const updatedFolders = folders.map((folder) => {
      if (folder === editedFolder) {
        return newFolderName;
      } else {
        return folder;
      }
    });
    setFolders(updatedFolders);
    setEditModalVisible(false);
    setEditedFolder(null);
    AsyncStorage.setItem('folders', JSON.stringify(updatedFolders));
  };

  const handleFolderPress = (folderName) => {
    setSelectedFolder(folderName);
  };

  const handleBackPress = () => {
    setSelectedFolder(null);
  }; 

  const handleWelcomeScreenNext = () => {
    setShowWelcomeScreen(false);
  };  

  const [FontsLoaded] = useFonts({
    'France': require('./fonts/France.ttf'),
    'Normal': require('./fonts/Normal.ttf'),
    'Pacifico': require('./fonts/Pacifico.ttf'),
    'Right': require('./fonts/Right.ttf'),
    'Zilla': require('./fonts/Zilla.ttf'),
  });

  if (!FontsLoaded) {
    return <View />;
  } else if (selectedFolder) {
    return (
      <NoteFolder selectedFolder={selectedFolder} handleBackPress={handleBackPress} />
    );
  } else if (showWelcomeScreen) {
    return (
      <Welcome onPressNext={handleWelcomeScreenNext} />
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, justifyContent: 'flex-start', marginTop: 100, marginBottom: 20, fontFamily: 'Pacifico', }}>Your personal notebook</Text>
        <View style={styles.HRtag} />
        {folders.map((folderName, index) => (
          <TouchableOpacity key={index} onPress={() => handleFolderPress(folderName)}>
            <Folder folder={folderName} onDelete={() => openDeleteModal(folderName)} onEdit={editFolder} />
          </TouchableOpacity>
        ))}
        {!modalVisible && (
          <TouchableOpacity style={styles.addButton} onPress={openModal}>
            <Image source={require('./assets/addPng2.png')} style={styles.addButtonText} />
          </TouchableOpacity>
        )}
        <Modal visible={modalVisible} animationType="fade" transparent={true}>
          <TouchableWithoutFeedback onPress={createFolder}>
            <CreateFolder setModalVisible={setModalVisible} onCreateFolder={createFolder} />
          </TouchableWithoutFeedback>
        </Modal>
        <Modal visible={deleteModalVisible} animationType="fade" transparent={true}>
          <DeleteFolder 
            folderName={folderToDelete}
            onDelete={deleteFolder}
            onCancel={() => setDeleteModalVisible(false)}
          />
        </Modal>
        {!modalVisible && (
        <Modal visible={editModalVisible} animationType="fade" transparent={true}>
          <EditFolder
            folderName={editedFolder}
            setModalVisible={setEditModalVisible}
            onEditFolder={handleEditFolder}
          />
        </Modal>
        )}
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  HRtag: {
    width: windowWidth * .9,
    height: 1,
    backgroundColor: 'grey',
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
    marginTop: 40,
  },
  addText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  editButton:{
    width: 30,
    height: 30,
    position: 'absolute',
    right: 40,
    top: 40,
  },
  addButtonText: {
    width: 40,
    height: 40,
  }
});