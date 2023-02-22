import { useState } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { View, Pressable, Text } from "./Themed";
import IExercise from "../src/Exercise";

export function ExerciseItem ( params: { exercise: IExercise, style? : StyleProp<ViewStyle>, isAdded?: boolean, onAdd?: (exercise: IExercise) => void, onDelete?: (exercise: IExercise) => void}) {
    const [isAdded, setAdded] = useState(params?.isAdded);
    const exercise = params.exercise;


    function handleAdd(exercise : IExercise){
        if(params.onAdd){
            params.onAdd(exercise);
            setAdded(!isAdded);
        }
    }

    function handleDelete(exercise: IExercise): void {
        if(params.onDelete){
            params.onDelete(exercise);
        }
    }

    return (
        <View style={[{ padding: 2}, params?.style]}>
            <View style={{flexDirection: 'row',}}>
                <View style={{width: '79%', height: 45}}>
                    <Text style={{fontSize: 18}}>{exercise.getName()}</Text>
                    <Text style={{color: '#929494'}}>{ exercise.getMuscleGroups().map((item, index) => item +  (exercise.getMuscleGroups().length-1 != index?  ' | ' : ''))  }</Text>
                </View>
                {
                    params.onAdd &&(
                        <Pressable style={styles.addButton} onPress={() => handleAdd(exercise)}>
                            <Text style={(isAdded) ? styles.addedText : styles.addText}>{(isAdded) ? 'Added' : 'Add'}</Text>
                        </Pressable>
                    )
                }
                {
                    params.onDelete && (
                        <Pressable>
                            <Text onPress={() => handleDelete(exercise)} style={{color: 'red', fontSize:18, textAlign: "right", textAlignVertical: "center"}}>Delete</Text>
                        </Pressable>
                    )
                }
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    addButton:{
        width:'21%',
        fontSize: 18,
    },
    addText:{
        textAlign: 'right',
        textAlignVertical: 'center',
        color: '#00C5FF',
        fontSize: 18,
        height: 45,
        paddingRight: 4
    },
    addedText:{
        textAlign: 'right',
        textAlignVertical: 'center',
        color: '#4F5152',
        fontSize: 18,
        height: 45,
        paddingRight: 4
    }
});