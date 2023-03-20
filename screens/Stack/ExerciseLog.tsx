import { StyleSheet, TextInput as DefaultTextInput, Alert, FlatList, View as DefaultView} from "react-native";
import { TextInput, View, Text } from "../../components/Themed";
import { IWorkout, Workout } from "../../src/Workout";
import { TabRouter, validatePathConfig } from "@react-navigation/native";
import { Button } from "../../components/Button";
import React, { MutableRefObject, createRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import IExercise, { ExerciseType, HoldExercise, StrengthExercise } from "../../src/Exercise";
import { Log } from "../../src/Log";
import { Exercise } from "../../src/Exercise";
import { StrengthRow, ValueType } from "../../components/ExerciseLogRow";
import { HoldExerciseData, StrengthExerciseData } from "../../components/ExerciseLogData";
import { HeaderBackButton } from "@react-navigation/elements";
import { deleteEvents, vw } from "../../src";
import RadioButton from "../../components/RadioButton";



export default function ExerciseLog({ navigation, route } : any) {  
    const [log, setLog] = useState(new Log(route.params.workout));

    useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
            <HeaderBackButton onPress={() => {
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
            }}/>
        ), 
      });
    });

    
    return(
      log.renderLogForm(navigation, (log) => setLog(log))
    );
}