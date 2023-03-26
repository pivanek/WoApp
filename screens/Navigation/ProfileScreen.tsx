import { Alert, FlatList, RefreshControl, StyleSheet } from "react-native";

import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { UserProfileIcon } from "../../components/Icons";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "../../components/Themed";
import auth from "../../src/auth";
import { ExerciseItem } from "../../components/ExerciseItem";
import { PR, User } from "../../src/User";
import { Button } from "../../components/Button";
import { getDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { Log } from "../../src/Log";

export default function ProfileScreen({ navigation, route }: any) {
  const [user, setUser] = useState<User>(auth.currentUser?.email? new User(auth.currentUser?.email) : navigation.navigate('LoginScreen'));

  const [weight, setWeight] = useState<string>();
  const [height, setHeight] = useState<string>();
  const [exercises, setExercises] = useState<PR[]>(user.getPRs());
  const [PRWeights, setPRWeights] = useState(exercises.map(value => {return value.weight}))

  const [refreshing, setRefreshing] = useState(true);
  const isFocused = useIsFocused();

  function handleNumberChange(value: string) {
    if (!Number.isNaN(Number.parseInt(value))) return value;
    else return "";
  }

  function handlePRChange(index : number, value : number) {
    const userHelper = new User(user);

    userHelper.setPRValue(index, value)

    setUser(userHelper);
    setExercises(userHelper.getPRs()) 
  }

  function handleSave(){
    const userHelper = new User(user);
    userHelper.setPRs(exercises);

    userHelper.saveChanges(success => console.log(success? user.getPRs() : 'Failed to save data.'));
  }

  const loadData = async () => {
    setRefreshing(false);

    if(user.email){
      const data = await getDoc(user.userDocPath);
      const userHelper = data.data();      
      
      if(userHelper){
        setUser(new User(userHelper));
        setWeight(userHelper.weight? userHelper.weight.toString() : '');
        setHeight(userHelper.height? userHelper.height.toString() : '');
        setExercises(userHelper.PRs? userHelper.PRs : []);
      }
    }
  }

  const RenderItem = (props : { index : number, item : PR, value : number, onChange : (index : number,value : string) => void}) => {
    return(
      <View style={{ marginLeft: 12, marginVertical: 5, flexDirection: 'row'}}>
        <View style={{width: '79%', height: 40}}>
          <Text style={{fontSize: 18, textAlignVertical: "center", height: 40}}>{props.item.name}</Text>
        </View>
        <TextInput
            keyboardType="numeric"
            darkColor="#292929"
            style={styles.input}
            onChangeText={(value) => props.onChange(props.index, handleNumberChange(value))}
            placeholder="000"
            value={(props.value == 0)? '' :  props.value.toString()}
          />
      </View>
    );
  }

  useEffect(() => {
    isFocused && setRefreshing(true)
    if (route.params?.exercises && isFocused) 
      setExercises(route.params.exercises);
  } ,[isFocused])

  useEffect(() => {
    const userHelper = new User(user);
    userHelper.setWeight(Number(weight == ''? 0 : weight));

    setUser(userHelper);
  }, [weight])

  useEffect(() => {
    const userHelper = new User(user);
    userHelper.setHeight(Number(height == ''? 0 : height));

    setUser(userHelper);
  }, [height])
      

  if(refreshing)
    loadData();

  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
        darkColor="#111111"
      >
        <UserProfileIcon color="#313131" style={{ flex: 1 }} />
        <View style={{ flex: 1 }} darkColor="#111111">
          <Text
            style={{
              margin: 5,
              textAlign: "center",
              textAlignVertical: "center",
              fontSize: 16,
            }}
          >
            {auth.currentUser?.email}
          </Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert("Singout", "Are you sure you want to sing out", [
                { text: "Cancel" },
                {
                  text: "Yes",
                  onPress: () => signOut(auth),
                },
              ])
            }
            darkColor="#252525"
            lightColor="#D4D4D3"
            style={[styles.button, { height: 32, width: 150}]}
          >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={{ fontSize: 20 }}>Weight: </Text>
          <TextInput
            keyboardType="numeric"
            darkColor="#292929"
            placeholder="000"
            style={styles.input}
            onChangeText={(value) => setWeight(handleNumberChange(value))}
            value={weight}
          />
        </View>
        <View style={styles.column}>
          <Text style={{ fontSize: 20 }}>Height: </Text>
          <TextInput
            darkColor="#292929"
            style={styles.input}
            placeholder="000"
            keyboardType="numeric"
            onChangeText={(value) => setHeight(handleNumberChange(value))}
            value={height}
          />
        </View>
      </View>
      <FlatList
        ListHeaderComponent={<><Text style={{fontSize: 24, width: '100%', fontWeight: 'bold', marginTop: 30}}>Your Personal Records: </Text><View style = {{height: 2, backgroundColor: '#929494'}}/></>}
        data={exercises}
        renderItem={({ item, index }) => <RenderItem index={index} item={item} value={(!item.weight)? 0 : item.weight} onChange={(index, value) => handlePRChange(index, Number(value))}/> }
        ItemSeparatorComponent={ () => <View style = {{height: 2, backgroundColor: '#929494'}}/> }
        ListFooterComponent={
          <>
            <View style = {{height: 2, backgroundColor: '#929494'}}/>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate('ExerciseSearch', { prevScreen: route.name, exercises: exercises})}>
              <Text style={{fontSize: 16, padding: 12, textAlign: 'center', color: '#00C5FF'}}>Add exercises</Text>
            </TouchableOpacity>
          </>
        }
      />
      <TouchableOpacity
        darkColor="#252525"
        lightColor="#D4D4D3"
        onPress={() => handleSave()}
        style={[styles.button, {width: '60%', height: 50, marginVertical: 50}]}
      >
        <Text style={[styles.buttonText, { height: 50}]}>Save changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center"
  },
  buttonText: {
    color: "#00C5FF",
    fontWeight: "500",
    fontSize: 16,
    height: 32,
    textAlignVertical: "center",
    textAlign: "center",
  },
  button: {
    borderRadius: 10,
    alignSelf: "center",
    margin: 5,
  },
  input: {
    height: 45,
    width: 65,
    fontSize: 18,
    textAlign: "center",
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  row: { 
    flexDirection: "row",
    marginTop: 30
  },
  column: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
});
