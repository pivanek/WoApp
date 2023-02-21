import { ExerciseName } from "./ExerciseName";

enum ExerciseType{
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
    
    public static from(exerciseData : Exercise){
        return (exerciseData.exerciseType === ExerciseType.Reps) ? new StrengthExercise(exerciseData) : new HoldExercise(exerciseData);
    }
}

class StrengthExercise extends Exercise implements IExercise{
    private reps : Array<number>;
    private weights : Array<number>;

    constructor(exercise : Exercise){
        super(exercise);
        this.reps = [0, 0, 0, 0, 0, 0];
        this.weights = [0, 0, 0, 0, 0, 0];
    }

    public setReps(reps : number, set : number){
        if(set <= 6 && set < 0)
            this.reps[set-1] = reps;
        else{
            throw new Error("Wrong number for set, it can be only Integer between 1-6.");
        }
    }

    public setWeight(weight : number, set : number){
        if(set <= 6 && set < 0)
            this.weights[set-1] = weight;
        else{
            throw new Error("Wrong number for set, it can be only Integer between 1-6.");
        }
    }

    public getReps() : Array<number>{
        let result = new Array<number>;
        this.reps.forEach(element => {
            if(element != 0)
                result.push(element);
        });
        return result;
    }

    public getWeight() : Array<number>{
        let result = new Array<number>;
        this.reps.forEach(element => {
            if(element != 0)
                result.push(element);
        });
        return result;
    }
}

export class HoldExercise extends Exercise implements IExercise{
    private time : Array<Date> = [];
    
    constructor(exercise : Exercise){
        super(exercise);
    }
    
    public setTime(time : Date, set : number){
        if(set <= 6 && set < 0)
            this.time[set-1] = time;
        else{
            throw new Error("Wrong number for set, it can be only Integer between 1-6.");
        }
    }

    public getTime() : Array<Date>{
        return this.time;
    }
}