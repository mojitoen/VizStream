import React from 'react';
import { View, StyleSheet, SafeAreaView, Button, Text , TouchableOpacity} from 'react-native';

const App = () => {
  const buttonLabels = [
    ['Button 1', 'Button 2'],
    ['Button 3', 'Button 4'],
    ['Button 5', 'Button 6'],
    ['Button 7', 'Button 8']
  ];

  const handleButtonClick = (title) => {
    console.log(`You clicked Button: ${title}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.navigation}>
        {/* Add your components for top navigation */}
      </View>

      {/* Grid */}
      <View style={styles.gridContainer}>
        {buttonLabels.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((title, cellIndex) => (

              <TouchableOpacity
                key={cellIndex}
                style={styles.cell}
                onPress={() => handleButtonClick(title)}>

                <Text 
                    style={styles.buttonText}>{title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.navigation}>
        {/* Add your components for bottom navigation */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 
    container: {
    backgroundColor:'#1C3640',
    flex: 1,
  },
  navigation: {
    height: 50,
    backgroundColor: '#1C3640',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },  
    buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
