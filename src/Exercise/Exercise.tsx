class Exercise implements IExercise{
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
    
    getType() : Array<MuscleGroup> | undefined{
        return this.muscleGroups;
    }

    getDescription() : string | undefined{
        return this.description;
    }

    canBeLogged() : boolean{
        return false;
    }
}

