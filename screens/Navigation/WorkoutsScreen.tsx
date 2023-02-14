import { FlatList, StyleSheet } from 'react-native';
import { View, Text } from '../../components/Themed';
import { AddNew_Empty } from '../../components/Add';
import { deleteWorkouts, getData } from '../../src';
import { Button } from '../../components/Button';
import { IWorkout } from '../../src/Workout';
import { useState, useEffect } from 'react';

export default function WorkoutsScreen({ navigation } : any) {
  const [workouts, setWorkouts] = useState(new Map<string, any>());

  useEffect(() => {
    getData('Workouts', (data) => {
      setWorkouts(data);
    });
  }, []);
    
  console.log('WorkoutsScreen:');
  console.log(workouts);

  if(workouts.size == 0){
      return (
        <View style={styles.container}>
          <AddNew_Empty text="Add new workout" onPress={() => navigation.navigate('NewWorkout')}/>
        </View>
      );
    }
    else{
      return(
        <View style={styles.container}>
            <FlatList data={Array.from(workouts.keys())} renderItem={({ item }) => <Item data={item}/>}/>
            <Button onPress={() => navigation.navigate('NewWorkout')}>Add new workout</Button>
        </View>
      );
    }
}

export function Item(params: {data: string}){
  return(
      <View style={styles.itemContainer}>
          <Text style={styles.item}>{params.data.replaceAll('_', ' ')}</Text>
      </View>
  );
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
  itemContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#929494',
    marginHorizontal: 20 
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
