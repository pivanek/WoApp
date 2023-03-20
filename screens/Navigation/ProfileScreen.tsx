import { StyleSheet } from 'react-native';

import { TextInput, View, Text, TouchableOpacity } from '../../components/Themed';
import { useState } from 'react';


export default function ProfileScreen({navigation} : any) {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

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
        <TouchableOpacity>
          <Text style={styles.link}>
            Forgot password ? 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          darkColor="#313130"
          lightColor="#D4D4D3"
          style={styles.button}
        >
          <Text style={[styles.text, { textAlign: 'left' }]}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => (navigation.navigate("RegistrationScreen"))}>
          <Text style={[styles.link, {textAlign: 'center', height: 30, textAlignVertical: 'center'}]}>
            Register
          </Text>
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
