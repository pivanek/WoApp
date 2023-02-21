import { StyleSheet } from "react-native";
import { View, Text, TextInput } from "./Themed";
import { Exercise } from "../src/Exercise";
import { useEffect, useState } from "react";
import { HIITWorkout } from "../src/Workout";

enum inputNames{
  pauseTimeMinutes,
  pauseTimeSeconds,
  workoutTimeMinutes,
  workoutTimeSeconds,
}

export default function TimeSetter(params: {workoutValue : Date, pauseValue : Date, onChangeWorkout : (time : Date) => void, onChangePause : (time : Date) => void}){
  const workoutValue = typeof params.workoutValue != undefined? params.workoutValue : new Date();
  const pauseValue = typeof params.pauseValue != undefined? params.pauseValue : new Date();

  const [pauseTimeMinutes, setPauseTimeMinutes] = useState<string>(typeof params.pauseValue != undefined? pauseValue.getMinutes().toString() : '0');
  const [pauseTimeSeconds, setPauseTimeSeconds] = useState<string>(typeof params.pauseValue != undefined? pauseValue.getSeconds().toString() : '0');
  
  const [workoutTimeMinutes, setWorkoutTimeMinutes] = useState<string>(typeof params.workoutValue != undefined? workoutValue.getSeconds().toString() : '0');
  const [workoutTimeSeconds, setWorkoutTimeSeconds] = useState<string>(typeof params.workoutValue != undefined? workoutValue.getMinutes().toString() : '0');

  function handleChange(value : string, name : inputNames) : string {
    var finalValue;

    if(!Number.isNaN(Number.parseInt(value))){
      const parsedValue = Number.parseInt(value);
      
      if(parsedValue >= 60) finalValue = 59;
      else if (parsedValue < 0) finalValue = 0;
      else finalValue = parsedValue;

      const newPauseValue = new Date(pauseValue);
      const newWorkoutValue = new Date(workoutValue);
      
      if (name == inputNames.pauseTimeMinutes) {
        newPauseValue.setMinutes(parsedValue);
        params.onChangePause(newPauseValue);
      } else if (name == inputNames.pauseTimeSeconds) {
        newPauseValue.setSeconds(parsedValue);
        params.onChangePause(newPauseValue);
      } else if (name == inputNames.workoutTimeMinutes) {
        newWorkoutValue.setMinutes(parsedValue);
        params.onChangeWorkout(newWorkoutValue);
      } else {
        newWorkoutValue.setSeconds(parsedValue);
        params.onChangeWorkout(newWorkoutValue);
      }
    }
    else finalValue = '';

    return finalValue.toString();
  }

  return(
      <View style={styles.timerContainer}>
          <View style={styles.timerRow}>
              <Text style={[styles.header, styles.timerItem]}>Break time</Text>
              <Text style={[styles.header, styles.timerItem]}>Workout time</Text>
          </View>
          <View style={styles.timerRow}>
            <View style={[styles.timer, styles.timerItem]}>
                <TextInput value={pauseTimeMinutes} multiline={true} numberOfLines={1} onChangeText={(value) => setPauseTimeMinutes(handleChange(value, inputNames.pauseTimeMinutes))} placeholder='00' keyboardType='numeric' lightColor="#D4D4D3" darkColor="#313131" maxLength={2} style={styles.timerInput}/>
                <Text style={styles.timerText}>:</Text>
                <TextInput value={pauseTimeSeconds} multiline={true} numberOfLines={1} onChangeText={(value) => setPauseTimeSeconds(handleChange(value, inputNames.pauseTimeSeconds))} placeholder='00' keyboardType='numeric' lightColor="#D4D4D3" darkColor="#313131" maxLength={2} style={styles.timerInput}></TextInput>
            </View>
            <View style={[styles.timer, styles.timerItem]}>
                <TextInput value={workoutTimeMinutes} multiline={true} numberOfLines={1} placeholder='00' keyboardType='numeric' onChangeText={(value) => setWorkoutTimeMinutes(handleChange(value, inputNames.workoutTimeMinutes))} lightColor="#D4D4D3" darkColor="#313131" maxLength={2} style={styles.timerInput}/>
                <Text style={styles.timerText}>:</Text>
                <TextInput value={workoutTimeSeconds} multiline={true} numberOfLines={1} placeholder='00' keyboardType='numeric' onChangeText={(value) => setWorkoutTimeSeconds(handleChange(value, inputNames.workoutTimeSeconds))} lightColor="#D4D4D3" darkColor="#313131" maxLength={2} style={styles.timerInput}></TextInput>
            </View> 
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        alignSelf:'center',
        fontSize: 20,
      },
    timerHeader:{
        flex: 1,
      },
      timerContainer:{
        marginTop: 50
      },
      timerRow:{
        margin: 10,
        flexDirection: 'row',
        justifyContent:  'center',
      },
      timer:{ 
        flexDirection: 'row',
      },
      timerInput:{
        color: '#949494',
        width: 55,
        height: 55,
        alignSelf: "center",
        textAlign: 'center',
        borderRadius: 20,
        fontSize: 20,
        padding: 15,
      },
      timerText:{
        color: '#949494',
        fontSize: 25,
        lineHeight: 50
      },
      timerItem: {
        marginHorizontal: 20
      },
});