import {View, Button, StyleSheet} from 'react-native'; 
import React from 'react'; 
import {useNavigation } from '@react-navigation/native'; 

export default function Home (){
    const navigation = useNavigation(); 

return (
    <View style={StyleSheet.container}>
        <Button title='Scan' onPress={()=> navigation.navigate('Scanner')} />
    </View>
); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})
