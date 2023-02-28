import { StyleSheet, TextInput as DefaultTextInput } from "react-native";
import { TextInput, View, Text } from "../../components/Themed";
import { IWorkout, Workout } from "../../src/Workout";
import { TabRouter, validatePathConfig } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { createRef, useLayoutEffect, useRef, useState } from "react";
import IExercise, { StrengthExercise } from "../../src/Exercise";

enum ValueType {
    'Reps',
    'Weight'
}

export default function ExerciseLog({ navigation, route } : any) {   
    const exercise = Workout.from(route.params.workout).getExercises()[route.params.exercise];
    const [reps, setReps] = useState<number[]>([0, 0, 0, 0, 0, 0]);
    const [weight, setWeight] = useState<number[]>([0, 0, 0, 0, 0, 0]);
    const refs = useRef(Array.from({length: 12}, a => useRef(null)));

    useLayoutEffect(() => {
        navigation.setOptions({
            title: exercise.getName()
        });
    });

    function handleChange(value: number, index : number, valueType: ValueType) {
        if (valueType === ValueType.Reps) {
            setReps((prevState) => {
              const newState = [...prevState];
              newState[index] = isNaN(value) ? 0 : value;
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

    return(
        <View style={{flex: 1}}>
            <View style={styles.row}>
                <Text style={styles.header}>Reps</Text>
                <View style={{flex: 1}}/>
                <Text style={styles.header}>Weight</Text>
            </View>
            <Row ref={refs} rowNumber={0} editable handleChange={(value, rowNumber, valueType) => handleChange(value, rowNumber, valueType)}/>
            <Row ref={refs} rowNumber={1} editable={reps[0]!=0} handleChange={(value, rowNumber, valueType) => handleChange(value, rowNumber, valueType)}/>
            <Row ref={refs} rowNumber={2} editable={reps[1]!=0} handleChange={(value, rowNumber, valueType) => handleChange(value, rowNumber, valueType)}/>
            <Row ref={refs} rowNumber={3} editable={reps[2]!=0} handleChange={(value, rowNumber, valueType) => handleChange(value, rowNumber, valueType)}/>
            <Row ref={refs} rowNumber={4} editable={reps[3]!=0} handleChange={(value, rowNumber, valueType) => handleChange(value, rowNumber, valueType)}/>
            <Row ref={refs} rowNumber={5} editable={reps[4]!=0} handleChange={(value, rowNumber, valueType) => handleChange(value, rowNumber, valueType)}/>
            <Button style={{width: '50%', alignSelf: "center", marginVertical: 100}}>Next</Button>
        </View>
    );
}

function Row(params: {rowNumber : number, editable : boolean, handleChange(value : number, rowNumber : number, valueType : ValueType) : any}, ref : React.MutableRefObject<React.MutableRefObject<null>[]>) {
    const [weightIsEditable, setWeightEdidtable] = useState<boolean>(false);

    console.log(ref);

    return (
      <View style={styles.row}>
        <View style={styles.column}>
          <TextInput
            editable={params.editable}
            onChangeText={(value) => {
                const valueNumber : number = Number.parseInt(value)

                params.handleChange(valueNumber, params.rowNumber, ValueType.Reps);
                setWeightEdidtable(!isNaN(valueNumber) && valueNumber != 0);
            }}
            style={styles.repsInput}
            keyboardType="numeric"
            darkColor={params.editable ? "#313131" : "#232323"}
            lightColor="#D4D4D3"
            placeholder={params.editable ? "00" : ""}
            ref={ref.current[params.rowNumber*2]}
            // onSubmitEditing={() => params.ref[params.rowNumber*2+1].current.focus()}
          />
        </View>
        <Text style={styles.setText}>Set {params.rowNumber + 1}</Text>
        <View style={styles.column}>
          <TextInput
            editable={weightIsEditable}
            onChangeText={(value) => params.handleChange(Number.parseInt(value), params.rowNumber, ValueType.Weight)}
            style={styles.weightInput}
            keyboardType="numeric"
            darkColor={weightIsEditable ? "#313131" : "#232323"}
            lightColor="#D4D4D3"
            placeholder={weightIsEditable ? "00" : ""}
            // ref={params.ref[params.rowNumber*2+1].current}
            // onSubmitEditing={() => params.ref[params.rowNumber*2+2].current.focus()}
          />
        </View>
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
        fontSize: 28,
        flex: 2,
        textAlign: 'center'
    },
    setText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center'
    },
    column: {
        flex: 2,
        alignItems: "center"
    },
    
    repsInput:{
        height: 55,
        width: 55,
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 15,
        paddingHorizontal: 15
    },
    weightInput:{
        height: 55,
        width: 65,
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 15,
        paddingHorizontal: 15
    },
});