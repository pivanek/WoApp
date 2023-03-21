import { Alert, StyleSheet } from 'react-native';

import { TextInput, View, Text, TouchableOpacity } from '../../components/Themed';
import { useState } from 'react';
import { auth } from '../../src/auth';
import LoginScreen from '../Stack/LoginScreen';


export default function ProfileScreen({navigation} : any) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => auth.signOut().then(() => navigation.push(LoginScreen))}
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
