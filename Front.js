import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const Front = () => {
  const handleBoxPress = (boxNumber) => {
    console.log(`Box ${boxNumber} clicked`);
    // Add your custom logic here when a box is clicked
  };

  return (
    <View style={styles.container}>
        <Image style={styles.Image} source={require('./assets/vizrt-logo-front.png')}></Image>
        <Text style={styles.headline}>Connect to OBS</Text>
      <TouchableOpacity
        style={styles.box}
        onPress={() => handleBoxPress(1)}
      >
        <Text style={styles.text}>Scan QR code</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => handleBoxPress(2)}
      >
        <Text style={styles.text}>Connect manually</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C3640'
  },
  headline: {
        fontSize: 25,
        color: 'white'
},
  box: {
    width: 200,
    height: 50,
    backgroundColor: '#DE7849',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 20, 
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  Image: {
        height: 150, 
        width: 250, 
  }

});

export default Front;
