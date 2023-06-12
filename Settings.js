import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Settings = () => {
  const handleBoxPress = (boxTitle) => {
    console.log(`${boxTitle} pressed`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.settings}>
        <View style={styles.column}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => handleBoxPress('General')}
          >
            <Text style={styles.boxText}>General</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => handleBoxPress('Help')}
          >
            <Text style={styles.boxText}>Help</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.box}
          onPress={() => handleBoxPress('Customize')}
        >
          <Text style={styles.boxText}>Customize</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C3640',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 20,
  },
  settings: {
    flex: 1,
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
  },
  box: {
    width: 150,
    height: 150, 
    backgroundColor: '#284C5A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,  

  },
  boxText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});

export default Settings;
