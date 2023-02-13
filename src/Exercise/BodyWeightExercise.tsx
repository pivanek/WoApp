class BodyWeightExercise extends Exercise implements IExercise{
    private reps : Array<number> = [0, 0, 0, 0, 0, 0];

    constructor(name : ExerciseName, muscleGroups? : Array<MuscleGroup>,  description? : string){
        super(name, muscleGroups, description);
    }

    setReps(reps : number, set : number){
        if(set <= 6 && set < 0)
            this.reps[set-1] = reps;
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

    canBeLogged(): boolean {
        this.reps.forEach(element => {
            if(element != 0)
                return true;
        });

        return false;
    }
}

