import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from ".";
import IExercise, {
  Exercise,
  ExerciseType,
  HoldExercise,
  StrengthExercise,
} from "./Exercise";
import { WorkoutType, Workout, HIITWorkout } from "./Workout";
import { Component, useState } from "react";
import { Alert, FlatList, LogBoxStatic, StyleSheet } from "react-native";
import { View, Text, Pressable } from "../components/Themed";
import { AgendaEntry, AgendaSchedule } from "react-native-calendars/src/types";
import RadioButton from "../components/RadioButton";
import { Button } from "../components/Button";
import auth, { database } from "./auth";
import { DocumentData, QuerySnapshot, collection, deleteDoc, deleteField, doc, getDocs, getDocsFromCache, query, setDoc } from "firebase/firestore";
import { PR, Weight } from "./User";

export type Event = {
  PRs? : PR[];
  log? : {
    name : string;
    exercises : Exercise[];
    workoutType : WorkoutType;
  };
  weight? : number;
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
  constructor(workoutOrLog: HIITWorkout | Workout | any) {
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
      this.workoutTime = (workoutOrLog as HIITWorkout).getWorkoutTime().toTimeString();
      this.pauseTime = (workoutOrLog as HIITWorkout).getPauseTime().toTimeString();
      this.workoutType = workoutOrLog.getType();
    }
    else {
      this.name = workoutOrLog.name;
      workoutOrLog.exercises.forEach((element : any) => {
        this.exercises.push(
          element.exerciseType == "Reps"
            ? new StrengthExercise(element)
            : new HoldExercise(element)
        );
      });
      this.workoutType = workoutOrLog.workoutType;
    }
  }

  public renderEvent(){
      return (
        <View key={this.timestamp.toString()} style={{backgroundColor: '#313130', paddingVertical: 10, borderRadius: 15, marginRight: 20, marginTop: 10}}>
          <Text darkColor='#fff' lightColor='#000' style={{paddingHorizontal: 30, fontSize: 18}}>{this.name}</Text>
          { (this.exercises.length == 0)? null : 
            <>
              <View style={styles.separatorHorizontal} />
              <FlatList style={styles.flatList} data={this.exercises} renderItem={({item, index}) => 
                item.renderLog(index)
              }
              />
            </>
          }
        </View>
      );
  }

  public renderLogForm(navigation : any, setLog: (log : Log) => void){
    const [currentExercise, setCurrentExercise] = useState<number>(0);
    const radioButtons = Array.from({ length: this.exercises.length }, (radioButton, index) => (
      <RadioButton key={index} checked={currentExercise == index} style={{width: 12, height: 12}}/>
    ));

    const handleChange = (exercise: StrengthExercise | HoldExercise, index: number) => {
      this.setExercise(index, exercise);
      setLog(this);
    }

    return(
      <View style={{flex: 1}}>
        <FlatList showsHorizontalScrollIndicator={false} pagingEnabled horizontal scrollEnabled
        onMomentumScrollEnd={(event) => setCurrentExercise(Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width))}
        data={this.exercises} renderItem={({ index, item }) => 
            item.renderExercisePage((exercise) => handleChange(exercise, index))
          }
        />
        <View style={{alignSelf: "center", flexDirection: "row"}}>
          {radioButtons}
        </View>
        <Button style={{width: '50%', alignSelf: "center", margin: 30}} onPress = {() => this.save((success) => success? navigation.goBack() : console.log("Failed to save Data"))}>Save</Button>
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

  public setExercise(index: number, exercise: StrengthExercise | HoldExercise): void {
    this.exercises[index] = exercise;
  }

  public save(callback: (success: boolean) => void): void {
    const email = auth.currentUser?.email;
    console.log('Sending query');
    

    if(email){
      const eventDocPath = doc(database, "users", email, 'events', new Date(this.timestamp).toISOString().split('T')[0]);

      setDoc(eventDocPath, {log: this.toFirebase() }, {merge: true}).catch((error) => {
        Alert.alert("Error: ", error.message);
        callback(false);
      });

      callback(true);
    }
  }

  public delete(callback: (success: boolean) => void): void {
    const email = auth.currentUser?.email;
    if(email){
      const eventDocPath = doc(database, "users", email, 'events', new Date(this.timestamp).toISOString().split('T')[0]);

      setDoc(eventDocPath, {log: deleteField()}, {merge: true});
    }
  }

  public toFirebase(){
    if(this.workoutTime && this.pauseTime)
      return{
        name: this.name,
        exercises: this.exercises.map(value => value.toFirebase()),
        workoutTime: this.workoutTime,
        pauseTime: this.pauseTime,
        workoutType: WorkoutType
      };
    else
      return{
        name: this.name,
        exercises: this.exercises.map(value => value.toFirebase()),
        workoutType: WorkoutType
      };
  }

  public static async getLogs(callback: (logs : QuerySnapshot<DocumentData>) => void){
    const email = auth.currentUser?.email;
    if(email){
      const q = query(collection(database, "users", email, 'events'));
      const data = await getDocs(q);
      
      callback(data);
    }
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
      width: '85%',
    },
    workoutButtons:{
      flex: 1,
      padding: 5,
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
});
