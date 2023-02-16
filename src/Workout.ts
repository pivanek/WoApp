import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExerciseName } from "./Exercise/ExerciseName";
import { getData } from ".";
import { Callback } from "@react-native-async-storage/async-storage/lib/typescript/types";

export enum WorkoutType{
    Strength,
    HIIT   
}

export interface IWorkout{
    getName() : string | undefined;
    changeName(name : string) : void;
    getType() : WorkoutType;
    getExercises() : string[];
    addExercise(exercise : String) : void;
    removeExercise(name : string) : void;
    saveData(callback: (success: boolean) => void) : void;
}

export class Workout implements IWorkout{
    name : string | undefined;
    exercises : string[];
    workoutType : WorkoutType;
    lastUpdate : Date;    
    
    constructor(name : string);
    constructor(workout : Workout);
    constructor(arg : string | Workout){
        if (typeof arg === 'string') {
            this.name = arg;
            this.exercises = [];
            this.workoutType = WorkoutType.Strength;
            this.lastUpdate = new Date();
        } else {
            this.name = arg.name;
            this.exercises = arg.exercises;
            this.workoutType = arg.workoutType;
            this.lastUpdate = arg.lastUpdate;
        }
    }
    private update(){
        this.lastUpdate = new Date();
    }

    public getName(){
        return this.name;
    }
    
    public static getWorkout(name : string, callback: (workout : IWorkout) => void){
        getData('Workouts', (data) => {
            const workoutHelper : any = data.get(name);
            
            callback((workoutHelper.workoutType === WorkoutType.Strength) ? new Workout(workoutHelper) : new HIITWorkout(workoutHelper));
        });
    }

    public getType(){
        return this.workoutType;
    }

    public getExercises() : string[]{
        return this.exercises;
    }

    public addExercise(exercise : string) : void{
        this.update();
        this.exercises.push(exercise);
        console.log('After add: ');
        console.log(this);
    }

    removeExercise(name: string): void {
        const index = this.exercises.indexOf(name);
        if (index !== -1)
            this.exercises.splice(index, 1);
        console.log('After remove: ');
        console.log(this);
    }

    public changeName(name : string) : void{
        this.update;
        this.name = name;
    }

    public saveData(callback: (success: boolean) => void) : void{
        getData('Workouts', (workouts) => {
            console.log('Before set: ');
            console.log(workouts);
    
            workouts.set(this.name, this);
    
            AsyncStorage.setItem('Workouts', JSON.stringify(Array.from(workouts)))
                .then(() => {
                    console.log('Data saved successfully: ');
                    console.log(workouts);
                    callback(true)
                })
                .catch(error => {
                    console.log('Error saving data');
                    console.error(error);
                    callback(false)
                });
        });
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

    changeWorkoutTime(time : Date){
        this.workoutTime = time;
    }

    changePauseTime(time : Date){
        this.pauseTime = time;
    }

    changeNumberOfSets(sets : number){
        this.sets = sets;
    }
}