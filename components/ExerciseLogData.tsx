import { StyleSheet } from "react-native";
import { Button } from "./Button";
import { HoldRow, StrengthRow, ValueType } from "./ExerciseLogRow";
import { View, Text } from "./Themed";
import { useEffect, useState } from "react";
import { IWorkout, Workout } from "../src/Workout";
import { Exercise, HoldExercise, StrengthExercise } from "../src/Exercise";

export function StrengthExerciseData(params: {exercise : StrengthExercise, onChange:(exerciseLog : StrengthExercise) => void}) {
    const [exerciseLog, setExerciseLog] = useState<StrengthExercise>(params.exercise);

    const [reps, setReps] = useState<number[]>(exerciseLog.getReps());
    const [weight, setWeight] = useState<number[]>(exerciseLog.getWeight());

    function handleChange(value: number, index : number, valueType: ValueType) {
        
        if (valueType === ValueType.Reps) {
            setReps((prevState) => {
              const newState = [...prevState];
              newState[index] = value;
              return newState;
            });
        } else if (valueType === ValueType.Weight) {
          setWeight((prevState) => {
            const newState = [...prevState];
            newState[index] = value;
            return newState;
          });
        }
    }
    
    useEffect(() => {
        exerciseLog.setReps(reps);
        exerciseLog.setWeight(weight);

        params.onChange(exerciseLog)
    },[reps, weight]);

    useEffect(() => {
        setExerciseLog(params.exercise)
         
        setReps(exerciseLog.getReps());
        setReps(exerciseLog.getWeight());
    },[params.exercise]);

    return(
        <View style = {{width: '100%'}}>
            <View style={styles.row}>
                <Text style={styles.header}>Reps</Text>
                    <View style={{flex: 1}}/>
                <Text style={styles.header}>Weight</Text>
            </View>
            <StrengthRow repsValue={reps[0]} weightValue={weight[0]} rowIndex={0} editable onChange={(value, rowNumber, valueType) => handleChange(value, rowNumber, valueType)}/>
            <StrengthRow repsValue={reps[1]} weightValue={weight[1]} rowIndex={1} editable={reps[0]!=0} onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
            <StrengthRow repsValue={reps[2]} weightValue={weight[2]} rowIndex={2} editable={reps[1]!=0} onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
            <StrengthRow repsValue={reps[3]} weightValue={weight[3]} rowIndex={3} editable={reps[2]!=0} onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
            <StrengthRow repsValue={reps[4]} weightValue={weight[4]} rowIndex={4} editable={reps[3]!=0} onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
            <StrengthRow repsValue={reps[5]} weightValue={weight[5]} rowIndex={5} editable={reps[4]!=0} onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
        </View>
    );
}

export function HoldExerciseData(params: {exercise : HoldExercise}) {
    const exerciseLog = params.exercise;


    function handleChange() {
        console.log('handling')
    }
    
    // useEffect(() => {
        
    // },[reps, weight]);

    return(
        <>
            <View style={styles.row}>
                <Text style={styles.header}>How long did you hold ?</Text>
            </View>
            <HoldRow timeValue={new Date(0)} rowNumber={0} editable handleChange={(value, rowNumber, valueType) => handleChange()}/>
            <HoldRow timeValue={new Date(0)} rowNumber={1} editable handleChange={(value, rowNumber, valueType) => handleChange()}/>
            <HoldRow timeValue={new Date(0)} rowNumber={2} editable handleChange={(value, rowNumber, valueType) => handleChange()}/>
            <HoldRow timeValue={new Date(0)} rowNumber={3} editable handleChange={(value, rowNumber, valueType) => handleChange()}/>
            <HoldRow timeValue={new Date(0)} rowNumber={4} editable handleChange={(value, rowNumber, valueType) => handleChange()}/>
            <HoldRow timeValue={new Date(0)} rowNumber={5} editable handleChange={(value, rowNumber, valueType) => handleChange()}/>
        </>
    );
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 28,
        flex: 2,
        textAlign: 'center'
    }
});