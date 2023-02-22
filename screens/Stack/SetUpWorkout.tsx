import { Alert, FlatList, GestureResponderEvent, RefreshControl, ScrollView, StyleProp, StyleSheet, ViewStyle, VirtualizedList } from 'react-native';

import { Text, View, TextInput, Pressable } from '../../components/Themed';
import RadioButton from '../../components/RadioButton';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import TimeSetter from '../../components/TimeSetter';
import { HIITWorkout, IWorkout, Workout, WorkoutType } from '../../src/Workout';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CrossIcon } from '../../components/Icons';
import IExercise from '../../src/Exercise';
import { ExerciseItem } from '../../components/ExerciseItem';

export default function SetUpWorkout( { navigation, route } : any) {
  const [workout, setWorkout] = useState<IWorkout>((route.params?.workout !== undefined)? route.params?.workout : new Workout(''));

  const [checkedRadio, setChecked] = useState<WorkoutType>(workout.getType());
  const [name, setName] = useState<string>(workout.getName());

  const [pauseTime, setPauseTime] = useState<Date>(typeof workout == typeof HIITWorkout? (workout as HIITWorkout).getPauseTime() : new Date());
  const [workoutTime, setWorkoutTime] = useState<Date>(typeof workout == typeof HIITWorkout? (workout as HIITWorkout).getWorkoutTime() : new Date());

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
      else workout.save(success => (success)? navigation.goBack() : console.log('Failed to save workout data'));
    }
    else{
      Alert.alert(
        'Set name',
        'You have to type name of your workout',
        [
          {
            text: 'Ok',  
          },
        ],
      );
    }
  }

  return (
    <ScrollView>
      <TextInput style={styles.input} darkColor='#313131' lightColor="#D4D4D3" placeholder='Type name of your workout' value={name} onChangeText={name => {setName(name);}}/>
      <View style={{marginTop: 20, alignSelf: 'center', width: '90%'}}>
        <Text style={[styles.header]}>Choose type</Text>
        <View style={[styles.separatorHorizontal, {marginBottom: 20, height: 2}]}/>
        <RadioButton value={WorkoutType.Strength} checked={checkedRadio==WorkoutType.Strength} onPress={() => setChecked(WorkoutType.Strength)} style = {styles.radioButton}>Strength Workout</RadioButton>
        <RadioButton value={WorkoutType.HIIT} checked={checkedRadio==WorkoutType.HIIT} onPress={() => setChecked(WorkoutType.HIIT)} style = {styles.radioButton}>Interval Workout</RadioButton>
      </View>
      {(checkedRadio == WorkoutType.HIIT)? <TimeSetter workoutValue={workoutTime} pauseValue={pauseTime} onChangeWorkout={time => setWorkoutTime(time)} onChangePause={time => setPauseTime(time)}/> : null}
      <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
        <Text style={styles.header}>Exercises</Text>
        <View style={[styles.separatorHorizontal, {height: 2}]}/>
        {
          workout.getExercises().map((element : IExercise, index: number) => 
          <>
            <ExerciseItem exercise={element} style={{marginLeft: 8}}/>
            <View style={{width: '100%', height: 2, backgroundColor: '#929494', marginTop: 2}}/>
          </>
          )
        }
        <Pressable style={{alignItems: 'center'}} onPress={() => navigation.navigate('ExerciseSearch' as never, {workout: workout } as never)}>
          <Text style = {{fontSize: 16, padding: 12, textAlign: 'center', color: '#00C5FF'}}>Add exercises</Text>
        </Pressable>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 50}}>
        <Button style={styles.button} onPress={() => navigation.goBack()}>Cancel</Button>
        <Button style={styles.button} onPress={() => saveWorkout(navigation)} >Save</Button>
      </View>
    </ScrollView>
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
    width: '90%',
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
