import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-web';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';



function App() {
  return (
    
    <View style={styles.container}>
      <Image style={styles.Image} source={require('./vizrt-logo-front.png')}></Image>
      <Text style={styles.Text}>Connect to OBS</Text>
      <StatusBar style="auto" />
      <TextInput style={styles.TextInput} placeholder="IP-adress"/>
      <TouchableOpacity style={styles.ConnectBtn}>  
      <Text style={styles.btnText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C3640',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text:{
    color: '#EF824F', 
    fontSize: 25, 
  }, 
  ConnectBtn:{
    alignItems: 'center',
    backgroundColor: '#DE7849',
    padding: 10,
  }, 
  btnText:{
    fontSize: 20, 
  },
  TextInput: {
    height: 40,
    backgroundColor: 'azure', 
    fontSize: 20,  
    width: 200,
    
  },
  Image:{
    height: 150, 
    width: 300,
  }

});

export default App; 
