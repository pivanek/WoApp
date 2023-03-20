import { ExerciseName } from "./ExerciseName";
import { Text } from "../components/Themed";
import { Component, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StrengthRow, ValueType } from "../components/ExerciseLogRow";
import { vw } from ".";

export enum ExerciseType{
  Reps,
  Hold
}

export default interface IExercise{
  getName() : string;
  getMuscleGroups() : Array<string>;
  getDescription() : string;
  getExerciseType() : ExerciseType;
}

export class Exercise implements IExercise{
  protected name : string;
  protected muscleGroups : Array<string>;
  protected description : string;
  protected exerciseType : ExerciseType;

  constructor(name: string, muscleGroups: string[], description: string, exerciseType : ExerciseType);
  constructor(exercise: Exercise);
  constructor(exercise: Exercise | string, muscleGroups?: string[], description?: string, exerciseType?: ExerciseType) {
    if (typeof exercise === 'string') {
      this.name = exercise;
      this.muscleGroups = muscleGroups ?? [];
      this.description = description ?? '';
      this.exerciseType = exerciseType ?? ExerciseType.Reps;
    }
    else {
      this.name = exercise.name;
      this.muscleGroups = exercise.muscleGroups;
      this.description = exercise.description;
      this.exerciseType = exercise.exerciseType;
    }
  }

  public getName() : string{
      return this.name;
  }
  
  public getMuscleGroups() : Array<string>{
      return this.muscleGroups;
  }

  public getDescription() : string{
      return this.description;
  }

  public getExerciseType() : ExerciseType{
      return this.exerciseType;
  }
  
  public static from(exerciseData : any){
      return new Exercise(exerciseData);
  }
}

export class StrengthExercise extends Exercise{
  private reps : number[];
  private weights : number[];

  constructor(exercise : Exercise | any){
    super(exercise);
    if(exercise.constructor == Exercise)
      this.reps = [0, 0, 0, 0, 0, 0],
      this.weights = [0, 0, 0, 0, 0, 0]
    else{
      this.reps = exercise.reps;
      this.weights = exercise.weights;
    }
  }

  public setReps(value : number | Array<number>, index? : number){
    if(index && typeof value == 'number')
      this.reps[index] = value;
    else if(value.constructor == Array<number>)
      this.reps = value;
  }

  public setWeight(value : number | Array<number>, index? : number){
    if(index && typeof value == 'number')
      this.reps[index] = value;
    else if(value.constructor == Array<number>)
      this.weights = value;
  }

  public getReps() : number[]{
      return this.reps;
  }

  public getWeight() : number[]{
      return this.weights;
  }

  public renderLog(){
      return(
          <View>
              <Text darkColor='white'> {this.name}</Text>
              <View style={[{flexDirection: "row", paddingLeft: 10, marginRight: 30}]}>
                <Text style={{width: 60}}>Reps: </Text>
                  { 
                      this.reps.map((value) =>
                          <Text style={[{flex: 1, alignContent: "center"}, (value == 0)? {color: 'gray'} : {color: 'white'}]}>{value}</Text>
                      )
                  }
              </View>
              <View style={{flexDirection: "row", paddingLeft: 10, marginRight: 30}}>
                  <Text style={{width: 60}}>Weights: </Text>
                  {
                      this.weights.map((value) =>
                          <Text style={[{flex: 1, alignContent: "center"}, (value == 0)? {color: 'gray'} : {color: 'white'}]}>{value}</Text>
                      )
                  }
              </View>
          </View>
      );
  }

  public renderExercisePage(setExercise : (exercise : StrengthExercise) => void){
    const handleChange = (value : number, rowIndex : number, valueType : ValueType) => {
      if (valueType == ValueType.Reps)
        this.reps[rowIndex] = value;
      else
        this.weights[rowIndex] = value;      
      setExercise(this);
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

    return(
      <View style = {{width: vw(100)}}>
          <View style={styles.row}>
              <Text style={styles.header}>{this.name}</Text>
          </View>
          <View style={[styles.row, {marginTop: 10}]}>
              <Text style={styles.header2}>Reps</Text>
                  <View style={{flex: 1}}/>
              <Text style={styles.header2}>Weight</Text>
          </View>
          <StrengthRow rowIndex={0} editable onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
          <StrengthRow rowIndex={1} editable onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
          <StrengthRow rowIndex={2} editable onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
          <StrengthRow rowIndex={3} editable onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
          <StrengthRow rowIndex={4} editable onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
          <StrengthRow rowIndex={5} editable onChange={(value, rowIndex, valueType) => handleChange(value, rowIndex, valueType)}/>
      </View>
    );
  }
}

export class HoldExercise extends Exercise implements IExercise{
  private times : Array<Date> = [];
  
  constructor(exercise : Exercise){
      super(exercise);
  }
  
  public setTimes(times : Date[]){
      this.times =times
  }

  public getTime() : Array<Date>{
      return this.times;
  }

  public renderLog(){
      return(
          <View style={{flex: 1}}>
              <Text darkColor='white'> {this.name}</Text>
              <View style={[{flexDirection: "row", paddingLeft: 10, marginRight: 30}]}>
                  {
                      this.times.map((value) =>
                          <Text style={{flex: 1, alignContent: "center"}} darkColor={(value.getTime() == 0)? 'gray' : 'white'}>{value.toTimeString()}</Text>
                      )
                  }
              </View>
          </View>
      );
  }

  public renderExercisePage(){
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
    

    return(
      <View style = {{width: vw(100)}}>
          <View style={styles.row}>
              <Text style={styles.header}>{this.name}</Text>
          </View>
          <View style={[styles.row, {marginTop: 10}]}>
              <Text style={styles.header2}>Reps</Text>
                  <View style={{flex: 1}}/>
              <Text style={styles.header2}>Weight</Text>
          </View>
      </View>
    );
  }
}