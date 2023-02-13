class HoldExercise extends Exercise implements IExercise{
    private time : Array<Date> = [];
    
    constructor(name : ExerciseName, muscleGroups? : Array<MuscleGroup>,  description? : string){
        super(name, muscleGroups, description);
    }

}