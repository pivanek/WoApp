import { Alert, ScrollView, StyleSheet } from "react-native";

import { sendEmailVerification, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { UserProfileIcon } from "../../components/Icons";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "../../components/Themed";
import auth, { database } from "../../src/auth";
import { DaysOfWeek, PR, Rutine, User } from "../../src/User";
import { DocumentReference, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { Log } from "../../src/Log";
import { Workout } from "../../src/Workout";
import { RutineDay } from "../../components/RutineDay";


export default function ProfileScreen({ navigation, route }: any) {
  const [user, setUser] = useState<User>(auth.currentUser?.email? new User(auth.currentUser?.email) : navigation.navigate('LoginScreen'));

  const [weight, setWeight] = useState<string>();
  const [height, setHeight] = useState<string>();
  const [exercises, setExercises] = useState<PR[]>(user.getPRs());
  
  const [refreshing, setRefreshing] = useState(true);
  const [workoutNames, setWorkoutNames] = useState<string[]>([]);
  const [rutine, setRutine] = useState<Rutine>()
  const isFocused = useIsFocused();

  

  function handleNumberChange(value: string) {
    if (!Number.isNaN(Number.parseInt(value))) return value;
    else return "";
  }

  function handlePRChange(index : number, value : number) {
    const userHelper = new User(user);

    userHelper.setPRValue(index, value)

    setUser(userHelper);
    setExercises(userHelper.getPRs());
  }

  function handleSave(){
    const userHelper = new User(user);
    userHelper.setPRs(exercises);

    userHelper.saveChanges(success => console.log(success? user.getPRs() : 'Failed to save data.'));
  }

  const loadData = async () => {
    setRefreshing(false);

    if(user.email){
      const rutineDoc = doc(database, 'users', user.email, 'events', 'rutine');

      const rutineData = await getDoc(rutineDoc);
      const data = await getDoc(user.userDocPath);

      const q = query(collection(database, 'users', user.email, 'workouts'));
      const workoutsData = await getDocs(q);
      const userHelper = data.data();

      if(userHelper){
        setUser(new User(userHelper));
        setWeight(userHelper.weight? userHelper.weight.toString() : '');
        setHeight(userHelper.height? userHelper.height.toString() : '');
        setExercises(userHelper.PRs? userHelper.PRs : []);
      }
      if(workoutsData){
        const docHelper : string[] = [];
        docHelper.push('Rest');

        workoutsData.forEach((doc) =>
          docHelper.push(doc.data().name)
        )
        setWorkoutNames(docHelper);
      }
      if(rutineData)
        setRutine(rutineData.data() as Rutine);
    }
  }

  function handleRutineChange(day : DaysOfWeek, workoutName : string){
    const userHelper = new User(user);

    userHelper.setRutineValue(day, workoutName)

    setUser(userHelper);
    setRutine(userHelper.getRutine());
  }

  

  const RenderItem = (props : { index : number, item : PR, value : string, onChange : (index : number,value : string) => void}) => {
    const [value, setValue] = useState<string>(props.value);
    
    function handleChange(){
      const valueHelper = (value == '0')? '' : value;
      
      setValue(valueHelper);
      props.onChange(props.index, value)
    }
    
    return(
      <View style={{ marginLeft: 12, marginVertical: 5, flexDirection: 'row'}}>
        <View style={{width: '79%', height: 40}}>
          <Text style={{fontSize: 18, textAlignVertical: "center", height: 40}}>{props.item.name}</Text>
        </View>
        <TextInput
            keyboardType="numeric"
            darkColor="#292929"
            style={styles.input}
            onChangeText={value => setValue(handleNumberChange(value))}
            placeholder="000"
            value={value == '0'? '' : value}
            onEndEditing={() => handleChange()}
          />
      </View>
    );
  }

  useEffect(() => {
    if (route.params?.exercises && isFocused) 
      setExercises(route.params.exercises);
    else
      isFocused && setRefreshing(true);

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
    <ScrollView style={styles.container}>
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
      <View>
        <Text style={{fontSize: 24, width: '100%', fontWeight: 'bold', marginTop: 30}}>Your Current Maximums: </Text>
        <View style = {{height: 2, backgroundColor: '#929494'}}/>
        {
          exercises.map((item, index) => <RenderItem index={index} item={item} value={item.weight?.toString()??''} onChange={(index, value) => handlePRChange(index, Number(value))}/>)
        }
        <View style = {{height: 2, backgroundColor: '#929494'}}/>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate('ExerciseSearch', { prevScreen: route.name, exercises: exercises})}>
          <Text style={{fontSize: 16, padding: 12, textAlign: 'center', color: '#00C5FF'}}>Add exercises</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{fontSize: 24, width: '100%', fontWeight: 'bold', marginTop: 30}}>Your Rutine: </Text>
        <View style = {{height: 2, backgroundColor: '#929494'}}/>
        <RutineDay day='Monday' onChange={(workoutName, day) => handleRutineChange(day, workoutName)} workoutNames={workoutNames} defaultValue={rutine? rutine.Monday : ''}/>
        <View style = {{height: 2, backgroundColor: '#929494'}}/>
        <RutineDay day='Tuesday' onChange={(workoutName, day) => handleRutineChange(day, workoutName)} workoutNames={workoutNames} defaultValue={rutine? rutine.Tuesday : ''}/>
        <View style = {{height: 2, backgroundColor: '#929494'}}/>
        <RutineDay day='Wednesday' onChange={(workoutName, day) => handleRutineChange(day, workoutName)} workoutNames={workoutNames} defaultValue={rutine? rutine.Wednesday : ''}/>
        <View style = {{height: 2, backgroundColor: '#929494'}}/>
        <RutineDay day='Thursday' onChange={(workoutName, day) => handleRutineChange(day, workoutName)} workoutNames={workoutNames} defaultValue={rutine? rutine.Thursday : ''}/>
        <View style = {{height: 2, backgroundColor: '#929494'}}/>
        <RutineDay day='Friday' onChange={(workoutName, day) => handleRutineChange(day, workoutName)} workoutNames={workoutNames} defaultValue={rutine? rutine.Friday : ''}/>
        <View style = {{height: 2, backgroundColor: '#929494'}}/>
        <RutineDay day='Saturday' onChange={(workoutName, day) => handleRutineChange(day, workoutName)} workoutNames={workoutNames} defaultValue={rutine? rutine.Saturday : ''}/>
        <View style = {{height: 2, backgroundColor: '#929494'}}/>
        <RutineDay day='Sunday' onChange={(workoutName, day) => handleRutineChange(day, workoutName)} workoutNames={workoutNames} defaultValue={rutine? rutine.Sunday : ''}/>
      </View>
      <TouchableOpacity
        darkColor="#252525"
        lightColor="#D4D4D3"
        onPress={() => handleSave()}
        style={[styles.button, {width: '60%', height: 50, marginVertical: 50}]}
      >
        <Text style={[styles.buttonText, { height: 50}]}>Save changes</Text>
      </TouchableOpacity>
    </ScrollView>
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
