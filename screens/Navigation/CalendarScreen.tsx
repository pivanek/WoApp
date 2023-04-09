import React, { Component, useState } from 'react';
import { FlatList, StyleSheet  } from 'react-native';
import { Agenda, AgendaEntry, AgendaSchedule, DateData } from 'react-native-calendars';
import { Event, Log } from '../../src/Log';
import { View, Text, TouchableOpacity } from '../../components/Themed';
import { Rutine } from '../../src/User';
import { Workout } from '../../src/Workout';
import { MarkedDatesType } from 'react-native-calendars/src/calendar';

interface State {
  items?: AgendaSchedule;
}

interface Workouts {
  [workoutName : string] : Workout;
}

export default function CalendarScreen({ navigation } : any) {
  const [items, setItems] = useState<AgendaSchedule>({});

  function renderEvent(reservation : AgendaEntry) : JSX.Element{
    if(reservation.log){
      const log = new Log(reservation.log);

      return log.renderEvent();
    }
    else if(reservation.weight)
      return (
        <View key={reservation.name} style={{backgroundColor: '#313130', paddingVertical: 10, borderRadius: 15, marginRight: 20, marginTop: 10}}>
          <Text darkColor='#fff' lightColor='#000' style={{paddingHorizontal: 30, fontSize: 18}}>Weight: {reservation.weight}</Text>
        </View>
      );
    else if(reservation.rutineDay){
      const workout = new Workout(reservation.rutineDay);

      return (
        <View style={{backgroundColor: '#313130', borderRadius: 15, marginRight: 20, marginTop: 10, paddingVertical: 10,}}>
          <Text darkColor='#fff' lightColor='#000' style={{paddingHorizontal: 30, fontSize: 18}}>{reservation.name}</Text>
          {(workout.getExercises().length == 0)? null : 
            <>
              <View style={styles.separatorHorizontal} />
              <FlatList style={styles.flatList} data={workout.getExercises()} renderItem={({item}) => <Text style={{color: '#929494', margin: 1, marginLeft: 8}}>{ item.getName() }</Text>} />
            </>
          }
          { reservation.day == timeToString(Date.now())?
            <>
              <View style={styles.separatorHorizontal}/>
              <View style={{marginTop: 5, flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0)'}}>
                <TouchableOpacity onPress={() => navigation.navigate('ExerciseLog', {workout: workout})} darkColor='#313131' lightColor="#D4D4D3" style={styles.workoutButtons}>
                  <Text style={styles.workoutButtonsText}>Start</Text>
                </TouchableOpacity>
              </View>
            </> : null
          }
      </View>
      );
    }
    else
      return (
        <View key={reservation.name} style={{backgroundColor: '#313130', paddingVertical: 10, borderRadius: 15, marginRight: 20, marginTop: 10}}>
           <Text darkColor='#fff' lightColor='#000' style={{paddingHorizontal: 30, fontSize: 18}}>Your PRs</Text>
          <View style={styles.separatorHorizontal} />
          <FlatList data={reservation.PRs} renderItem={({item}) => <Text darkColor='#fff' lightColor='#000' style={{paddingHorizontal: 30, fontSize: 16}}>{item.name}: {item.weight}</Text>}/>
        </View>      
      );
  }

  const loadItems = (day?: DateData) => {
    const parsedData = items || {};
    const newItems: AgendaSchedule = {};

    let workouts : Workout[];
    Workout.load(data => workouts = data)

    Log.getLogs((data) => { 
      setTimeout(() => {
        let rutineData : Rutine | undefined;


        if(data)
          data.forEach((doc) => {
            if(doc.id != 'rutine'){
              parsedData[doc.id] =[]
              const docData = doc.data() as Event;
              

              if (docData.PRs)
                parsedData[doc.id].push({ PRs: docData.PRs, name: 'PRs'});
              
              if (docData.log)
                parsedData[doc.id].push({ log: docData.log, name: docData.log.name });
    
              if (docData.weight)
                parsedData[doc.id].push({ weight: docData.weight, name: docData.weight.toString()});
            }
            else{
              rutineData = doc.data() as Rutine;
            }
          });

        for (let i = -15; i < 85; i++) {
          const time = day? day.timestamp + i * 24 * 60 * 60 * 1000 : Date.now();
          const strTime = timeToString(time);

          if(!parsedData[strTime]){
            parsedData[strTime] = []

            if(time >= Date.now()-24 * 60 * 60 * 1000){
              if(rutineData){
                switch (new Date(strTime).getDay()) {
                  case 0:
                    const sundayWorkout = workouts.find(workout => workout.getName() === rutineData?.Sunday);
                    if (sundayWorkout) {
                      parsedData[strTime].push({
                        rutineDay: sundayWorkout,
                        name: rutineData.Sunday,
                        day: strTime
                      });
                    }
                    break;
                  case 1:
                    const mondayWorkout = workouts.find(workout => workout.getName() === rutineData?.Monday);
                    if (mondayWorkout) {
                      parsedData[strTime].push({
                        rutineDay: mondayWorkout,
                        name: rutineData.Monday,
                        day: strTime
                      });
                    }
                    break;
                  case 2:
                    const tuesdayWorkout = workouts.find(workout => workout.getName() === rutineData?.Tuesday);
                    
                    if (tuesdayWorkout) {
                      parsedData[strTime].push({
                        rutineDay: tuesdayWorkout,
                        name: rutineData.Tuesday,
                        day: strTime
                      });
                    }
                    break;
                  case 3:
                    const wednesdayWorkout = workouts.find(workout => workout.getName() === rutineData?.Wednesday);
                    if (wednesdayWorkout) {
                      parsedData[strTime].push({
                        rutineDay: wednesdayWorkout,
                        name: rutineData.Wednesday,
                        day: strTime
                      });
                    }
                    break;
                  case 4:
                    const thursdayWorkout = workouts.find(workout => workout.getName() === rutineData?.Thursday);
                    if (thursdayWorkout) {
                      parsedData[strTime].push({
                        rutineDay: thursdayWorkout,
                        name: rutineData.Thursday,
                        day: strTime
                      });
                    }
                    break;
                  case 5:
                    const fridayWorkout = workouts.find(workout => workout.getName() === rutineData?.Friday);
                    if (fridayWorkout) {
                      parsedData[strTime].push({
                        rutineDay: fridayWorkout,
                        name: rutineData.Friday,
                        day: strTime
                      });
                    }
                    break;
                  case 6:
                    const saturdayWorkout = workouts.find(workout => workout.getName() === rutineData?.Saturday);
                    if (saturdayWorkout) {
                      parsedData[strTime].push({
                        rutineDay: saturdayWorkout,
                        name: rutineData.Saturday,
                        day: strTime
                      });
                    }
                    break;
                } 
              }
            }
          }
        }
          
        Object.keys(parsedData).forEach(key => {newItems[key] = parsedData[key];});
                        
        setItems(newItems);
      }, 1000);
    });    
  }

  

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  }

  function timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      renderItem={(reservation) => renderEvent(reservation)}
      pagingEnabled
      theme={{ backgroundColor: '#010101', calendarBackground: '#010101', dayTextColor: 'white', selectedDotColor: '#2DC5FC', monthTextColor: 'white', agendaKnobColor: '#8F9492', todayDotColor: '#2DC5FC'}}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#313130',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
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
      flex: 1
    },
    workoutButtons:{
      flex: 1,
      padding: 5,
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0)'
    }
});