import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from ".";
import IExercise, { Exercise } from "./Exercise";
import { WorkoutType, Workout, IWorkout, HIITWorkout } from "./Workout";

export class Log{
    protected name : string;
    protected exercises : IExercise[] = [];
    protected workoutTime? : string;
    protected pauseTime? : string;
    protected workoutType : WorkoutType;
    
    
    constructor(workout : Workout);
    constructor(workout : HIITWorkout);
    constructor(log : Log);
    constructor(workoutOrLog : HIITWorkout | Workout | Log){
        if(typeof workoutOrLog == Workout.constructor.name){
            this.name = workoutOrLog.getName();
            this.workoutType = workoutOrLog.getType();
        }
        else if(typeof workoutOrLog == HIITWorkout.constructor.name){
            this.name = workoutOrLog.getName();
            this.workoutTime = (workoutOrLog as HIITWorkout).getWorkoutTime().toTimeString();
            this.pauseTime = (workoutOrLog as HIITWorkout).getPauseTime().toTimeString();
            this.workoutType = workoutOrLog.getType();
        }
        else {
            this.name = workoutOrLog.getName();
            this.exercises = workoutOrLog.getExercises();
            this.workoutType = workoutOrLog.getType();
        }

    }

    public getName(){
        return this.name;
    }
    
    public getType(){
        return this.workoutType;
    }

    public getExercises() : IExercise[]{
        return this.exercises;
    }

    public addExercise(exercise : IExercise) : void{
        this.exercises.push(exercise);
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

    public static from(workoutData : any) : Log {
        const workoutResult : Log = new Log(workoutData); 
        const exercisesHelper : IExercise[] = [];

        workoutData.exercises.forEach((exercise: Exercise) => {
            exercisesHelper.push(Exercise.from(exercise));
        });
        workoutResult.exercises = exercisesHelper;

        return workoutResult;
    }

}