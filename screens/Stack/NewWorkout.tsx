import { StyleSheet } from 'react-native';

import { Text, View, TextInput } from '../../components/Themed';
import RadioButton from '../../components/RadioButton';
import React, {useState} from 'react';
import { Button } from '../../components/Button';
import TimeSetter from '../../components/TimeSetter';
import { HIITWorkout, IWorkout, Workout } from '../../src/Workout';
import WorkoutEditor from './WorkoutEditor';

export default function NewWorkout({ navigation: { navigate } } : any) {
  const [checkedRadio, setChecked] = useState('Strength');
  const [name, getWorkoutName] = useState('');

  function createWorkout( navigate : Function) : void{
    let workout : IWorkout;
    if (checkedRadio == 'Strength')
      workout = new Workout(name);
    else (checkedRadio == 'HIIT')
      workout = new HIITWorkout(name);

    workout.saveData();
    
    navigate('WorkoutEditor', { headerName:  name });
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} darkColor='#313131' lightColor="#D4D4D3" placeholder='Type name of your WO' onChangeText={name => getWorkoutName(name)}/>
      <Text style={styles.header}>Choose type</Text>
      <View style={styles.radioButtonContainer}>
        <RadioButton value='Strength' checked={checkedRadio=='Strength'} onPress={() => setChecked('Strength')} style = {styles.radioButton}>Strength Workout</RadioButton>
        <RadioButton value='HIIT' checked={checkedRadio=='HIIT'} onPress={() => setChecked('HIIT')} style = {styles.radioButton}>HIIT Workout</RadioButton>
      </View>
      {(checkedRadio == 'HIIT')? <TimeSetter/> : null}
      <Button style={styles.nextButton} onPress={() => createWorkout(navigate)}>Next</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'column'
  },
  header: {
    fontWeight: 'bold',
    alignSelf:'center',
    fontSize: 20,
  },
  input: {
    marginBottom:20,
    alignSelf: 'center',
    width: '80%',
    height: 50,
    fontSize: 20,
    color: '#000',
    marginTop: 15,
    borderRadius: 5,
    padding: 10,
  },
  radioButtonContainer: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  radioButton:{
    margin: 7,
    marginLeft: 50
  },
  nextButton: {
    minWidth: 200,
    minHeight: 50,
    marginTop: 100,
    alignSelf: 'center'
  }
});
