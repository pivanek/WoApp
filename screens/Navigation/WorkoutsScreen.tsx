import { Alert, FlatList, ScrollView, StyleSheet } from 'react-native';
import { View, Text, Pressable } from '../../components/Themed';
import { AddNew_Empty } from '../../components/Add';
import { deleteWorkouts, getData } from '../../src';
import { Button } from '../../components/Button';
import { HIITWorkout, IWorkout, Workout, WorkoutType } from '../../src/Workout';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import IExercise, { Exercise } from '../../src/Exercise';
import { WorkoutContainer } from '../../components/WorkoutItem';
import { collection, onSnapshot, query } from 'firebase/firestore';
import auth, { database } from '../../src/auth';

export default function WorkoutsScreen({ navigation } : any) {
  const [workouts, setWorkouts] = useState<IWorkout[]>();
  const [isPressed, setPressed] = useState('');

  const workoutList = useRef<FlatList>(null);
  const userEmail = auth.currentUser?.email;
  
  if(userEmail){
    const q = query(collection(database, "users", userEmail, 'workouts'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const workoutsHelper : Workout[] = [];
      querySnapshot.forEach((doc : any) => {
        workoutsHelper.push(new Workout(doc));
      });

      console.log(workoutsHelper);
      setWorkouts(workoutsHelper);
    });
  }

  if(workouts?.length == 0 || workouts == undefined){
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <AddNew_Empty text="Add new workout" onPress={() => navigation.navigate('SetUpWorkout')}/>
        </View>
      );
    }
    else{
      return(
        <View style={{marginTop: 10}}>
            <FlatList showsVerticalScrollIndicator={false} ref={workoutList} style={[styles.flatList, {marginTop: 8}]} disableScrollViewPanResponder data={workouts} 
              renderItem={({ item, index }) => 
                <Pressable style={styles.itemContainer} darkColor="#313130" lightColor="#D4D4D3" onPress={() => {setPressed((item.getName() == isPressed)? '' : item.getName()); workoutList.current?.scrollToIndex({ index: index, animated: true });}}>
                  <WorkoutContainer data={item} pressed={isPressed} navigation={navigation}/>
                </Pressable>
              }
              ListFooterComponent={
                <Button style={styles.buttonAdd} onPress={() => navigation.navigate('SetUpWorkout')}>Add new workout</Button>
              }
            />
        </View>
      );
    }
}



const styles = StyleSheet.create({
  flatList:{
    alignSelf: 'center',
    width: '90%',
  },
  itemContainer: {
    marginTop: 2,
    paddingVertical: 10,
    borderRadius: 15,
    minHeight: 30,
    marginBottom: 8,
  },
  buttonAdd: {
    width: '100%',
    marginTop: 2,
    marginBottom: 10,
    alignSelf: 'center'
  }
});