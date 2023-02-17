import { StyleSheet } from 'react-native';

import { Text, View, TextInput } from '../../components/Themed';
import RadioButton from '../../components/RadioButton';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import TimeSetter from '../../components/TimeSetter';
import { HIITWorkout, IWorkout, Workout, WorkoutType } from '../../src/Workout';

export default function SetUpWorkout( { navigation, route } : any) {
  const workoutParam : IWorkout = (route.params?.workout !== undefined)? route.params?.workout : new Workout('');


  const [checkedRadio, setChecked] = useState<WorkoutType>(workoutParam.getType());
  const [workout, setWorkout] = useState<IWorkout>(workoutParam);
  const [name, setName] = useState<string>(workoutParam.getName());

  function saveWorkout( navigation : any) : void{
    workout.saveData(success => {
      if (success)
        navigation.navigate('WorkoutEditor', { workout: workout });
      else
        console.log('Failed to save workout data');
    });
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} darkColor='#313131' lightColor="#D4D4D3" placeholder='Type name of your workout' value={name} onChangeText={name => setName(name)}/>
      <Text style={styles.header}>Choose type</Text>
      <View style={styles.radioButtonContainer}>
        <RadioButton value={WorkoutType.Strength} checked={checkedRadio==WorkoutType.Strength} onPress={() => setChecked(WorkoutType.Strength)} style = {styles.radioButton}>Strength Workout</RadioButton>
        <RadioButton value={WorkoutType.HIIT} checked={checkedRadio==WorkoutType.HIIT} onPress={() => setChecked(WorkoutType.HIIT)} style = {styles.radioButton}>HIIT Workout</RadioButton>
      </View>
      {(checkedRadio == WorkoutType.HIIT)? <TimeSetter/> : null}
      <Button style={styles.nextButton} onPress={() => saveWorkout(navigation)}>Next</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'column'
  },
  header: {
    fontWeight: 'bold',
    alignSelf:'center',
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
  radioButtonContainer: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  radioButton:{
    margin: 7,
    marginLeft: 50
  },
  nextButton: {
    minWidth: 200,
    minHeight: 50,
    marginTop: 100,
    alignSelf: 'center'
  }
});
