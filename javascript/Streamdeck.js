import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-web';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    
    <View style={styles.container}>
      <Text style={styles.Text}>Testing</Text>
      <StatusBar style="auto" />
    </View>

    

  );
}

const Grid = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.navigation}>
        {/* Navigation components */}
      </View>

      {/* Grid */}
      <View style={styles.gridContainer}>
        {[...Array(3)].map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {[...Array(5)].map((_, cellIndex) => (
              <View key={cellIndex} style={styles.cell}>
                {/* Grid cell content */}
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.navigation}>
        {/* Navigation components */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C3640',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text:{
    color: '#FFFFFF'
  }
});


