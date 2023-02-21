import { Alert, FlatList, StyleSheet } from 'react-native';
import { View, Text, Pressable } from '../../components/Themed';
import { AddNew_Empty } from '../../components/Add';
import { deleteWorkouts, getData } from '../../src';
import { Button } from '../../components/Button';
import { HIITWorkout, IWorkout, Workout, WorkoutType } from '../../src/Workout';
import { useState, useEffect, useLayoutEffect } from 'react';
import exercises = require("../../src/exercises.json");

export default function WorkoutsScreen({ navigation } : any) {
  const [workouts, setWorkouts] = useState<IWorkout[]>();
  const [isPressed, setPressed] = useState('');

  useEffect(() => {
    getData('Workouts', (data : Map<string, IWorkout>) => {
      const workoutsData : Array<IWorkout> = Array.from(data.values());
      const workoutsHelper : IWorkout[] = Array<IWorkout>();
      
      workoutsData.forEach((element : any) => {
        workoutsHelper.push(Workout.from(element));
      });

      setWorkouts(workoutsHelper);
    });
  });

  if(workouts?.length == 0 || workouts == undefined){
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <AddNew_Empty text="Add new workout" onPress={() => navigation.navigate('SetUpWorkout')}/>
        </View>
      );
    }
    else{
      return(
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
            <FlatList style={styles.flatList} data={workouts} renderItem={({ item }) => <Pressable style={styles.itemContainer} darkColor="#313131" lightColor="#D4D4D3" onPress={() => setPressed((item.getName() == isPressed)? '' : item.getName())}><Item data={item} pressed={isPressed} navigation={navigation}/></Pressable>}/>
            <Button style={styles.buttonAdd} onPress={() => navigation.navigate('SetUpWorkout')}>Add new workout</Button>
        </View>
      );
    }
}

export function Item(params: {data: IWorkout, pressed : string, navigation : any}){
  const exercises : string[] = params.data.getExercises();
  const name : string = params.data.getName();

  function handleDelete() {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this name?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            params.data.delete((success) => console.log(success? 'Data deleted successfully' : 'Failed to delete successfully'));
          },
        },
      ],
    );
  }

  return(
    <>
      <Text darkColor='#fff' lightColor='#000' style={{paddingHorizontal: 30, fontSize: 18}}>{name}</Text>
      { (exercises.length == 0)? null : 
        <>
          <View style={styles.separatorHorizontal} />
          <FlatList style={styles.flatList} data={exercises} renderItem={({ item }) => <Text style={{color: '#929494', marginVertical: 2}}>{item.replace(/_/g, ' ')}</Text>} />
        </>}
      { (params.pressed == name)?
        <>
          <View style={styles.separatorHorizontal}/>
          <View style={{marginTop: 5, flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0)'}}>
            <Pressable darkColor='#313131' lightColor="#D4D4D3" style={styles.workoutButtons} onPress={() => handleDelete()}>
              <Text style={[styles.workoutButtonsText, {color: 'red'}]}>Delete</Text>
            </Pressable>
            <View style={styles.separatorVertical}/>
            <Pressable onPress={() => params.navigation.navigate('SetUpWorkout', {workout: params.data})} darkColor='#313131' lightColor="#D4D4D3" style={styles.workoutButtons}>
              <Text style={styles.workoutButtonsText}>Edit</Text>
            </Pressable>
            <View style={styles.separatorVertical}/>
            <Pressable darkColor='#313131' lightColor="#D4D4D3" style={styles.workoutButtons}>
              <Text style={styles.workoutButtonsText}>Start</Text>
            </Pressable>
          </View>
        </>
        : null 
      }
    </>
  );
}

const styles = StyleSheet.create({
  flatList:{
    alignSelf: 'center',
    width: '90%',
  },
  itemContainer: {
    paddingVertical: 10,
    borderRadius: 15,
    minHeight: 30,
    marginTop: 10
  },
  separatorHorizontal:{
    marginTop: 5,
    marginHorizontal: 20,
    height: 1,
    backgroundColor: '#929494',
    marginVertical: 4
  },
  separatorVertical:{
    width: 1,
    backgroundColor: '#929494'
  },
  workoutButtons:{
    flex: 1,
    padding: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  workoutButtonsText:{
    color: '#00C5FF',
    fontSize: 16
  },
  buttonAdd: {
    width: '80%',
    marginTop: 10,
  }
});