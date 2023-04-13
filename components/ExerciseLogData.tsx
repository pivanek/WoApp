import { StyleSheet } from "react-native";
import { HoldRow, StrengthRow, ValueType } from "./ExerciseLogRow";
import { View, Text } from "./Themed";
import { useState } from "react";
import { HoldExercise, StrengthExercise } from "../src/Exercise";
import { vw } from "../src";

export function StrengthExerciseData(params: {index : number, exercise : StrengthExercise}) {
    const [exerciseLog, setExerciseLog] = useState<StrengthExercise>(params.exercise);

    const [reps, setReps] = useState<number[]>(exerciseLog.getReps());
    const [weight, setWeight] = useState<number[]>(exerciseLog.getWeight());

    function handleChange(value: number, index : number, valueType: ValueType) {
        if(valueType == ValueType.Reps){
            setReps((prevState) => {
                const newState = [...prevState];
                newState[index] = value;
                return newState;
              });
        }
        else{
            setWeight((prevState) => {
                const newState = [...prevState];
                newState[index] = value;
                return newState;
              });
        }

        exerciseLog.setReps(value, index);
        exerciseLog.setWeight(value, index)
    }

    return(
        <View style = {{width: vw(100)}} key={params.index}>
            <View style={styles.row}>
                <Text style={styles.header}>{exerciseLog.getName()}</Text>
            </View>
            <View style={[styles.row, {marginTop: 10}]}>
                <Text style={styles.header2}>Reps</Text>
                    <View style={{flex: 1}}/>
                <Text style={styles.header2}>Weight</Text>
            </View>
            <StrengthRow rowIndex={0} editable onChange={(value, rowNumber, valueType) => handleChange(value, rowNumber, valueType)}/>
            <StrengthRow rowIndex={1} editable={reps[0]!=0} onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
            <StrengthRow rowIndex={2} editable={reps[1]!=0} onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
            <StrengthRow rowIndex={3} editable={reps[2]!=0} onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
            <StrengthRow rowIndex={4} editable={reps[3]!=0} onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
            <StrengthRow rowIndex={5} editable={reps[4]!=0} onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
        </View>
    );
}

export function HoldExerciseData(params: {index : number, exercise : HoldExercise}) {
    const [time, setTime] = useState(params.exercise.getTime())
    
    function handleChange(value : number, rowIndex : number){
        setTime((prevState) => {
            const newState = [...prevState];
            newState[rowIndex] = value;
            return newState;
          });
    }

    return(
        <View style = {{width: vw(100)}} key={params.index}>
            <View style={styles.row}>
                <Text style={styles.header}>Hold</Text>
            </View>
            <HoldRow timeValue={time[0]} rowIndex={0} onChange={(value, rowIndex) => handleChange(value, rowIndex)}/>
            <HoldRow timeValue={time[1]} rowIndex={1} onChange={(value, rowIndex) => handleChange(value, rowIndex)}/>
            <HoldRow timeValue={time[2]} rowIndex={2} onChange={(value, rowIndex) => handleChange(value, rowIndex)}/>
            <HoldRow timeValue={time[3]} rowIndex={3} onChange={(value, rowIndex) => handleChange(value, rowIndex)}/>
            <HoldRow timeValue={time[4]} rowIndex={4} onChange={(value, rowIndex) => handleChange(value, rowIndex)}/>
            <HoldRow timeValue={time[5]} rowIndex={5} onChange={(value, rowIndex) => handleChange(value, rowIndex)}/>
        </View>
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
        fontSize: 26,
        flex: 2,
        textAlign: 'center'
    },
    header2: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 2,
        textAlign: 'center'
    }
});