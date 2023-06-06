import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Settings = () => {
  const handleBoxPress = (boxTitle) => {
    console.log(`Clicked on box: ${boxTitle}`);
  };

  return (
    <View style={styles.settings}>
      <View style={styles.column}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleBoxPress('General')}
        >
          <Text style={styles.text}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleBoxPress('Help')}
        >
          <Text style={styles.text}>Help</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.box}
        onPress={() => handleBoxPress('Customize')}
      >
        <Text style={styles.text}>Customize</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    backgroundColor: '#1C3640',
  },
  column: {
    flexDirection: 'row',
  },
  box: {
    marginTop: 40,
    width: 150,
    height: 150,
    backgroundColor: '#284C5A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  text: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});

export default Settings;
