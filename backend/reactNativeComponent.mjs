import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import OBSWebSocket from 'obs-websocket-js';

const OBSComponent = () => {
  const [currentProgramSceneName, setCurrentProgramSceneName] = useState('');

  useEffect(() => {
    const connectToOBS = async () => {
      const obs = new OBSWebSocket();

      try {
        await obs.connect('ws://localhost:4455', 'password', {
          rpcVersion: 1
        });

        const { obsWebSocketVersion, negotiatedRpcVersion } = obs;

        console.log(`Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`);


        const { currentProgramSceneName } = await obs.call('GetCurrentProgramScene');
        setCurrentProgramSceneName(currentProgramSceneName);
        

      } catch (error) {
        console.error('Failed to connect', error.code, error.message);
      }
    };

    connectToOBS();

    return () => {
      obs.disconnect();
    };
  }, []);

  return (
    <View>
      <Text>{currentProgramSceneName}</Text>
    </View>
  );
};

export default OBSComponent;