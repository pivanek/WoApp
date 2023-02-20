import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from ".";
import IExercise from "./Exercise";

export enum WorkoutType{
    Strength,
    HIIT   
}

export interface IWorkout{
    getName() : string;
    setName(name : string) : void;
    getType() : WorkoutType;
    getExercises() : IExercise[];
    addExercise(exercise : IExercise | IExercise[]) : void;
    deleteExercise(name : IExercise) : void;
    save(callback: (success: boolean) => void) : void;
    delete(callback: (success: boolean) => void) : void;
}

export class Workout implements IWorkout{
    name : string;
    exercises : IExercise[];
    workoutType : WorkoutType;
    
    constructor(name : string);
    constructor(workout : Workout);
    constructor(arg : string | Workout){
        if (typeof arg === 'string') {
            this.name = arg;
            this.exercises = [];
            this.workoutType = WorkoutType.Strength;
        } else {
            this.name = arg.name;
            this.exercises = arg.exercises;
            this.workoutType = arg.workoutType;
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

    public deleteExercise(name: IExercise): void {
        const index = this.exercises.indexOf(name);
        this.exercises.splice(index, 1);
    }

    public setName(name : string) : void{
        this.name = name;
    }

    public save(callback: (success: boolean) => void) : void{
        getData('Workouts', (workouts) => {
            workouts.set(this.name, this);
    
            AsyncStorage.setItem('Workouts', JSON.stringify(Array.from(workouts)))
                .then(() => {
                    callback(true)
                })
                .catch(error => {
                    callback(false)
                });
        });
    } 

    public delete(callback: (success: boolean) => void) : void{
        getData('Workouts', (workouts) => {
            workouts.delete(this.name);
    
            AsyncStorage.setItem('Workouts', JSON.stringify(Array.from(workouts)))
                .then(() => {
                    callback(true)
                })
                .catch(error => {
                    callback(false)
                });
        });
    }

    public static loadWorkout(name : string, callback: (workout : IWorkout) => void){
        getData('Workouts', (data) => {
            const workoutHelper : any = data.get(name);
            
            callback(this.from(workoutHelper));
        });
    }

    public static from(workoutData : any) : IWorkout {
        return (workoutData.workoutType === WorkoutType.Strength) ? new Workout(workoutData) : new HIITWorkout(workoutData);
    }

}

export class HIITWorkout extends Workout implements IWorkout{
    private workoutTime : Date = new Date(0);
    private pauseTime : Date = new Date(0);
    private sets : number = 1;

    constructor(name : string);
    constructor(workout : HIITWorkout);
    constructor(arg : string | HIITWorkout){
        if (typeof arg === 'string') {
            super(arg);
            this.workoutType = WorkoutType.HIIT;
        }
        else{
            super(arg);
            this.workoutTime = arg.workoutTime;
            this.pauseTime = arg.pauseTime;
            this.sets = arg.sets;
        }
    }

    public getWorkoutTime() : Date{
        return this.workoutTime;
    }

    public getPauseTime() : Date{
        return this.pauseTime;
    }

    public getNumberOfSets(sets : number){
        return this.sets;
    }

    public setWorkoutTime(time : Date){
        this.workoutTime = time;
    }

    public setPauseTime(time : Date){
        this.pauseTime = time;
    }

    public setNumberOfSets(sets : number){
        this.sets = sets;
    }
}