import { HeaderBackButton } from "@react-navigation/elements";
import { Alert, FlatList, StyleSheet } from 'react-native';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { ExerciseItem } from '../../components/ExerciseItem';
import RadioButton from '../../components/RadioButton';
import { Pressable, Text, TextInput, TouchableOpacity, View } from '../../components/Themed';
import IExercise, { Exercise } from '../../src/Exercise';
import { Workout, WorkoutType } from '../../src/Workout';
import { useIsFocused } from "@react-navigation/native";

export default function SetUpWorkout( { navigation, route } : any) {
  const [workout, setWorkout] = useState<Workout>((route.params?.workout !== undefined)? route.params.workout : new Workout(''));

  const [name, setName] = useState<string>(workout.getName());

  // const [pauseTime, setPauseTime] = useState<Date>((workout.getType() == WorkoutType.Interval)? (workout as HIITWorkout).getPauseTime() : new Date(0));
  // const [workoutTime, setWorkoutTime] = useState<Date>((workout.getType() == WorkoutType.Interval)? (workout as HIITWorkout).getWorkoutTime() : new Date(0));

  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  });

  useEffect(() => {
    if(route.params?.exercises && isFocused){      
      // const workoutHelper = (workout.constructor == Workout)? new Workout(workout) : new HIITWorkout(workout);
      const workoutHelper = new Workout(workout);


      workoutHelper.setExercises(route.params.exercises);
      setWorkout(workoutHelper);
    }
     
  }, [isFocused])

  function saveWorkout( navigation : any) : void{
    if(name){
      if(workout.getName() === '')
        workout.setName(name);
      if (workout.getExercises().length > 0){
        if(workout.getName() != name){
          workout.delete(success => {
            if(success) {
              workout.setName(name)
              workout.save(success => (success)? navigation.goBack() : console.log('Failed to save workout data'));
            }
            else console.log('Failed to delete workout data')});
        }
        else {
          workout.save(success => (success)? navigation.goBack() : console.log('Failed to save workout data'));
        }
      }
      else{
        Alert.alert(
          'Add exercises',
          'You have to add some exercises',
          [
            {
              text: 'Ok',  
            },
          ],
        );
      }
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

  function handleDelete(exercise : Exercise){
    const updatedWorkout =  new Workout(workout);
    updatedWorkout.deleteExercise(exercise);

    setWorkout(updatedWorkout);
  }

  return (
    <FlatList
      data={[{ key: 'workout' }]}
      renderItem={() => (
        <>
          <TextInput style={styles.input} darkColor='#313131' lightColor="#D4D4D3" placeholder='Type name of your workout' value={name} onChangeText={name => {setName(name);}}/>
          <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
            <Text style={styles.header}>Exercises</Text>
            <View style={[styles.separatorHorizontal, {height: 2}]}/>
            <FlatList
              data={workout.getExercises()}
              renderItem={({ item }) => <ExerciseItem exercise={item} onDelete={(exercise) => handleDelete(exercise) }/>}
              ItemSeparatorComponent={() => <View style = {{height: 2, backgroundColor: '#929494', marginTop: 6}}/>}
              ListFooterComponent={
                <>
                  <View style = {{height: 2, backgroundColor: '#929494', marginTop: 6}}/>
                  <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate('ExerciseSearch', {prevScreen: route.name, exercises: workout.getExercises()})}>
                    <Text style={{fontSize: 16, padding: 12, textAlign: 'center', color: '#00C5FF'}}>Add exercises</Text>
                  </TouchableOpacity>
                </>
              }
            />
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 50}}>
            <Button style={styles.button} onPress={() => navigation.goBack()}>Cancel</Button>
            <Button style={styles.button} onPress={() => saveWorkout(navigation)}>Save</Button>
          </View>
        </>
      )}
      keyExtractor={(item) => item.key}
    />
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
    marginLeft: 10,
    width: 17,
    height: 17
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
      marginBottom: 100
  },
});
