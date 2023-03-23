import { Alert, StyleSheet } from 'react-native';

import { TextInput, View, Text, TouchableOpacity } from '../../components/Themed';
import { useState } from 'react';
import auth, { database } from '../../src/auth';
import LoginScreen from '../Stack/LoginScreen';
import { doc, setDoc } from 'firebase/firestore';


export default function ProfileScreen({navigation} : any) {
  function createUserInDatabase() {
    const userEmail =  auth.currentUser?.email;

    if(userEmail){
      const cityRef = doc(database, 'users', userEmail);
      setDoc(cityRef, { email: userEmail }, { merge: true })
        .then(() => console.log('Saved'))
        .catch((error : Error) => {
          const errorMessage : string = error.message;

          Alert.alert('Error saving data', errorMessage)
        });
    }
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => createUserInDatabase()}
        darkColor="#313130"
        lightColor="#D4D4D3"
        style={styles.button}
      >
        <Text style={[styles.text, { textAlign: 'left' }]}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    color: '#00C5FF',
    fontWeight: '500',
    fontSize: 16,
    height: 40,
    textAlignVertical: 'center'
  },
  button:{
    alignItems: "center",
    borderRadius: 10,
    width: 250,
    height: 40,
    marginTop: 30
  },
});
