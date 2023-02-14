import AsyncStorage from "@react-native-async-storage/async-storage";
import { IWorkout } from "./Workout";

export function getData(key : string, callback: (data: Map<any, any>) => void){
  var data = new Map<any, any>();   

  AsyncStorage.getItem(key)
    .then(result => {
      if (result != null) {
        console.log('Data loaded: ');
        data = JSON.parse(result);
        console.log(new Map(data));
      
        callback(new Map(data));
      }
    })
    .catch(error => {
      console.log('Error saving data', error);
    }); 
}


export function deleteWorkouts(){
  AsyncStorage.removeItem('Workouts')
    .then(() => {
        console.log('Data deleted successfully');
    })
    .catch(error => {
        console.log('Error deleting data', error);
    });

  AsyncStorage.setItem('Workouts', JSON.stringify(new Map<string, IWorkout>()))
    .then(() => {
      console.log('Data saved successfully');
    })
    .catch(error => {
      console.log('Error saving data', error);
    });
}