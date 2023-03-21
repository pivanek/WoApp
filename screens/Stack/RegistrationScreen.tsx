import { Alert, StyleSheet } from 'react-native';

import { TextInput, View, Text, TouchableOpacity } from '../../components/Themed';
import { useState } from 'react';
import { auth } from '../../src/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export default function ProfileScreen({navigation} : any) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  function validateEmail() : boolean{
    //https://www.w3resource.com/javascript/form/email-validation.php
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const valid = emailRegex.test(email);

    if(!valid)
      Alert.alert(
        'Email',
        'Invalid E-mail address',
        [
          {
            text: 'Ok',
          },
        ],
      );

    return valid;
  }

  function validatePassword() {
    if(password === passwordCheck){
      if(password.length >= 8){
        const lowerCaseReg = /[a-z]/g;
        const upperCaseReg = /[A-Z]/g;
        const numberReg = /[0-9]/g;

        if (lowerCaseReg.test(password) && upperCaseReg.test(password) && numberReg.test(password))
          return true;
        else
          Alert.alert(
            'Password',
            'Password must contain at least one number, one lowercase and one uppercase letter');
      }
      else
        Alert.alert(
          'Password',
          'Minimum password lenght is 8 characters'
        );
    }
    else
      Alert.alert( 'Password', 'Passwords does not match');
    return false;
  }

  function singUp() {
    if (validateEmail() && validatePassword()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;
        navigation.goBack();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          Alert.alert('Registration failed', errorMessage)
        });
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize: 15}}>
          Email
        </Text>
        <TextInput
          autoComplete="email"
          style={styles.textInput}
          darkColor='#313130'
          placeholderTextColor={"grey"}
          placeholder='Email' 
          textContentType="emailAddress" 
          keyboardType="email-address"
          value={email}
          onChangeText={((value) => setEmail(value))}
        />
      </View>
      <View>
        <Text style={{fontSize: 15}}>
          Password
        </Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={"grey"}
          darkColor='#313130'
          placeholder='Password' 
          textContentType="password"
          secureTextEntry
          value={password}
          onChangeText={((value) => setPassword(value))}
        />
      </View>
      <View>
        <Text style={{fontSize: 15}}>
          Confirm password
        </Text>
         <TextInput
          
          style={styles.textInput}
          placeholderTextColor={"grey"}
          darkColor='#313130'
          placeholder='Password' 
          textContentType="password"
          secureTextEntry
          value={passwordCheck}
          onChangeText={((value) => setPasswordCheck(value))}
        />
      </View>
        <TouchableOpacity
          darkColor="#313130"
          lightColor="#D4D4D3"
          style={styles.button}
          onPress={() => singUp() }
        >
          <Text style={[styles.text, { textAlign: 'left' }]}>Sing Up</Text>
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
    marginTop: 30
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