import { FlatList, StyleSheet } from 'react-native';

import { Text, View, TextInput, Pressable } from '../../components/Themed';
import RadioButton from '../../components/RadioButton';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import TimeSetter from '../../components/TimeSetter';
import { HIITWorkout, IWorkout, Workout, WorkoutType } from '../../src/Workout';
import { useFocusEffect } from '@react-navigation/native';

export default function SetUpWorkout( { navigation, route } : any) {
  const [workout, setWorkout] = useState<IWorkout>((route.params?.workout !== undefined)? route.params?.workout : new Workout(''));
  const [exercises, setExercises] = useState<string[]>(workout.getExercises());

  const [checkedRadio, setChecked] = useState<WorkoutType>(workout.getType());
  const [name, setName] = useState<string>(workout.getName());

  function saveWorkout( navigation : any) : void{
    workout.save(success => {
      if (success)
        navigation.goBack();
      else
        console.log('Failed to save workout data');
    });
  }


  useEffect(() => {
   navigation.addListener('focus', () => {
      if (route.params?.workout) {
        setWorkout(route.params?.workout);
        setExercises(workout.getExercises());
        console.log(exercises);
      }
    });
  },[route.params.workout, workout]);

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} darkColor='#313131' lightColor="#D4D4D3" placeholder='Type name of your workout' value={name} onChangeText={name => {setName(name); workout.setName(name);}}/>
      <View style={{marginTop: 20, alignSelf: 'center', width: '80%'}}>
        <Text style={[styles.header, {marginBottom: 20}]}>Choose type</Text>
        <RadioButton value={WorkoutType.Strength} checked={checkedRadio==WorkoutType.Strength} onPress={() => setChecked(WorkoutType.Strength)} style = {styles.radioButton}>Strength Workout</RadioButton>
        <RadioButton value={WorkoutType.HIIT} checked={checkedRadio==WorkoutType.HIIT} onPress={() => setChecked(WorkoutType.HIIT)} style = {styles.radioButton}>HIIT Workout</RadioButton>
      </View>
      <View style={{marginTop: 20, alignSelf: 'center', width: '80%'}}>
        <Text style={styles.header}> Exercises</Text>
        <FlatList style={{alignSelf: 'center', width: '100%'}} data={exercises} renderItem={({ item }) => <Item name={item} onChange={() => console.log(exercises)}/>} />
        <Pressable style={{alignItems: 'center'}} onPress={() => {navigation.navigate('ExerciseSearch', { workout: workout })}}>
          <Text style = {{fontSize: 16, padding:7, textAlign: 'center', color: '#00C5FF'}}>Add exercises</Text>
        </Pressable>
      </View>
      {(checkedRadio == WorkoutType.HIIT)? <TimeSetter/> : null}
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <Button style={styles.button} onPress={() => navigation.goBack()}>Cancel</Button>
        <Button style={styles.button} onPress={() => saveWorkout(navigation)}>Save</Button>
      </View>
    </View>
  );
}

function Item ( params: { name: string, onChange: (Workout: IWorkout) => void}) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{params.name.replace(/_/g, ' ')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    fontWeight: 'bold',
    alignSelf:'center',
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#929494',
    width: '100%'
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
  radioButton:{
    margin: 5,
    marginLeft: 10
  },
  button: {
    width: 150,
    margin: 15
  },
  itemContainer: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#929494',
  },
  item: {
      width: '79%',
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
