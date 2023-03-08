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
import { vw } from "../../src";
import RadioButton from "../../components/RadioButton";



export default function ExerciseLog({ navigation, route } : any) {  
    const log = new Log(route.params.workout);
    const [currentExercise, setCurrentExercise] = useState<number>(0);

    const flatListRef = useRef<FlatList>(null);

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

    function handleSave(){
      log.save(success => (success)? navigation.goBack() : console.log('Failed to save workout data'));
    }

    const radioButtons = Array.from({ length: log.getExercises().length }, (radioButton, index) => (
      <RadioButton value={index} onPress={flatListRef.current?.scrollToIndex({animated: true, index: index})} checked={currentExercise == index} style={{margin: 2}}/>
    ));

    return(
        <View style={{flex: 1}}>
          <FlatList ref={flatListRef} pagingEnabled horizontal scrollEnabled style={{flex: 1}} onMomentumScrollEnd={(event) => setCurrentExercise(Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width))} data={log.getExercises()} renderItem={({ index, item }) => 
              <>  
                {(item.constructor == StrengthExercise)? <StrengthExerciseData index={index} exercise={item} onChange={(exerciseLog) => log.addExercise(index, exerciseLog)}/> : <HoldExerciseData exercise={item as HoldExercise}/>}
              </>
            }
          />
          <View style={{alignSelf: "center", flexDirection: "row", marginBottom: 10}}>
            {radioButtons}
          </View>
          <Button style={{width: '50%', alignSelf: "center", marginBottom: 20}} onPress = {() => {handleSave()}}>Save</Button>
        </View>
    );
}