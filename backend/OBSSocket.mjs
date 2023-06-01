//Denne koden fungerer helt fint i Node alene, men må konverteres til en reactNative component.


import OBSWebSocket, {EventSubscription} from 'obs-websocket-js';
const obs = new OBSWebSocket();

try {
  const {
    obsWebSocketVersion,
    negotiatedRpcVersion
  } = await obs.connect('ws://localhost:4455', 'password', {
    rpcVersion: 1
  });

  console.log(`Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`)
  
  //Caller på funksjonen for å sette scene
  await setScene('KulScene2')

  //Hente ut currentscene
  console.log("Current scene: ", await getScene())

  await startStream();

} catch (error) {
  console.error('Failed to connect', error.code, error.message);
}


//Denne funksjonen returner om streamen er aktiv eller ikke. Dette kan brukes til å styre hvordan stream knappen skal se ut.
async function getStreamStatus() {
  return (await obs.call('GetStreamStatus')).outputActive
}
 
//Kode for å sette scene
async function setScene(scene) {
  await obs.call('SetCurrentProgramScene', {sceneName: scene})
}

//Henter current scene
async function getScene(){
  return await obs.call('GetCurrentProgramScene');
}

//Starter stream
async function startStream() {
  await obs.call('StartStream');
};

//Stoppen stream
async function StopStream() {
  await obs.call('StopStream');
};