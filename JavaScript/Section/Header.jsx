import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

export default function Header({ handleBackPress, handleAddPress }) {
  const handleBack = () => {
    handleBackPress();
  }

  const handleAdd = () => {
    handleAddPress();
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.HRtagH} />
      <TouchableOpacity onPress={handleBack}>
        <Image source={require('../../assets/backPng.png')} style={styles.image1} />
      </TouchableOpacity>
      <View style={styles.HRtagV} />
      <TouchableOpacity onPress={handleAdd}>
        <Image source={require('../../assets/addPng2.png')} style={styles.image3} />
      </TouchableOpacity>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  image1: {
    width: 24,
    height: 24,
    marginRight: 50,
    marginLeft: 30,
  },
  image2: {
    width: 24,
    height: 24.5,
    marginRight: 50,
  },
  image3: {
    width: 24.5,
    height: 24.5,
    marginRight: 35,
  },
  HRtagV: {
    height: 32,
    width: 1,
    backgroundColor: 'grey',
    marginRight: 80,
    marginLeft: 28,
  },
  HRtagH: {
    height: 3,
    width: windowWidth * 1.1,
    backgroundColor: 'black',
    position: 'absolute',
    top: 1,
    left: -80,
  },
});