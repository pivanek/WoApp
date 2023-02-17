import { useEffect, useState, memo } from 'react';
import { FlatList, StyleSheet, VirtualizedList } from "react-native";
import { TextInput, View, Text, Pressable } from "../../components/Themed";
import { ExerciseName } from "../../src/Exercise/ExerciseName";
import { IWorkout, Workout } from '../../src/Workout';
import { deleteWorkouts } from '../../src';

export default function ExerciseSearchScreen({ route } : any){
    const exercisesData = Object.keys(ExerciseName).filter((v) => isNaN(Number(v)));
    exercisesData.sort();
    
    const [exercises, setExercises] = useState(exercisesData);
    const [workout, setWorkout] = useState<IWorkout>();;

    const name : string = route.params.headerName;

    useEffect(() => Workout.loadWorkout(name, (workout) => setWorkout(workout)));

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

    return(
        <View>
            <TextInput style={styles.input} onChangeText={search => setExercises(changeRegex(search))} darkColor='#313131' lightColor="#D4D4D3" placeholder='Type name of exercise'/>
            <FlatList data={exercises} renderItem={({ item }) => <Item name={item} workout={workout} isAdded={workout?.getExercises().includes(item)}/>}/>
        </View>
    );
}

const Item = memo(({ name, workout, isAdded }: { name: string, workout : IWorkout | undefined, isAdded : boolean | undefined,  }) => {
    function handleAdd () {
        if(isAdded)
            workout?.removeExercise(name);
        else
            workout?.addExercise(name);

        workout?.saveData((success) => {
            if (success) 
                console.log('Successfuly saved workout data');
            else 
                console.log('Failed to save workout data');
        });
    }

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{name.replace(/_/g, ' ')}</Text>
        <Pressable style={styles.addButton} onPress={() => handleAdd()}>
          <Text style={(isAdded)? styles.addedText : styles.addText}>{(isAdded)? 'Added' : 'Add'}</Text>
        </Pressable>
      </View>
    );
});

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