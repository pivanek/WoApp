import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, VirtualizedList } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { TextInput, View, Text, Pressable } from "../../components/Themed";
import { ExerciseName } from "../../src/Exercise/ExerciseName";
import { IWorkout, Workout } from '../../src/Workout';
import { deleteWorkouts } from '../../src';

export default function ExerciseSearchScreen({ navigation, route } : any){
    const exercisesData = Object.keys(ExerciseName).filter((v) => isNaN(Number(v)));
    exercisesData.sort();
    
    const [exercises, setExercises] = useState(exercisesData);
    const [workout, setWorkout] = useState<IWorkout>(route.params.workout);

    function addExercise(exercise: string) {
        if(workout.getExercises().includes(exercise))
            workout.deleteExercise(exercise);

        else workout.addExercise(exercise);
        
        setWorkout(workout);
    }

    function changeRegex(search : string) : string[] {
        if(search){
            const regexSearch = new RegExp(search.replace(/_/g, ' '), 'i');
            let exercisesHelper : string[] = [];
            
            exercisesData.forEach(exercise => {
                if(regexSearch.test(exercise))
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
                <HeaderBackButton onPress={() => {workout.save(success => console.log(success? 'Succefully saved workout data' : 'Failed to save workout data')); navigation.goBack({workout: workout});}}/>
            ), 
        });
    });
    

    return(
        <View>
            <TextInput style={styles.input} onChangeText={search => setExercises(changeRegex(search))} darkColor='#313131' lightColor="#D4D4D3" placeholder='Type name of exercise'/>
            <FlatList data={exercises} renderItem={({ item }) => <Item name={item} isAdded={workout.getExercises().includes(item)} onAdd={(exercise) => addExercise(exercise)} />} />
        </View>
    );
}

function Item ( params: { name: string, isAdded: boolean, onAdd: (exercise: string) => void}) {
    const [isAdded, setAdded] = useState(params.isAdded);

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{params.name.replace(/_/g, ' ')}</Text>
        <Pressable style={styles.addButton} onPress={() => {params.onAdd(params.name); setAdded(!isAdded)}}>
          <Text style={(isAdded)? styles.addedText : styles.addText}>{(isAdded)? 'Added' : 'Add'}</Text>
        </Pressable>
      </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#929494',
        marginHorizontal: 20 
    },
    input: {
        marginBottom:20,
        alignSelf: 'center',
        width: '90%',
        height: 40,
        fontSize: 16,
        marginTop: 15,
        borderRadius: 10,
        padding: 10,
    },
    item: {
        width: '79%',
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    addButton:{
        width:'21%',
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    addText:{
        textAlign: 'right',
        textAlignVertical: 'center',
        color: '#00C5FF',
        fontSize: 18,
    },
    addedText:{
        textAlign: 'right',
        textAlignVertical: 'center',
        color: '#4F5152',
        fontSize: 18,
    }
});