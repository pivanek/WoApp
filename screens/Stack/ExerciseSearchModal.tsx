import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, StyleSheet, VirtualizedList } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { TextInput, View, Text, Pressable } from "../../components/Themed";
import { ExerciseName } from "../../src/ExerciseName";
import { IWorkout, Workout } from '../../src/Workout';
import { deleteWorkouts } from '../../src';
import IExercise, { Exercise } from '../../src/Exercise';
import { ExerciseItem } from '../../components/ExerciseItem';

export default function ExerciseSearchScreen({ navigation, route } : any){
    const exercisesJSON : Object[] = require('../../src/exercises.json');
    const exercisesData : IExercise[] = parseJSON(exercisesJSON);

    const [exercises, setExercises] = useState<IExercise[]>(exercisesData);
    const [workout, setWorkout] = useState<IWorkout>(route.params.workout);
    
    function parseJSON(exerciseData : Object[]) : IExercise[]{
        const exercisesHelper : IExercise[] = [];

        exerciseData.forEach(element => {
            exercisesHelper.push(Exercise.from(element as Exercise));
        });

        return exercisesHelper;
    }

    function addExercise(exercise: IExercise) {
        const isAdded = workout.getExercises().find((e) => e.getName() === exercise.getName());

        if(isAdded)
                workout.deleteExercise(exercise);
        else workout.addExercise(exercise);
    }


    function changeRegex(search : string) : IExercise[] {
        if(search){
            const regexSearch = new RegExp(search.replace(/_/g, ' '), 'i');
            const exercisesHelper : IExercise[] = [];
            
            exercisesData.forEach(exercise => {
                if(regexSearch.test(exercise.getName()) || exercise.getMuscleGroups()?.some(muscleGroup => regexSearch.test(muscleGroup)))
                    exercisesHelper.push(exercise);
            });
            
            return exercisesHelper;
        }
        else
            return(exercisesData);
    } 

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderBackButton onPress={() => {navigation.navigate('SetUpWorkout' ,{workout: workout});}}/>
            ), 
        });
    });
    

    return(
        <View style={{ width: '90%', alignSelf: 'center'}}>
            <TextInput style={styles.input} onChangeText={search => setExercises(changeRegex(search))} darkColor='#313131' lightColor="#D4D4D3" placeholder='Type name of exercise'/>
            <FlatList data={exercises} renderItem={({ item }) => 
                    <>
                        <ExerciseItem exercise={item} isAdded={ workout.getExercises().some((workoutExercise) => {return workoutExercise.getName() == item.getName()})} onAdd={(exercise) => addExercise(exercise)} />
                        <View style={{width: '100%', height: 2, backgroundColor: '#929494', marginTop: 2}}/>
                    </>
                } 
            />
        </View>
    );
}

const styles = StyleSheet.create({

    input: {
        marginVertical:20,
        width: '100%',
        height: 40,
        fontSize: 16,
        borderRadius: 10,
        padding: 10,
    },
});