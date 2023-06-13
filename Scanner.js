import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
import {BarCodeScanner} from 'expo-barcode-scanner'; 

export default function Scanner(){
    const [hasPermission, setHasPermission] = useState(null); 
    const [scanned, setScanned] = useState(false); 

    useEffect (()=>{
        (async ()=>{
            const {status} = await BarCodeScanner.requestPermissionsAsync ();
            setHasPermission(status === 'granted'); 
    }) (); 
    }, []); 
    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true); 
        alert (`Bar Code with ${type} and data ${Linking.openURL(`${data}`)} has been scanned`); 
    }; 
    if(hasPermission === null ){
        return <Text>Request for camera persmission</Text>
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style = {StyleSheet.absoluteFillObject} />
        </View>
    )
}
const styles = StyleSheet.create ({
    container: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center'
    }
})