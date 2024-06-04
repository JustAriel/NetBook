import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Menu() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [containerHeight] = useState(new Animated.Value(30));
  const [username, setUsername] = useState('');

  const handleSectionPress = async () => {
    if (isExpanded) {
      try {
        await AsyncStorage.setItem('username', username);
        console.log('Username saved:', username);
      } catch (error) {
        console.log('Error saving username:', error);
      }
    }
  
    Animated.timing(containerHeight, {
      toValue: isExpanded ? 30 : 80,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };  

  useEffect(() => {
    getUsername();
  })

  const getUsername = async () => {
    try {
      const savedUsername = await AsyncStorage.getItem('username');
      if (savedUsername !== null) {
        setUsername(savedUsername);
      }
    } catch (error) {
      console.log('Error retrieving username:', error);
    }
  }

  return (
    <Animated.View style={[styles.container, { height: containerHeight }]}>
      <TouchableOpacity activeOpacity={1} onPress={handleSectionPress}>
        <View style={styles.option}>
          <View style={styles.opener} />
          {isExpanded ? (
            <TextInput
              style={styles.textInput}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              placeholderTextColor="#888"
            />
          ) : (
            <Text style={styles.text}>{username}</Text>
        )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  opener: {
    width: 200,
    height: 10,
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 12,
    marginBottom: 15,
  },
  container: {
    width: windowWidth,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  option: {
    marginBottom: 30,
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  optionValue: {
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
  },
  setPasswordButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    width: windowWidth * 0.9,
    borderRadius: 5,
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
  setPasswordButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: '900',
    fontSize: 15,
  },
  textInput: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  }
});