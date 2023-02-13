class WeightedExercise extends Exercise implements IExercise{
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

    getWeights() : Array<number>{
        let result = new Array<number>;
        this.weights.forEach(element => {
            if(element != 0)
                result.push(element);
        });
        return result;
    }

    canBeLogged(): boolean {
        this.reps.forEach(element => {
            if(element != 0)
                return true;
        });
        return false;
    }
}

