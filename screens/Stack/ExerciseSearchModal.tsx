import { useState } from 'react';
import { FlatList, StyleSheet } from "react-native";
import { TextInput, View, Text } from "../../components/Themed";
import { ExerciseName } from "../../src/Exercise/ExerciseName";

export default function ExerciseSearchScreen(){
    const exercisesData = Object.keys(ExerciseName).filter((v) => isNaN(Number(v)));
    exercisesData.sort();

    const [exercises, setExercises] = useState(exercisesData);

    function changeRegex(search : string) : string[] {
        if(search){
            const regexSearch = new RegExp(search.replace(' ', '_'), 'i');
            let exercisesHelper : string[] = [];
            
            exercisesData.forEach(exercise => {
                if(regexSearch.test(exercise))
                    exercisesHelper.push(exercise);
            });
            
            return exercisesHelper;
        }
        else{
            return(exercisesData)
        }
    } 

    return(
        <View>
            <TextInput style={styles.input} onChangeText={search => setExercises(changeRegex(search))} darkColor='#313131' lightColor="#D4D4D3" placeholder='Type name of exercise'/>
            <FlatList data={exercises} renderItem={({ item }) => <Item data={item}/>}/>
        </View>
    );
}

export function Item(params: {data: string}){
    return(
        <View style={styles.itemContainer}>
            <Text style={styles.item}>{params.data.replaceAll('_', ' ')}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomWidth: 2,
        borderBottomColor: '#929494',
        marginHorizontal: 20 
    },
    input: {
        marginBottom:20,
        alignSelf: 'center',
        width: '80%',
        height: 50,
        fontSize: 20,
        color: '#000',
        marginTop: 15,
        borderRadius: 5,
        padding: 10,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
});