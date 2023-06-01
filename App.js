import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-web';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import OBSWebSocket from 'obs-websocket-js';



function App() {
const [ipAddress, setIpAddress] = useState('');

const obs = new OBSWebSocket();

  useEffect(() => {
    // Kobler seg til OBS og gir beskjed om at den er tilkoblet
    const connectToOBS = async () => {
      try {
        await obs.connect(`ws://${ipAddress}`, 'password', {
          rpcVersion: 1
        });
        const { obsWebSocketVersion, negotiatedRpcVersion } = obs;
        console.log(`Connected to server!`);
        
        //Error catcher  
      } catch (error) {
        console.error('Failed to connect', error.code, error.message);
      }
    };

    //Nå venter funksjonen på at ipAddress skal bli satt, og når den blir det så kjører den connectToOBS() sånn at vi ikke kjører connectToOBS for tidlig
    if(ipAddress) {
      connectToOBS();
    }

  }, [ipAddress]);

  

  return (
    
    <View style={styles.container}>
      <Image style={styles.Image} source={require('./assets/vizrt-logo-front.png')}></Image>
      <Text style={styles.Text}>Connect to OBS</Text>
      <StatusBar style="auto" />
      <TextInput style={styles.TextInput} placeholder="IP-address"/>
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
