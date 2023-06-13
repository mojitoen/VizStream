import React from 'react'; 
import Scanner from './Scanner';
import Home from './Home'; 
import {NavigationContainer} from '@react-navigation/native'; 
import {createAppContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 

const Stack = createStackNavigator(); 

function QR (){
    return (
        <Stack.Navigator> 
            <Stack.Screen name="Home" component={Home}/>
             <Stack.Screen name ="Scanner" component={Scanner} />
        </Stack.Navigator>
    ); 
}

export default () => {
    return (
        <NavigationContainer>
            <QR/>
        </NavigationContainer>
    )
}
