import AsyncStorage from "@react-native-async-storage/async-storage";
import { IWorkout } from "./Workout";

export function getData(key : string, callback: (data: Map<any, any>) => void){
  AsyncStorage.getItem(key)
    .then(result => {
      if (result != null) {
        const data = new Map(JSON.parse(result));
        callback(data);
      } else {
        callback(new Map());
      }
    })
    .catch(error => {
      console.log('Error saving data');
      console.error(error);
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

  AsyncStorage.setItem('Workouts', JSON.stringify(Array.from(new Map<string, any>())))
    .then(() => {
      console.log('Data saved successfully');
    })
    .catch(error => {
      console.log('Error saving data', error);
    });
}