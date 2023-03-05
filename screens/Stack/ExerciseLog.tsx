import { StyleSheet, TextInput as DefaultTextInput } from "react-native";
import { TextInput, View, Text } from "../../components/Themed";
import { IWorkout, Workout } from "../../src/Workout";
import { TabRouter, validatePathConfig } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { createRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import IExercise, { ExerciseType, HoldExercise, StrengthExercise } from "../../src/Exercise";
import { Log } from "../../src/Log";
import { Exercise } from "../../src/Exercise";
import { StrengthRow, ValueType } from "../../components/ExerciseLogRow";
import { HoldExerciseData, StrengthExerciseData } from "../../components/ExerciseLogData";



export default function ExerciseLog({ navigation, route } : any) {  
    const workout = new Workout(route.params.workout);
    const exercise = workout.getExercises()[route.params.exerciseNumber];

    const log : Log = route.params.log? new Log(route.params.log) : new Log(workout);
    const [exerciseLog, setExerciseLog] = useState<StrengthExercise | HoldExercise>();   

    useLayoutEffect(() => {
        navigation.setOptions({
            title: exercise.getName()
        });
    });

    useEffect(() => {
      if(exerciseLog != undefined){
        log.addExercise(route.params.exerciseNumber, exerciseLog);}
    }, [exerciseLog])

    function handlePress(){
      navigation.navigate('ExerciseLog', {workout: workout, log: log, exerciseNumber: route.params.exerciseNumber+1});
    }

    return(
        <View style={{flex: 1}}>
          {(exercise.getExerciseType().toString() === "Reps")? <StrengthExerciseData exercise={new StrengthExercise(exercise)} handleChange={(exerciseLog) => setExerciseLog(exerciseLog)}/> : <HoldExerciseData exercise={new HoldExercise(exercise)}/>}
          <Button style={{width: '50%', alignSelf: "center", marginVertical: 100}} onPress = {() => handlePress()}>Next</Button>
        </View>
    );
}