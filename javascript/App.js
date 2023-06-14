import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-web';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import { useState } from 'react';



function App() {

// 11 til 24 er alt vi trenger til å få til error message

  const [opacity, setOpacity] = useState(0)
  
  const loginFailed=() =>{
    setOpacity(opacity === 0 ? 1 : 0)
  };

  const failedStyle = {
    opacity: opacity,
    color: 'red',
    fontSize: 20,
    padding: 10,

  }

  return (
    
    <View style={styles.container}>
      <Image style={styles.Image} source={require('./vizrt-logo-front.png')}></Image>
      <Text style={styles.Text}>Connect to OBS</Text>
      <StatusBar style="auto" />
      <TextInput style={styles.TextInput} placeholder="IP-adress"/>

      {/* Bruk style og onPress i main for å få til error message */}

      <Text style={failedStyle}>Failed to log in. Please try again</Text>
      <TouchableOpacity style={styles.ConnectBtn} onPress={loginFailed}>  

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
  },
  loginFailed:{
    color: 'red',
    fontSize: 20,
    padding: 10,
    opacity: 0

  }

});

export default App; 
