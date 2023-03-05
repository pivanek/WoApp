import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from ".";
import IExercise, { Exercise, ExerciseType, HoldExercise, StrengthExercise } from "./Exercise";
import { WorkoutType, Workout, IWorkout, HIITWorkout } from "./Workout";

export class Log{
    protected name : string;
    protected exercises : Array<StrengthExercise | HoldExercise> = new Array<StrengthExercise | HoldExercise>;
    protected workoutTime? : string;
    protected pauseTime? : string;
    protected workoutType : WorkoutType;
    protected logTime : Date = new Date();
    
    constructor(workout : Workout);
    constructor(workout : HIITWorkout);
    constructor(log : Log);
    constructor(workoutOrLog : HIITWorkout | Workout | Log){
        if(workoutOrLog.constructor == Workout){
            this.name = workoutOrLog.getName();
            workoutOrLog.getExercises().forEach(element => {
                this.exercises.push((element.getExerciseType().toString() == "Reps")? new StrengthExercise(element) : new HoldExercise(element));
            });
            this.workoutType = workoutOrLog.getType();
        }
        else if(workoutOrLog.constructor == HIITWorkout){
            this.name = workoutOrLog.getName();
            workoutOrLog.getExercises().forEach(element => {
                this.exercises.push((element.getExerciseType().toString() == "Reps")? new StrengthExercise(element) : new HoldExercise(element));
            });
            this.workoutTime = (workoutOrLog as HIITWorkout).getWorkoutTime().toTimeString();
            this.pauseTime = (workoutOrLog as HIITWorkout).getPauseTime().toTimeString();
            this.workoutType = workoutOrLog.getType();
        }
        else{
            this.name = workoutOrLog.getName();
            this.exercises = (workoutOrLog as Log).getExercises();
            this.workoutType = workoutOrLog.getType();
        }

    }

    public getName(){
        return this.name;
    }
    
    public getType(){
        return this.workoutType;
    }

    public getExercises() : Array<StrengthExercise | HoldExercise>{
        return this.exercises;
    }

    public addExercise(index : number, exercise : StrengthExercise | HoldExercise) : void{
        this.exercises[index] = exercise;
    }

    public save(callback: (success: boolean) => void) : void{
        getData('Logs', (workouts) => {
            workouts.set(this.name, this);
    
            AsyncStorage.setItem('Logs', JSON.stringify(Array.from(workouts)))
                .then(() => {
                    callback(true)
                })
                .catch(error => {
                    callback(false)
                });
        });
    } 

    public delete(callback: (success: boolean) => void) : void{
        getData('Logs', (workouts) => {
            workouts.delete(this.name);
    
            AsyncStorage.setItem('Logs', JSON.stringify(Array.from(workouts)))
                .then(() => {
                    callback(true)
                })
                .catch(error => {
                    callback(false)
                });
        });
    }
}