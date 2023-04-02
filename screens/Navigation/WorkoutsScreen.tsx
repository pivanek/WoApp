import { collection, getDocs, getDocsFromCache, query } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { AddNew_Empty } from '../../components/Add';
import { Button } from '../../components/Button';
import { Pressable } from '../../components/Themed';
import WorkoutContainer from '../../components/WorkoutItem';
import { IWorkout, Workout } from '../../src/Workout';
import auth, { database } from '../../src/auth';
import { useIsFocused } from '@react-navigation/native';

export default function WorkoutsScreen({ navigation } : any) {
  const [workouts, setWorkouts] = useState<IWorkout[]>();
  const [isPressed, setPressed] = useState('');
  
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(true);

  const workoutList = useRef<FlatList>(null);
  const userEmail = auth.currentUser?.email;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const loadData = async () => {
    if(userEmail){
      const q = query(collection(database, "users", userEmail , 'workouts'));
      const data = await getDocs(q);

      const workoutHelper : Workout[] = [];

      data.forEach((doc : any) => {
        const workout = new Workout(doc.data());
        workoutHelper.push(workout);
      });

      setRefreshing(false);
      setWorkouts(workoutHelper);
    }
  }

  useEffect(() => {
    isFocused && setRefreshing(true)
  },[isFocused]);


  if (refreshing)
    setTimeout(() => {
      loadData();
    }, 1000);


  if(workouts?.length == 0 || workouts == undefined){
      return (
        <ScrollView style={{flex: 1}} 
          contentContainerStyle={{alignItems: 'center', height: '100%'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
          }
        >
          <AddNew_Empty text="Add new workout" onPress={() => navigation.navigate('SetUpWorkout')}/>
        </ScrollView>
      );
    }
    else{
      return(
        <FlatList 
          showsVerticalScrollIndicator={false} 
          style={[styles.flatList, {marginTop: 18}]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ref={workoutList}
          data={workouts} renderItem={({ item, index }) => 
            <Pressable style={styles.itemContainer} darkColor="#313130" lightColor="#D4D4D3" onPress={() => {setPressed((item.getName() == isPressed)? '' : item.getName()); workoutList.current?.scrollToIndex({ index: index, animated: true });}}>
              <WorkoutContainer refresh={(refresh) => setRefreshing(refresh)} data={item} pressed={isPressed} navigation={navigation}/>
            </Pressable>
          }
          ListFooterComponent={
            <Button style={styles.buttonAdd} onPress={() => navigation.navigate('SetUpWorkout')}>Add new workout</Button>
          }
        />
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