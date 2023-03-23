import { Alert, StyleSheet } from 'react-native';

import { TextInput, View, Text, TouchableOpacity } from '../../components/Themed';
import { useState } from 'react';
import auth, { database } from '../../src/auth';
import LoginScreen from '../Stack/LoginScreen';
import { doc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { UserProfileIcon } from '../../components/Icons';


export default function ProfileScreen({navigation} : any) {
  const [weight, setWeight] = useState<string>();
  const [hewight, setHeight] = useState<string>();

  function handleNumberChange(value : string){
    if(!Number.isNaN(Number.parseInt(value)))
      return value;
    else
      return '';
  }


  return (
    <View style={styles.container}>
      <View style={{borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginTop: 20, width: '90%', paddingHorizontal: 20, paddingVertical: 10}} darkColor='#111111'>
        <UserProfileIcon color='#313131' style={{flex: 1}}/>
        <View style={{flex: 1}} darkColor='#111111'>
          <Text style={{margin: 5, textAlign: 'center', textAlignVertical: 'center', fontSize: 16 }}>{auth.currentUser?.email}</Text>
          <TouchableOpacity 
            onPress={() => 
              Alert.alert(
                "Singout",
                "Are you sure you want to sing out",
                [
                  {text: 'Cancel'},
                  {
                    text: 'Yes',
                    onPress: () => signOut(auth)
                  }
                ]
              )
            }
            darkColor="#252525"
            lightColor="#D4D4D3"
            style={styles.button}
          >
            <Text style={styles.text}>
                Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 30}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>Weight: </Text>
          <TextInput
            darkColor='#292929'
            style={styles.input}
            onChangeText={(value) => setWeight(handleNumberChange(value))}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>Height: </Text>
          <TextInput
            darkColor='#292929'
            style={styles.input}
            keyboardType='numeric'
            onChangeText={(value) => setHeight(handleNumberChange(value))}
          />
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  text:{
    color: '#00C5FF',
    fontWeight: '500',
    fontSize: 16,
    height: 32,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  button:{
    borderRadius: 10,
    height: 32,
    width: 150,
    alignSelf: 'center',
    margin: 5
  },
  input:{
    height: 45,
    width: 55,
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 15,
    paddingHorizontal: 15
},
});
