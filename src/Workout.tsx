import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IWorkout{
    getName() : string;
    changeName(name : string) : void;
    getExercises() : Array<IExercise>;
    saveData() : any;
}

export class Workout implements IWorkout{
    private name : string;
    private exercises : Array<IExercise>;
    private lastUpdate : Date;
    private isSync : boolean = false;
    
    constructor(name : string){
        this.name = name
        this.exercises = new Array<IExercise>;
        this.lastUpdate = new Date();
    }

    private update(){
        this.lastUpdate = new Date();
    }

    public getName() : string{
        return this.name;
    }

    public getExercises() : Array<IExercise>{
        return this.exercises;
    }

    public getExercise(name : ExerciseName) : IExercise | undefined{
        return this.exercises.find(exercise => exercise.getName() == name);
    }

    public addExercise(exercise : IExercise) : void{
        this.update;
        this.exercises.push(exercise);
    }

    public changeName(name : string) : void{
        this.lastUpdate = new Date();
        this.name = name;
    }

    public saveData(){
        AsyncStorage.setItem('Workouts', JSON.stringify(this))
            .then(() => {
                console.log('Data saved successfully');
            })
            .catch(error => {
                console.log('Error saving data', error);
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