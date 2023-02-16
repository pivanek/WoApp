import { FlatList, StyleSheet } from 'react-native';
import { View, Text, Pressable } from '../../components/Themed';
import { AddNew_Empty } from '../../components/Add';
import { deleteWorkouts, getData } from '../../src';
import { Button } from '../../components/Button';
import { IWorkout } from '../../src/Workout';
import { useState, useEffect } from 'react';

export default function WorkoutsScreen({ navigation } : any) {
  const [workouts, setWorkouts] = useState(new Map<string, any>());
  const [isPressed, setPressed] = useState('');

  useEffect(() => {
    getData('Workouts', (data) => {
      setWorkouts(data);
    });
  });

  if(workouts.size == 0){
      return (
        <View style={styles.containerEmpty}>
          <AddNew_Empty text="Add new workout" onPress={() => navigation.navigate('NewWorkout')}/>
        </View>
      );
    }
    else{
      return(
        <View style={styles.container}>
            <FlatList style={styles.flatList} data={Array.from(workouts.values())} renderItem={({ item }) => <Pressable style={styles.itemContainer} darkColor="#313131" lightColor="#D4D4D3" onPress={() => setPressed(item.name)}><Item data={item} pressed={isPressed} navigation={navigation}/></Pressable>}/>
            <Button style={styles.buttonAdd} onPress={() => navigation.navigate('NewWorkout')}>Add new workout</Button>
        </View>
      );
    }
}

export function Item(params: {data: any, pressed : string, navigation : any}){
  const exercises : string[] = params.data.exercises;
  const name : string = params.data.name;

  return(
    <>
      <Text darkColor='#fff' lightColor='#000' style={styles.itemText}>{name}</Text>
      { (exercises.length == 0)? null : <><View style={styles.separatorHorizontal} /><FlatList data={exercises} renderItem={({ item }) => <Text>{item}</Text>} /></>}
      { (params.pressed == name)?
        <>
          <View style={styles.separatorHorizontal}/>
          <View style={styles.buttonsContainer}>
            <Pressable onPress={() => params.navigation.navigate('NewWorkout', {headerName: name})} darkColor='#313131' lightColor="#D4D4D3" style={styles.workoutButtons}>
              <Text style={styles.workoutButtonsText}>Edit</Text>
            </Pressable>
            <View style={styles.separatorVertical}/>
            <Pressable darkColor='#313131' lightColor="#D4D4D3" style={styles.workoutButtons}><Text style={styles.workoutButtonsText}>Start</Text></Pressable>
          </View>
        </>
        : null 
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList:{
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    paddingVertical: 10,
    borderRadius: 15,
    minHeight: 30,
    marginTop: 10
  },
  itemText: {
    paddingHorizontal: 30,
    fontSize: 18,
  },
  separatorHorizontal:{
    marginTop: 5,
    marginHorizontal: 20,
    height: 1,
    backgroundColor: '#929494'
  },
  buttonsContainer: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  separatorVertical:{
    width: 1,
    backgroundColor: '#929494'
  },
  workoutButtons:{
    padding: 5,
    width: '50%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  workoutButtonsText:{
    color: '#00C5FF',
    fontSize: 16
  },
  buttonAdd: {
    width: '80%',
    marginTop: 10,
  }
});