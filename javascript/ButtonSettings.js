import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';



const ButtonSettings = props => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.box}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder={props.name}
        />
        <Button
          title="Submit"
          onPress={() => {
            props.changename(inputValue)
            console.log(inputValue)
            props.closeBox(false)
            props.changearray(props.name, inputValue)
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ButtonSettings;