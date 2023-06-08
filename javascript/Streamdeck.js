import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, SafeAreaView, Button, Text , TouchableOpacity} from 'react-native';

const App = () => {
  const buttonLabels = [
    ['Button 1', 'Button 2'],
    ['Button 3', 'Button 4'],
    ['Button 5', 'Button 6'],
    ['Button 7', 'Button 8']
  ];

  const handleButtonClick = (title) => {
    console.log(`You clicked Button: ${title}`);
  };

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
            {row.map((title, cellIndex) => (

              <TouchableOpacity
                key={cellIndex}
                style={styles.cell}
                onPress={() => handleButtonClick(title)}>

                <Text 
                    style={styles.buttonText}>{title}
                </Text>
              </TouchableOpacity>
            ))}
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
};

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
    borderColor: 'black',
  },  
    buttonText: {
    color: 'white',
    fontSize: 16,
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

export default App;
