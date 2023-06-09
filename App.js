import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, SafeAreaView} from 'react-native';
import React from 'react';
import OBSWebSocket from 'obs-websocket-js';
import ButtonSettings from './javascript/ButtonSettings';
import Icon from 'react-native-vector-icons/FontAwesome';




function App() {
const [ipAddress, setIpAddress] = useState('');

//Temp usestate som henter verdien til inputText onchange. Dette gjør at ikke useEffecten kjører mange ganger mens bruker skriver IP.
const [inputText, setInputText] = useState('');
//State var for checking whether or not we are connected
const [connectedStatus, setConnectedStatus] = useState(false)

//Denne staten er brukt som callback i buttonsettings for å kunne returne det nye navnet til knappen
const [changedBtnName, setChangedBtnName] = useState('')

//Denne staten er for å sette valgt tittel for å snakke med buttonsettings
const [selectedBtn, setSelectedBtn] = useState('')

//TODO
const [selectionWindowVisible, setSelectionWindowVisible] = useState(false);

//OBS Tilkobling satt i en state, slik at tilkoblingen opprettholder seg
const [obs, setObs] = useState(new OBSWebSocket());

//Usestate for listen over hvilke scener vi har tilgjengelig
const [sceneList, setSceneList] = useState([]);

//Usestate for midlertidig lagring av button-labels
const [buttonLabelValue, setButtonLabelValue] = useState("");

//Midlertidig satt knappe-verdier. Disse kan heller hentes fra en JSON-fil slik at tittelen til knappen bestemmer hva knappen gjør
const [buttonLabels, setButtonLabels] = useState([
  ['Game Scene', 'Start Stream'],
  ['Be Right Back', 'Love'],
  ['Talk to Chat', 'Record'],
  ['Mute', 'Audio Mixer']
]);
/*Dette er fremtiden til buttonlabels
const [buttonLabels, setButtonLabels] = useState([
  {key: "setScene", label: "Game Scene"},
  {key: "setScene", label: "Be Right Back"},
  {key: "setScene", label: "Talk to Chat"},
  {key: "startStream", label: "Start Stream"},
  {key: "getSceneBtn", label: "getSceneBtn"}
])*/

// Array av farger til knappene
const buttonColors = [
  ['#E7514C', '#3F7C9E'],
  ['#5D8E8D', '#46806A'],
  ['#CF6D37', '#5D758E'],
  ['#46806A', '#C57E31']
];

// Array av ikoner til knappene
const buttonIcons = [
  ['gamepad', 'play'],
  ['hand-peace-o', 'heart'],
  ['comments', 'video-camera'],
  ['microphone', 'volume-off']
];

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


//Replace the new name in the array
  function replaceValue(searchValue, replaceValue) {
    const updatedLabels = buttonLabels.map(row =>
      row.map(label => (label === searchValue ? replaceValue : label))
    );
    setButtonLabels(updatedLabels);

  }

   //Funksjon som henter Scene status og håndterer eventuelle errors
  const getSceneBtn = async () => {
    try {
      if (obs) {
        console.log(await getScene(obs));
        return await getScene(obs);
      } else {
        console.error('OBS connection not established.');
      }
    } catch (error) {
      console.error('Error while getting scene:', error);
    }
  };

  //Denne funksjonen henter og returnerer en ren liste med alle scener
  const getSceneList = async () => {
    const response = await obs.call('GetSceneList');
    const sceneNames = response.scenes.map(scene => scene.sceneName);

    setSceneList(sceneNames);
    return sceneNames;
  }

  //En asynkron-funksjon som fungerer som bro til en synk knapp
   const getScene = async (obs) => {
    return await obs.call('GetCurrentProgramScene');
  };

  //Når bruker klikker "connect" knappen, så settes ipAddress til verdien av inputText sånn at connection funksjonen kjøres.
  const handleButtonClickIP = () => {
    setIpAddress(inputText)
  };

  //Håndter sceneSkifte-funksjonalitet

  //Funksjon for å trykke på knapper
  const handleButtonClick = (buttonTitle) => {
    getSceneList();
    //Midlertidig hardcode
    //Her er det kanskje kurant å sette opp så mange knappe-funksjoner som mulig, så kan vi definere her hva en individuell knapp gjør
    try {

      if(sceneList.includes(buttonTitle)) {
        setScene(obs, buttonTitle);
    }
      else if(buttonTitle === "Start Stream") {
        obs.call('StartStream');
    }
      else if(buttonTitle === "Stop Stream") {
        obs.call('StopStream');
    }
    }
    catch(error) {
      console.log(error);
    }
    
    
  }

  const handleLongPress = (buttonTitle) => {
    //Henter en liste over scener og setter den i en state
    getSceneList();
    setSelectionWindowVisible(true);
    setSelectedBtn(buttonTitle)
    setButtonLabelValue(buttonTitle);
  }

  //Async funksjon for å overføre til synk funksjon
  const setScene = async (obs, scene) => {
    await obs.call('SetCurrentProgramScene', { sceneName: scene });
  };

  //Dette er den overlayen som vises når en knapp holdes inne 
  function overlayBox (btnName) {
    return(
      <View style={[styleCustomizeWindow.container, styleCustomizeWindow.overlayBoxContainer]}>
        <Text style={styleCustomizeWindow.title}>What should this button do?</Text>
      {/*Denne sceneList.map henter inn det filtrerte resultatet fra getSceneList og looper gjennom det, for øyeblikket i tekstform */}

      <TouchableOpacity onPress={() => {replaceValue(selectedBtn, "Start Stream");setSelectionWindowVisible(false);}}>
        <Text style={styleCustomizeWindow.text}>Start Stream</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {replaceValue(selectedBtn, "Stop Stream");setSelectionWindowVisible(false);}}>
        <Text style={styleCustomizeWindow.text}>Stop Stream</Text>
      </TouchableOpacity>
      <Text style={styleCustomizeWindow.setScene}>Set scene to: </Text>
      {sceneList.map((scene) => (

        <TouchableOpacity onPress={() => {replaceValue(selectedBtn, scene);setSelectionWindowVisible(false);}}>
          <Text style={styleCustomizeWindow.text}>{scene}</Text>
          </TouchableOpacity>
      ))}
      
      <Text style={styleCustomizeWindow.text}>Change Button Label</Text>
      <TextInput placeholder='Button Label' value={buttonLabelValue} onChangeText={setButtonLabelValue}style={styleCustomizeWindow.text}></TextInput>
      <TouchableOpacity onPress={() => {replaceValue(selectedBtn, buttonLabelValue);setSelectionWindowVisible(false);setButtonLabelValue("");}}>
  <View style={styleCustomizeWindow.applyChangesContainer}>
    <Text style={styleCustomizeWindow.applyChangesText}>Apply changes</Text>
  </View>
</TouchableOpacity>
    </View>
    )
  }
  

