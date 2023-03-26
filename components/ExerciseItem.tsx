import { useState } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { View, Pressable, Text } from "./Themed";
import IExercise, { Exercise } from "../src/Exercise";

export type ExerciseProps = {
  exercise: Exercise;
  style?: StyleProp<ViewStyle>;
  isAdded?: boolean;
  onAdd?: (exercise: IExercise) => void;
  onDelete?: (exercise: IExercise) => void;
};

export function ExerciseItem ( params: { exercise: Exercise, style? : StyleProp<ViewStyle>, isAdded?: boolean, onAdd?: (exercise: IExercise) => void, onDelete?: (exercise: Exercise) => void}) {

    
    const [isAdded, setAdded] = useState(params?.isAdded);
    const exercise = params.exercise;


    function handleAdd(exercise : Exercise){
        if(params.onAdd){
            params.onAdd(exercise);
            setAdded(!isAdded);
        }
    }

    function handleDelete(exercise: Exercise): void {
        if(params.onDelete){
            params.onDelete(exercise);
        }
    }

    return (
    <>
        <View style={[ { marginLeft: 12, margin: 1}, params?.style]}>
            <View style={{flexDirection: 'row',}}>
                <View style={{width: '79%', height: 40}}>
                    <Text style={{fontSize: 18}}>{exercise.getName()}</Text>
                    <Text style={{color: '#929494'}}>{ exercise.getMuscleGroups().join(' | ') }</Text>
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
                        <Pressable style={styles.addButton} onPress={() => handleDelete(exercise)} >
                            <Text style={{color: 'red', fontSize:18, textAlign: "right", textAlignVertical: "center", height: 36, paddingRight:4, paddingTop: 6}}>Delete</Text>
                        </Pressable>
                    )
                }
            </View>
        </View>
    </>);
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
        height: 36,
        paddingRight: 4,
        paddingTop: 6
    },
    addedText:{
        textAlign: 'right',
        textAlignVertical: 'center',
        color: '#4F5152',
        fontSize: 18,
        height: 40,
        paddingRight: 4
    }
});