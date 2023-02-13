interface IExercise{
    getName() : ExerciseName;
    getType() : Array<MuscleGroup> | undefined;
    getDescription() : string | undefined;
    canBeLogged() : boolean;
}

