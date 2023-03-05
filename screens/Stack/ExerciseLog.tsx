import { StyleSheet, TextInput as DefaultTextInput, Alert } from "react-native";
import { TextInput, View, Text } from "../../components/Themed";
import { IWorkout, Workout } from "../../src/Workout";
import { TabRouter, validatePathConfig } from "@react-navigation/native";
import { Button } from "../../components/Button";
import React, { createRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import IExercise, { ExerciseType, HoldExercise, StrengthExercise } from "../../src/Exercise";
import { Log } from "../../src/Log";
import { Exercise } from "../../src/Exercise";
import { StrengthRow, ValueType } from "../../components/ExerciseLogRow";
import { HoldExerciseData, StrengthExerciseData } from "../../components/ExerciseLogData";
import { HeaderBackButton } from "@react-navigation/elements";



export default function ExerciseLog({ navigation, route } : any) {  
    const log : Log = route.params.log? new Log(route.params.log) : new Log(route.params.workout);
    const exercises = log.getExercises();
    const [exerciseNumber, setExerciseNumber] = useState<number>(0)
    const [exerciseLog, setExerciseLog] = useState<StrengthExercise | HoldExercise>(log.getExercises()[route.params.exerciseNumber]);       

    useLayoutEffect(() => {
        navigation.setOptions({
            title: exerciseLog.getName()
        });
    });

    useEffect(() => {
      if(exerciseLog != undefined){
        log.addExercise(exerciseNumber, exerciseLog);}
    }, [exerciseLog])

    function handleNext(){
      log.addExercise(exerciseNumber, exerciseLog);
      setExerciseLog(log.getExercises()[exerciseNumber+1]);
      setExerciseNumber(exerciseNumber+1);
    }

    function handleSave(){
      log.save(success => (success)? navigation.goBack() : console.log('Failed to save workout data'));
    }

    useEffect(() => {
      navigation.setOptions({
          headerLeft: () => (
              <HeaderBackButton onPress={() => {
                if(exerciseNumber == 0)
                  Alert.alert(
                    'Confirmation',
                    'Do you want to scratch this log ?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: () => {
                          navigation.goBack();
                        },
                      },
                    ],
                  );
                else{
                  log.addExercise(exerciseNumber, exerciseLog);
                  setExerciseLog(log.getExercises()[exerciseNumber-1]);
                  setExerciseNumber(exerciseNumber-1);
                }
              }}/>
          ), 
      });
    });

    return(
        <View style={{flex: 1}}>
          {(exerciseLog.constructor == StrengthExercise)? <StrengthExerciseData exercise={exerciseLog} handleChange={(exerciseLog) => setExerciseLog(exerciseLog)}/> : <HoldExerciseData exercise={exerciseLog as HoldExercise}/>}
          <Button style={{width: '50%', alignSelf: "center", marginVertical: 100}} onPress = {() => {(exercises.length-1 != exerciseNumber)? handleNext() : handleSave()}}>{ (exercises.length-1 != exerciseNumber)? 'Next' : 'Save' }</Button>
        </View>
    );
}