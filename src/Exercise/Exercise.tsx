import { ExerciseName } from "./ExerciseName";

export default interface IExercise{
    getName() : ExerciseName;
    getMuscleGroups() : Array<MuscleGroup> | undefined;
    getDescription() : string | undefined;
}

export class Exercise implements IExercise{
    private name : ExerciseName;
    private muscleGroups? : Array<MuscleGroup>;
    private description? : string;

    constructor(name : ExerciseName, muscleGroups? : Array<MuscleGroup>,  description? : string){
        this.name = name;
        this.muscleGroups = muscleGroups;
        this.description = description;
    }

    getName() : ExerciseName{
        return this.name;
    }
    
    getMuscleGroups() : Array<MuscleGroup> | undefined{
        return this.muscleGroups;
    }

    getDescription() : string | undefined{
        return this.description;
    }
}

class RepsExercise extends Exercise implements IExercise{
    private reps : Array<number>;
    private weights : Array<number>;

    constructor(name : ExerciseName, muscleGroups? : Array<MuscleGroup>,  description? : string , reps? : Array<number>, weight? : Array<number>){
        super(name, muscleGroups, description);
        this.reps = (typeof reps == "undefined")? [0, 0, 0, 0, 0, 0] : reps;
        this.weights = (typeof weight == "undefined")? [0, 0, 0, 0, 0, 0] : weight;
    }

    setReps(reps : number, set : number){
        if(set <= 6 && set < 0)
            this.reps[set-1] = reps;
        else{
            throw new Error("Wrong number for set, it can be only Integer between 1-6.");
        }
    }

    setWeight(weight : number, set : number){
        if(set <= 6 && set < 0)
            this.weights[set-1] = weight;
        else{
            throw new Error("Wrong number for set, it can be only Integer between 1-6.");
        }
    }

    getReps() : Array<number>{
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
    
    constructor(name : ExerciseName, muscleGroups? : Array<MuscleGroup>,  description? : string){
        super(name, muscleGroups, description);
    }
}