//Synnes connection-frontend returneres hvis useState connectedStatus ikke stemmer
  if(!connectedStatus) {
    return (
      <View style={stylesconnect.container}>
        <Image style={stylesconnect.Image} source={require('./assets/vizrt-logo-front.png')}></Image>
        <StatusBar style="auto" />
        <TextInput style={stylesconnect.TextInput} value={inputText} onChangeText={setInputText} placeholder="IP-address"/>
        <TouchableOpacity style={stylesconnect.ConnectBtn} onPress={handleButtonClickIP}>  
        <Text style={stylesconnect.btnText}>Connect Manually</Text>
        </TouchableOpacity>
      </View>
    );
    //Hvis vi har koblet oss til, så re-renderer vi til Matias sin Knapp-frontend.
  } else if (connectedStatus) {
      {/* Grid */}

      return (
        <SafeAreaView style={styles.container}>
        {/* Top Navigation */}
        <View style={styles.navigation}>
  
          {/*Edit knapp*/}
                  {/*         NB        */}
                  {/* Bytt HandleButtonClick til HandleEditClick*/}
  
          <TouchableOpacity onPress={() => handleButtonClick('Edit')} style={styles.editButton}>
            <Icon style={styles.editIcon} name="edit" size={30} color="#EF824F" />
          </TouchableOpacity>
          
          {/*Settings knapp*/}
                  {/*         NB        */}
                  {/* Bytt HandleButtonClick til HandleSettingsClick*/}
  
  
          <TouchableOpacity onPress={() =>handleButtonClick('Settings')} style={styles.settingsButton}>
            <Icon style={styles.gearIcon} name="gear" size={30} color="#EF824F" />
          </TouchableOpacity>
  
        </View>
  
        {/* Grid */}
     <View style={styles.gridContainer}>
        {buttonLabels.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>

            {row.map((title, cellIndex) => {
              const color = buttonColors[rowIndex][cellIndex];
              return (
                <TouchableOpacity
                  key={cellIndex}
                  style={[styles.cell, { backgroundColor: color }]}
                  onPress={() => handleButtonClick(title)}
                  onLongPress={() => handleLongPress(title)}
                >
                  <Icon name={buttonIcons[rowIndex][cellIndex]} size={50} color="white" />
                  <Text style={styles.buttonText}>{title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
  
        {selectionWindowVisible &&
        overlayBox(selectedBtn)
        }
  
  
        {/* Bottom Navigation */}
        <View style={styles.bottomNavigation}>
  
                <TouchableOpacity onPress={() => handleButtonClick('Plus')} style={styles.addButton}>
                  <Text style={styles.addButtonIcon}>+</Text>
                </TouchableOpacity>
  
        </View>
      </SafeAreaView>
  );
}
}

//Styliseringen for Connection-siden. 
const stylesconnect = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C3640',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 200,
  },
  Text:{
    color: '#EF824F', 
    fontSize: 25, 
  }, 
  ConnectBtn:{
    alignItems: 'center',
    marginTop:25,
    backgroundColor: '#DE7849',
    padding: 10,
    height: 39,
    width: 190,
    borderRadius:10,
  }, 
  btnText:{
    fontSize: 18, 
    color:'white',
    fontWeight: 500,
  },
  TextInput: {
    height: 60,
    backgroundColor: 'azure', 
    fontSize: 20,  
    width: 300,
    borderRadius: 20,
    textAlign: 'center',
    marginTop:100,
  },

  Image:{
    height: 107, 
    width: 163,
  }

});


//Stylisation for knapp-viewen

const styles = StyleSheet.create({
 
  container: {
  backgroundColor:'#1C3640',
  flex: 1,
},
navigation: {
  height: 50,
  backgroundColor: '#1C3640',
  flexDirection: 'row',
  justifyContent: 'space-between'
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
  borderRadius: 25,
  borderColor: 'black',
  margin: 10,
},  
  buttonText: {
  color: 'white',
  fontSize: 16,
  marginTop: 10,
},
  editButton: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  settingsButton: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  bottomNavigation:{
    justifyContent: 'center',
    alignItems: 'center',

  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#EF824F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    
  },
  addButtonIcon: {
    color: 'white',
    fontSize: 40

  },
  editIcon: {
    paddingLeft: 20
  },
  gearIcon:{
    paddingRight: 20
  }
});


const styleCustomizeWindow = StyleSheet.create({
  overlayBoxContainer: {
  backgroundColor:'#E8E8E8',
  borderRadius:15,
  justifyContent: 'center',
  alignItems: 'center',
  width:300,
  padding:10,
  alignSelf: 'center',
  },

  title:{
    fontWeight: 'bold',
     fontSize:20,
     marginBottom:10,
  },

  text: {
    fontSize: 17, // Increase the font size for all the text inside the box
    marginBottom: 5, // Add margin at the bottom for all the text
    textDecorationLine: 'underline', // Add an underline style
  },

applyChangesContainer: {
  backgroundColor: '#DE7849',
  padding: 10,
  borderRadius: 15,
  margin:10,
},
applyChangesText: {
  color: 'white',
  fontSize:18
},

setScene:{
  fontWeight:'bold',
  margin:10,
  fontSize:16,
}
  
});


export default App; 
