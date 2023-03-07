import { StyleSheet, TextInput as DefaultTextInput, Alert, FlatList } from "react-native";
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
    const log = new Log(route.params.workout);
    const [exerciseNumber, setExerciseNumber] = useState<number>(0)
    const [exerciseLog, setExerciseLog] = useState<StrengthExercise | HoldExercise>(log.getExercises()[0]);       

    useLayoutEffect(() => {
      navigation.setOptions({
        title: exerciseLog.getName(),
        headerLeft: () => (
            <HeaderBackButton onPress={() => {
              if(exerciseNumber == 0)
                Alert.alert(
                  'Confirmation',
                  'Do you want to discard this log ?',
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
                setExerciseNumber(exerciseNumber-1);
              }
            }}/>
        ), 
      });
    });

    function handleNext(){
      log.addExercise(exerciseNumber, exerciseLog);
      setExerciseNumber(exerciseNumber+1);
    }

    function handleSave(){
      log.save(success => (success)? navigation.goBack() : console.log('Failed to save workout data'));
    }

    useEffect(() => setExerciseLog(log.getExercises()[exerciseNumber]), [exerciseNumber]);

    return(
        <View style={{flex: 1}}>
          <FlatList style={{flex: 1}} horizontal scrollEnabled data={log.getExercises()} renderItem={({ item }) => 
              <>
                {(item.constructor == StrengthExercise)? <StrengthExerciseData exercise={item} onChange={() => setExerciseLog(item)}/> : <HoldExerciseData exercise={item as HoldExercise}/>}
              </>
            }
          />
          {/* <Button style={{width: '50%', alignSelf: "center", marginVertical: 100}} onPress = {() => {(log.getExercises().length-1 != exerciseNumber)? handleNext() : handleSave()}}>{ (log.getExercises().length-1 != exerciseNumber)? 'Next' : 'Save' }</Button> */}
        </View>
    );
}