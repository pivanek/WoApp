import { FlatList, GestureResponderEvent, RefreshControl, ScrollView, StyleProp, StyleSheet, ViewStyle, VirtualizedList } from 'react-native';

import { Text, View, TextInput, Pressable } from '../../components/Themed';
import RadioButton from '../../components/RadioButton';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import TimeSetter from '../../components/TimeSetter';
import { HIITWorkout, IWorkout, Workout, WorkoutType } from '../../src/Workout';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CrossIcon } from '../../components/Icons';
import IExercise from '../../src/Exercise

export default function SetUpWorkout( { navigation, route } : any) {
  const [workout] = useState<IWorkout>((route.params?.workout !== undefined)? route.params?.workout : new Workout(''));
  const [exercises, setExercises] = useState<IExercise[]>(workout.getExercises());

  const [checkedRadio, setChecked] = useState<WorkoutType>(workout.getType());
  const [name, setName] = useState<string>(workout.getName());

  const [pauseTime, setPauseTime] = useState<Date>(typeof workout == typeof HIITWorkout? (workout as HIITWorkout).getPauseTime() : new Date());
  const [workoutTime, setWorkoutTime] = useState<Date>(typeof workout == typeof HIITWorkout? (workout as HIITWorkout).getWorkoutTime() : new Date());

  console.log(pauseTime);
  console.log(workoutTime);
  

  function saveWorkout( navigation : any) : void{
    if(name){
      if(workout.getName() != name){
        workout.delete(success => {
          if(success) {
            workout.setName(name)
            workout.save(success => (success)? navigation.goBack() : console.log('Failed to save workout data'));
          }
          else console.log('Failed to delete workout data')});
      }
    }
  }

  return (
    <SafeAreaProvider>
      <ScrollView>
        <TextInput style={styles.input} darkColor='#313131' lightColor="#D4D4D3" placeholder='Type name of your workout' value={name} onChangeText={name => {setName(name);}}/>
        <View style={{marginTop: 20, alignSelf: 'center', width: '80%'}}>
          <Text style={[styles.header]}>Choose type</Text>
          <View style={[styles.separatorHorizontal, {marginBottom: 20, height: 2}]}/>
          <RadioButton value={WorkoutType.Strength} checked={checkedRadio==WorkoutType.Strength} onPress={() => setChecked(WorkoutType.Strength)} style = {styles.radioButton}>Strength Workout</RadioButton>
          <RadioButton value={WorkoutType.HIIT} checked={checkedRadio==WorkoutType.HIIT} onPress={() => setChecked(WorkoutType.HIIT)} style = {styles.radioButton}>Interval Workout</RadioButton>
        </View>
        {(checkedRadio == WorkoutType.HIIT)? <TimeSetter workoutValue={workoutTime} pauseValue={pauseTime} onChangeWorkout={time => setWorkoutTime(time)} onChangePause={time => setPauseTime(time)}/> : null}
        <ExerciseList exercise={}/>
        <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 50}}>
          <Button style={styles.button} onPress={() => navigation.goBack()}>Cancel</Button>
          <Button style={styles.button} onPress={() => saveWorkout(navigation)} >Save</Button>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

function ExerciseList ( params: { exercises: IExercise[], onDelete?: (exercises : IExercise) => void}) {
  const navigation = useNavigation();

  return (
    <View style={{width: '80%', alignSelf: 'center', marginTop: 20}}>
      <Text style={styles.header}>Exercises</Text>
      <View style={[styles.separatorHorizontal, {height: 2}]}/>
      {
        params.exercises.map((exercise, index) => (
          <View key={index} style={{flexDirection: 'row', borderBottomColor: '#929494', borderBottomWidth: 1, alignItems: 'center'}}>
            <Text style={styles.item}>{ exercise.getName() }</Text>
            <Pressable style={{alignItems: 'center'}} onPress={}>
              <CrossIcon color='red'/>
            </Pressable>
          </View>
        ))
      }
      <Pressable style={{alignItems: 'center'}} onPress={() => navigation.navigate('ExerciseSearch' as never, {workout: workout } as never)}>
        <Text style={{fontSize: 16, padding: 7, textAlign: 'center', color: '#00C5FF'}}>Add exercises</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    marginBottom:20,
    alignSelf: 'center',
    width: '80%',
    height: 45,
    fontSize: 18,
    marginTop: 15,
    borderRadius: 5,
    padding: 10,
  },
  separatorHorizontal:{
    height: 1,
    backgroundColor: '#929494'
  },
  radioButton:{
    margin: 5,
    marginLeft: 10
  },
  button: {
    width: 150,
    margin: 15
  },
  item: {
      width: '90%',
      paddingVertical: 7,
      paddingLeft: 15,
      fontSize: 16,
  },
  addButton:{
      width:'21%',
      padding: 10,
      fontSize: 18,
      height: 44,
  },
});
