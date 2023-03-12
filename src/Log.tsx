import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from ".";
import IExercise, {
  Exercise,
  ExerciseType,
  HoldExercise,
  StrengthExercise,
} from "./Exercise";
import { WorkoutType, Workout, HIITWorkout } from "./Workout";
import { Component } from "react";
import { FlatList, LogBoxStatic, StyleSheet } from "react-native";
import { View, Text, Pressable } from "../components/Themed";

type LogProps = {
  renderLog : Log,
  style? : StyleSheet,
}

export class Log {
  protected name: string;
  protected exercises: Array<StrengthExercise | HoldExercise> = new Array<StrengthExercise | HoldExercise>();
  protected workoutTime?: string;
  protected pauseTime?: string;
  protected workoutType: WorkoutType;
  protected timestamp = new Date();

  constructor(workout: Workout);
  constructor(workout: HIITWorkout);
  constructor(log: any);
  constructor(workoutOrLog: HIITWorkout | Workout | any, props? : LogProps) {
    if (workoutOrLog.constructor == Workout) {
      this.name = workoutOrLog.getName();
      workoutOrLog.getExercises().forEach((element) => {
        this.exercises.push(
          element.getExerciseType().toString() == "Reps"
            ? new StrengthExercise(element)
            : new HoldExercise(element)
        );
      });
      this.workoutType = workoutOrLog.getType();
    } else if (workoutOrLog.constructor == HIITWorkout) {
      this.name = workoutOrLog.getName();
      workoutOrLog.getExercises().forEach((element) => {
        this.exercises.push(
          element.getExerciseType().toString() == "Reps"
            ? new StrengthExercise(element)
            : new HoldExercise(element)
        );
      });
      this.workoutTime = (workoutOrLog as HIITWorkout)
        .getWorkoutTime()
        .toTimeString();
      this.pauseTime = (workoutOrLog as HIITWorkout)
        .getPauseTime()
        .toTimeString();
      this.workoutType = workoutOrLog.getType();
    }
    else {
      this.name = workoutOrLog.name;
      this.exercises = workoutOrLog.exercises;
      this.workoutType = workoutOrLog.workoutType;
    }
  }

  public renderComponent(){
      return (
        <View style={{backgroundColor: '#313130', paddingVertical: 10, borderRadius: 15, marginRight: 20, marginTop: 30}}>
          <Text darkColor='#fff' lightColor='#000' style={{paddingHorizontal: 30, fontSize: 18}}>{this.name}</Text>
          { (this.exercises.length == 0)? null : 
            <>
              <View style={styles.separatorHorizontal} />
              <FlatList style={styles.flatList} data={this.exercises} renderItem={({item}) => <Text style={{color: '#929494', margin: 1, marginLeft: 8}}>{ item.name }</Text>} />
            </>
          }
        </View>
      );
  }

  public getNoonTimestamp(): number {
    const noon = new Date(this.timestamp.getFullYear(), this.timestamp.getMonth(), this.timestamp.getDate(), 12, 0, 0);
    
    return noon.getTime();
  }

  public getName() {
    return this.name;
  }

  public getType() {
    return this.workoutType;
  }

  public getExercises(): Array<StrengthExercise | HoldExercise> {
    return this.exercises;
  }

  public addExercise(
    index: number,
    exercise: StrengthExercise | HoldExercise
  ): void {
    this.exercises[index] = exercise;
  }

  public setExercises(exercises: Array<StrengthExercise | HoldExercise>) {
    this.exercises = exercises;
  }

  public save(callback: (success: boolean) => void): void {
      getData('Logs', (workouts) => {
        workouts.set(this.timestamp, this);

        AsyncStorage.setItem('Logs', JSON.stringify(Array.from(workouts)))
            .then(() => {
                callback(true)
            })
            .catch(error => {
                callback(false)
            });
    });
  }

  public delete(callback: (success: boolean) => void): void {
    getData("Logs", (workouts) => {
      workouts.delete(this.name);

      AsyncStorage.setItem("Logs", JSON.stringify(Array.from(workouts)))
        .then(() => {
          callback(true);
        })
        .catch((error) => {
          callback(false);
        });
    });
  }
}

  
const styles = StyleSheet.create({
  separatorHorizontal:{
      marginTop: 5,
      marginHorizontal: 20,
      height: 1,
      backgroundColor: '#929494',
      marginVertical: 4
    },
    separatorVertical:{
      width: 1,
      backgroundColor: '#929494'
    },
    workoutButtonsText:{
      color: '#00C5FF',
      fontSize: 16
    },
    flatList:{
      alignSelf: 'center',
      width: '90%',
    },
    workoutButtons:{
      flex: 1,
      padding: 5,
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
});
