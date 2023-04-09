import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from ".";
import IExercise, { Exercise } from "./Exercise";
import { DocumentData, DocumentReference, collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore";
import auth, { database } from "./auth";
import { Alert } from "react-native";

export enum WorkoutType{
    Strength,
    Interval
}



// export interface IWorkout{
//     getName() : string;
//     setName(name : string) : void;
//     getType() : WorkoutType;
//     getExercises() : Exercise[];
//     setExercises(exercises : IExercise[]) : void;
//     addExercise(exercise : IExercise | IExercise[]) : void;
//     deleteExercise(name : IExercise) : void;
//     save(callback: (success: boolean) => void) : void;
//     delete(callback: (success: boolean) => void) : void;
// }

export class Workout{
    protected name : string;
    protected exercises : Exercise[];
    // protected workoutType : WorkoutType;

    constructor(name : string);
    constructor(workout : Workout);
    constructor(arg : string | Workout | any){
        if (typeof arg === 'string') {
            this.name = arg;
            this.exercises = [];
            // this.workoutType = WorkoutType.Strength;
        } else if (arg.constructor == Workout){
          this.name = arg.name;
          this.exercises = arg.exercises;
        //   this.workoutType = arg.workoutType;
        } else {
          const exercisesHelper : Exercise[] = [];
          arg.exercises?.forEach((exercise : any) => {
            exercisesHelper.push(new Exercise(exercise))
          });

          this.name = arg.name;
          this.exercises = exercisesHelper;
        //   this.workoutType = arg.workoutType;
        }
    }

    public getName(){
        return this.name;
    }

    // public getType(){
    //     return this.workoutType;
    // }

    public getExercises() : Exercise[]{
        return this.exercises;
    }

    public addExercise(exercise : Exercise) : void{
        this.exercises.push(exercise);
    }

    public deleteExercise(exercise: Exercise): void {
        const index = this.exercises.indexOf(exercise);
        this.exercises.splice(index, 1);
    }

    public setName(name : string) : void{
        this.name = name;
    }

    public setExercises(exercises : Exercise[]) : void{
        this.exercises = exercises;
    }

    private toFirebase(){
      return({
        name: this.name,
        exercises: this.exercises.map((value) => value.toFireBase()),
        // workoutType: this.workoutType
      });
    }

    public async save(callback: (success: boolean) => void){
      const userEmail =  auth.currentUser?.email

      if (userEmail) {
        const workoutDoc = doc(database, 'users', userEmail, 'workouts', this.name);

        setDoc(workoutDoc, this.toFirebase())
          .catch((error : Error) => {
            const errorMessage : string = error.message;

            Alert.alert('Error saving data', errorMessage)
            callback(false)
          });

        callback(true);
      }
    }

    public delete(callback: (success: boolean) => void) : void{
        const userEmail =  auth.currentUser?.email

        if (userEmail) {
            const workoutDoc = doc(database, 'users', userEmail, 'workouts', this.name);

            deleteDoc(workoutDoc)
                .catch((error : Error) => {
                    const errorMessage : string = error.message;

                    Alert.alert('Error deleting data', errorMessage)
                    callback(false)
                });

                callback(true)
        }
    }

    // public static from(workoutData : any) : Workout | HIITWorkout {
    //     const workoutResult : Workout | HIITWorkout = (workoutData.workoutType == WorkoutType.Strength) ? new Workout(workoutData) : new HIITWorkout(workoutData);
    //     const exercisesHelper : Exercise[] = [];

    //     workoutData.exercises.forEach((exercise: Exercise) => {
    //         exercisesHelper.push(Exercise.from(exercise));
    //     });
    //     workoutResult.setExercises(exercisesHelper);

    //     return workoutResult;
    // }

    public static async load(callback : (workouts : Workout[]) => void) {
        if(auth.currentUser?.email){
            const q = query(collection(database, "users", auth.currentUser?.email , 'workouts'));
            const data = await getDocs(q);

            const workoutHelper : Workout[] = [];

            data.forEach((doc : any) => {
                const workout = new Workout(doc.data());
                workoutHelper.push(workout);
            });

            callback(workoutHelper);
        }
    }

}

// export class HIITWorkout extends Workout {
//     private workoutTime : string = new Date(0).toTimeString();
//     private pauseTime : string = new Date(0).toTimeString();
//     private sets : number = 1;

//     constructor(name : string);
//     constructor(workout : Workout);
//     constructor(arg : string | Workout){
//         if (typeof arg === 'string') {
//             super(arg);
//             this.workoutType = WorkoutType.Interval;
//         }
//         else{
//             super(arg);
//         }
//     }

//     public getWorkoutTime() : Date{
//         return new Date(this.workoutTime);
//     }

//     public getPauseTime() : Date{
//         return new Date(this.pauseTime);
//     }

//     public getNumberOfSets(sets : number){
//         return this.sets;
//     }

//     public setWorkoutTime(time : Date){
//         this.workoutTime = time.toTimeString();
//     }

//     public setPauseTime(time : Date){
//         this.pauseTime = time.toTimeString();
//     }

//     public setNumberOfSets(sets : number){
//         this.sets = sets;
//     }
// }