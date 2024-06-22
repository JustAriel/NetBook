import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';

export default function Folder({ folder, onDelete, onEdit }) {
  const handleDelete = () => {
    onDelete(folder);
  };

  const handleEdit = () => {
    onEdit(folder);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={{ textAlign: 'right', marginLeft: 10, fontFamily: 'Right', }}>{folder}</Text>
        <View style={styles.HRtagV} />
{/*         <TouchableOpacity style={styles.editButtonMain} onPress={handleEdit}>
          <Image style={styles.editButton} source={require('../../assets/editPng2.png')} />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.deleteButtonMain} onPress={handleDelete}>
          <Image style={styles.deleteButton} source={require('../../assets/deletePng.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 102,
  },
  container: {
    marginTop: 10,
    width: windowWidth * 0.9,
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 102,
    justifyContent: 'center',
    shadowColor: '#fff',
    elevation: 1,
    borderColor: 'black',
    borderWidth: .5,
  },
  HRtagV: {
    height: 32,
    width: .7,
    backgroundColor: 'grey',
    position: 'absolute',
    right: 85,
  },
  deleteButton:{
    width: 22,
    height: 22,
  },
  editButton:{
    width: 29,
    height: 29,
  },
  deleteButtonMain:{
    position: 'absolute',
    right: 33,
    bottom: -1,
  },
  editButtonMain:{
    position: 'absolute',
    right: 42,
  },
});