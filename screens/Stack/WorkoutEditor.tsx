import { StyleSheet } from 'react-native';
import {  View } from '../../components/Themed';
import { AddNew_Empty } from '../../components/Add';
import { IWorkout, Workout } from '../../src/Workout';
import { useEffect, useState } from 'react';


export default function WorkoutsEditor({ navigation, route } : any) {
  const [workout, setWorkout] = useState<IWorkout>();;

  const name : string = route.params.headerName;

  useEffect(() => Workout.getWorkout(name, (workout) => setWorkout(workout)));

  navigation.setOptions({
    title: name
  });

  if(workout?.getExercises()){
    return (
      <View style={styles.container}>
        <AddNew_Empty text="Add Exercise" onPress={() => navigation.navigate('ExerciseSearch', { headerName: name })}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
