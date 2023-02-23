import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Pressable, Text } from "./Themed";
import IExercise from "../src/Exercise";
import { IWorkout } from "../src/Workout";

export function WorkoutContainer(params: {data: IWorkout, pressed : string, navigation : any}){
    const exercises : IExercise[] = params.data.getExercises();
    const name : string = params.data.getName();
  
    function handleDelete() {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to delete this name?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              params.data.delete((success) => console.log(success? 'Data deleted successfully' : 'Failed to delete successfully'));
            },
          },
        ],
      );
    }
  
    return(
      <View>
        <Text darkColor='#fff' lightColor='#000' style={{paddingHorizontal: 30, fontSize: 18}}>{name}</Text>
        { (exercises.length == 0)? null : 
          <>
            <View style={styles.separatorHorizontal} />
            <FlatList style={styles.flatList} data={exercises} renderItem={({item}) => <Text style={{color: '#929494', margin: 1, marginLeft: 8}}>{ item.getName() }</Text>} />
          </>}
        { (params.pressed == name)?
          <>
            <View style={styles.separatorHorizontal}/>
            <View style={{marginTop: 5, flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0)'}}>
              <Pressable darkColor='#313131' lightColor="#D4D4D3" style={styles.workoutButtons} onPress={() => handleDelete()}>
                <Text style={[styles.workoutButtonsText, {color: 'red'}]}>Delete</Text>
              </Pressable>
              <View style={styles.separatorVertical}/>
              <Pressable onPress={() => params.navigation.navigate('SetUpWorkout', {workout: params.data})} darkColor='#313131' lightColor="#D4D4D3" style={styles.workoutButtons}>
                <Text style={styles.workoutButtonsText}>Edit</Text>
              </Pressable>
              <View style={styles.separatorVertical}/>
              <Pressable onPress={() => params.navigation.navigate('ExerciseLog', {workout: params.data, exercise: 0})} darkColor='#313131' lightColor="#D4D4D3" style={styles.workoutButtons}>
                <Text style={styles.workoutButtonsText}>Start</Text>
              </Pressable>
            </View>
          </>
          : null 
        }
      </View>
    );
  }

const styles = StyleSheet.create({
    separatorHorizontal:{
        marginTop: 5,
        marginHorizontal: 20,
        height: 1,
        backgroundColor: '#929494',
        marginVertical: 4
      },
      separatorVertical:{
        width: 1,
        backgroundColor: '#929494'
      },
      workoutButtonsText:{
        color: '#00C5FF',
        fontSize: 16
      },
      flatList:{
        alignSelf: 'center',
        width: '90%',
      },
      workoutButtons:{
        flex: 1,
        padding: 5,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)'
      },
});