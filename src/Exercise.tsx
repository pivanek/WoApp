import { ExerciseName } from "./ExerciseName";

type exerciseTypes = {

}

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
    private name : string;
    private muscleGroups : Array<string>;
    private description : string;
    private exerciseType : ExerciseType;

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

export class StrengthExercise extends Exercise implements IExercise{
    private reps : Array<number>;
    private weights : Array<number>;

    constructor(exercise : Exercise){
        super(exercise);
        this.reps = [0, 0, 0, 0, 0, 0];
        this.weights = [0, 0, 0, 0, 0, 0];
    }

    public setReps(reps : number[] ){
        this.reps = reps;
    }

    public setWeight(weights : number[] ){
        this.weights = weights;
    }

    public getReps() : number[]{
        return this.reps;
    }

    public getWeight() : number[]{
        return this.weights;
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
}