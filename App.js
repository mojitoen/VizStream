import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-web';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import OBSWebSocket from 'obs-websocket-js';



function App() {
const [ipAddress, setIpAddress] = useState('');

//Temp usestate som henter verdien til inputText onchange. Dette gjør at ikke useEffecten kjører mange ganger mens bruker skriver IP.
const [inputText, setInputText] = useState('');

const [connectedStatus, setConnectedStatus] = useState(false)

const obs = new OBSWebSocket();

  useEffect(() => {
    // Kobler seg til OBS og gir beskjed om at den er tilkoblet
    const connectToOBS = async () => {
      try {
        await obs.connect(`ws://${ipAddress}`, 'password', {
          rpcVersion: 1
        });
        console.log(`Connected to server!`);
        setConnectedStatus(true)
        
        //Error catcher  
      } catch (error) {
        console.error('Failed to connect', error.code, error.message);
        setIpAddress('');
      }
    };

    //Nå venter funksjonen på at ipAddress skal bli satt, og når den blir det så kjører den connectToOBS() sånn at vi ikke kjører connectToOBS for tidlig
    if(ipAddress) {
      connectToOBS();
    }

  }, [ipAddress]);


  //Når bruker klikker "connect" knappen, så settes ipAddress til verdien av inputText sånn at connection funksjonen kjøres.
  const handleButtonClick = () => {
    setIpAddress(inputText)
  };

  if(connectedStatus) {
    return (
    
      <View style={styles.container}>
        <Image style={styles.Image} source={require('./assets/vizrt-logo-front.png')}></Image>
        <Text style={styles.Text}>Connect to OBS</Text>
        <StatusBar style="auto" />
        <TextInput style={styles.TextInput} value={inputText} onChangeText={setInputText} placeholder="IP-address"/>
        <TouchableOpacity style={styles.ConnectBtn} onPress={handleButtonClick}>  
        <Text style={styles.btnText}>Connect</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (!connectedStatus) {
    return (
      <div>
        <Text>Masse knapper</Text>
      </div>
    )
  }
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
