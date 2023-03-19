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

export class Exercise extends Component implements IExercise{
  protected name : string;
  protected muscleGroups : Array<string>;
  protected description : string;
  protected exerciseType : ExerciseType;

  constructor(name: string, muscleGroups: string[], description: string, exerciseType : ExerciseType);
  constructor(exercise: Exercise);
  constructor(exercise: Exercise | string, muscleGroups?: string[], description?: string, exerciseType?: ExerciseType) {
    super(exercise);
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

type StrengthExerciseState = {
  reps: Array<number>;
  weight: Array<number>;
}

export class StrengthExercise extends Exercise{
  public state : StrengthExerciseState;

  constructor(exercise : Exercise){
    super(exercise);

    this.state = {
      reps: [0, 0, 0, 0, 0, 0],
      weight: [0, 0, 0, 0, 0, 0]
    }
  }

  public setReps(value : number | Array<number>, index? : number){
    if(index && typeof value == 'number')
      this.setState((prevState : StrengthExerciseState) => {
        const newReps = [...prevState.reps];
        newReps[index] = value;
        return{ reps: newReps };
      });
    else if(value.constructor == Array<number>)
      this.setState({reps: value});
  }

  public setWeight(value : number | Array<number>, index? : number){
    if(index && typeof value == 'number')
      this.setState((prevState : StrengthExerciseState) => {
        const newWeights = [...prevState.weight];
        newWeights[index] = value;
        return{ weight: newWeights };
      });
    else if(value.constructor == Array<number>)
      this.setState({weight: value });
  }

  public getReps() : number[]{
      return this.state.reps;
  }

  public getWeight() : number[]{
      return this.state.reps;
  }

  public renderLog(){
      return(
          <View>
              <Text darkColor='white'> {this.name}</Text>
              <View style={[{flexDirection: "row", paddingLeft: 10, marginRight: 30}]}>
                  {
                      this.state.reps.map((value) =>
                          <Text style={[{flex: 1, alignContent: "center"}, (value == 0)? {color: 'gray'} : {color: 'white'}]}>{value}</Text>
                      )
                  }
              </View>
              <View style={{flexDirection: "row", paddingLeft: 10, marginRight: 30}}>
                  {
                      this.state.reps.map((value) =>
                          <Text style={[{flex: 1, alignContent: "center"}, (value == 0)? {color: 'gray'} : {color: 'white'}]}>{value}</Text>
                      )
                  }
              </View>
          </View>
      );
  }

  public renderExercisePage(){
    const handleChange = (value : number, rowIndex : number, valueType : ValueType) => {
        if (valueType == ValueType.Reps)
          this.setState((prevState: StrengthExerciseState) =>{
            const newReps = [...prevState.reps];
            newReps[rowIndex] = value;
            return({reps: newReps})
          });
        else
          this.setState((prevState: StrengthExerciseState) =>{
            const newReps = [...prevState.reps];
            newReps[rowIndex] = value;
            return({reps: newReps})
          });
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
          <StrengthRow repsValue={this.state.reps[0]} weightValue={this.state.weight[0]} rowIndex={0} editable onChange={() => handleChange}/>
          <StrengthRow repsValue={this.state.reps[1]} weightValue={this.state.weight[1]} rowIndex={1} editable={this.state.reps[0]!=0} onChange={() => handleChange}/>
          <StrengthRow repsValue={this.state.reps[2]} weightValue={this.state.weight[2]} rowIndex={2} editable={this.state.reps[1]!=0} onChange={() => handleChange}/>
          <StrengthRow repsValue={this.state.reps[3]} weightValue={this.state.weight[3]} rowIndex={3} editable={this.state.reps[2]!=0} onChange={() => handleChange}/>
          <StrengthRow repsValue={this.state.reps[4]} weightValue={this.state.weight[4]} rowIndex={4} editable={this.state.reps[3]!=0} onChange={() => handleChange}/>
          <StrengthRow repsValue={this.state.reps[5]} weightValue={this.state.weight[5]} rowIndex={5} editable={this.state.reps[4]!=0} onChange={() => handleChange}/>
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