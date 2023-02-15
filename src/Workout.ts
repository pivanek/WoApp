import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExerciseName } from "./Exercise/ExerciseName";
import { getData } from ".";
import { Callback } from "@react-native-async-storage/async-storage/lib/typescript/types";

export interface IWorkout{
    getName() : string;
    changeName(name : string) : void;
    getExercises() : string[];
    saveData(callback: (success: boolean) => void) : void;
}

export class Workout implements IWorkout{
    private name : string;
    private exercises : string[];
    private lastUpdate : Date;
    private isSync : boolean = false;
    
    constructor(name : string){
        this.name = name
        this.exercises = [];
        this.lastUpdate = new Date();
    }

    private update(){
        this.lastUpdate = new Date();
    }

    public getName(){
        return this.name;
    }

    public getExercises() : string[]{
        return this.exercises;
    }

    public addExercise(exercise : string) : void{
        this.update;
        this.exercises.push(exercise);
    }

    public changeName(name : string) : void{
        this.lastUpdate = new Date();
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
                    console.log('Error saving data', error);
                    callback(false)
                });
        });
    } 
}

export class HIITWorkout extends Workout implements IWorkout{
    private workoutTime : Date = new Date(0);
    private pauseTime : Date = new Date(0);
    private sets : number = 1;

    constructor(name : string){
        super(name);
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