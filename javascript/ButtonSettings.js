import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const ButtonSettings = (props) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.box}>
        <TextInput
          style={styles.input}
          placeholder="Enter something..."
        />
        <Button
          title="Submit"
          onPress={() => {
            // Handle button press logic here
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