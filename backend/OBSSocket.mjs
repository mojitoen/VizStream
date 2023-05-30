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

  //Dette er for å hente scene
  const {currentProgramSceneName} = await obs.call('GetCurrentProgramScene');
  console.log(currentProgramSceneName)

} catch (error) {
  console.error('Failed to connect', error.code, error.message);
}