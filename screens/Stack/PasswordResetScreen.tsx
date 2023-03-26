import { Alert, StyleSheet } from 'react-native';

import { TextInput, View, Text, TouchableOpacity } from '../../components/Themed';
import { useState } from 'react';
import auth from '../../src/auth';
import { sendPasswordResetEmail } from 'firebase/auth';


export default function PasswordResetScreen({ navigation } : any) {
  const [email, setEmail] = useState<string>('');
  

  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize: 15}}>
          Email
        </Text>
        <TextInput 
          style={styles.textInput}
          darkColor='#313130'
          placeholderTextColor={"grey"}
          placeholder='Email' 
          textContentType="emailAddress" 
          value={email}
          onChangeText={((value) => setEmail(value))}
        />
      </View>
      <TouchableOpacity
        darkColor="#313130"
        lightColor="#D4D4D3"
        style={styles.button}
        onPress={() => 
          sendPasswordResetEmail(auth, email)
            .then(() => Alert.alert("Email was sent.", 'Email for reset you passwort was sent to your email adress'))
            .catch((error) => {
              const errorCode : string = error.code;
    
              Alert.alert('Registration failed', errorCode.substring(5))
            })
        }
      >
        <Text style={[styles.text, { textAlign: 'left' }]}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput:{
    paddingLeft: 10,
    margin: 5,
    width: 250,
    height: 40,
    borderRadius: 5,
  },
  button:{
    alignItems: "center",
    borderRadius: 10,
    width: 250,
    height: 40,
    marginTop: 20
  },
  text:{
    color: '#00C5FF',
    fontWeight: '500',
    fontSize: 16,
    height: 40,
    textAlignVertical: 'center'
  },
  link:{
    color: '#00C5FF',
    fontWeight: '400',
    fontSize: 14,
    width: 240
  }
});
