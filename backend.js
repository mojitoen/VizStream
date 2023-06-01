import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import OBSWebSocket from 'obs-websocket-js';

export default function App() {
  const [ipAddress, setIpAddress] = useState('');


  const obs = new OBSWebSocket();

  useEffect(() => {
    // Kobler seg til OBS og gir beskjed om at den er tilkoblet
    
    //MIDLERTIDIG HARD-SET IP-Adresse
    setIpAddress(`10.0.0.181:4455`);

    const connectToOBS = async () => {
      try {
        await obs.connect(`ws://${ipAddress}`, 'password', {
          rpcVersion: 1
        });
        const { obsWebSocketVersion, negotiatedRpcVersion } = obs;
        console.log(`Connected to server!`);

  
      } catch (error) {
        console.error('Failed to connect', error.code, error.message);
      }
    };

    //Nå venter funksjonen på at ipAddress skal bli satt, og når den blir det så kjører den connectToOBS() sånn at vi ikke kjører connectToOBS for tidlig
    if(ipAddress) {
      connectToOBS();
    }

  }, [ipAddress]);


  const longpressTest = () => {
    console.log("testy stevens")
  }


//Funksjon som henter Scene status og håndterer eventuelle errors
  const getSceneBtn = async () => {
    try {
      if (obs) {
        //await setScene(obs, 'KulScene2');
        console.log(await getScene(obs));
        return await getScene(obs);
      } else {
        console.error('OBS connection not established.');
      }
    } catch (error) {
      console.error('Error while getting scene:', error);
    }
  };

  //Funksjon som setter en Scene
  const setSceneBtn = async (scene) => {
    try {
      if(obs) {
        await setScene(obs, scene);
        console.log("Scene set to: ", scene);
      }
      else {
        console.error('OBS connection not established.');
      }
    } catch (error) {
      console.error('Error while setting scene:', error);
    }
  };

  //KNAPPHÅNDTERING FOR START STREAM
  const startStreamBtn = async () => {
    try {
      if(obs) {
        await obs.call('StartStream');
        console.log("Stream started");
      }
      else {
        console.error('OBS connection not established.');
      }
    } catch (error) {
      console.error('Error while starting stream:', error);
    }
  };

  //Funksjon som stopper stream
  const stopStreamBtn = async () => {try {
    if(obs) {
      await obs.call('StopStream');
      console.log("Stream stopped");
    }
    else {
      console.error('OBS connection not established.');
    }
  } catch (error) {
    console.error('Error while stopping stream:', error);
  }};



 
//FUNKSJONER SOM BLIR CALLET AV KNAPPEFUNKSJONENE VÅRE
//setScene og getScene crasher uten disse av en eller annen grunn så vi beholder de for nå
  const setScene = async (obs, scene) => {
    await obs.call('SetCurrentProgramScene', { sceneName: scene });
  };

  const getScene = async (obs) => {
    return await obs.call('GetCurrentProgramScene');
  };

  



  return (
    <View style={styles.container}>
      <Text>Back-end Testing</Text>
      <TouchableOpacity onLongPress={longpressTest} onPress={getSceneBtn}>
      <Text>Get Scene Status</Text></TouchableOpacity>
      

      <TouchableOpacity onLongPress={longpressTest} onPress={() => setSceneBtn('KulScene2')}>
        <Text>Set Scene to AAAA</Text>
      </TouchableOpacity>

      <TouchableOpacity onLongPress={longpressTest} onPress={() => setSceneBtn('Scene')}>
        <Text>Set Scene to BBBB</Text>
      </TouchableOpacity>

      <TouchableOpacity onLongPress={longpressTest} onPress={startStreamBtn}>
        <Text>Start Stream</Text>
      </TouchableOpacity>
      
    
      <TouchableOpacity onLongPress={longpressTest} onPress={stopStreamBtn}>
        <Text>Stop Stream</Text>
        </TouchableOpacity>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});