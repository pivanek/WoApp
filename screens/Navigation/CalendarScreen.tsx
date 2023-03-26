import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Agenda, AgendaEntry, AgendaSchedule, DateData } from 'react-native-calendars';
import { Log } from '../../src/Log';

interface State {
  items?: AgendaSchedule;
}

export default class CalendarScreen extends Component<State> {
  state: State = {
    items: undefined
  };

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        renderItem={(reservation) => reservation.log.renderEvent()}
        showClosingKnob={true}
        pagingEnabled
        theme={{ backgroundColor: '#010101', calendarBackground: '#010101', dayTextColor: 'white', selectedDotColor: '#2DC5FC', monthTextColor: 'white', agendaKnobColor: '#8F9492', todayDotColor: '#2DC5FC'}}
      />
    );
  }

  loadItems = (day?: DateData) => {
    const items = this.state.items || {};
    const newItems: AgendaSchedule = {};

    Log.getLogs((data) => {  

      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day? day.timestamp + i * 24 * 60 * 60 * 1000 : Date.now();
          const strTime = this.timeToString(time);
          

          if (!items[strTime]){
            items[strTime] = []; 
            data[strTime]?.forEach((element : any) => {
              const log = new Log(element);

              items[strTime].push({
                name: log.getName(),
                log : log,
                day: strTime,
              });
            });              
          }
        }
        Object.keys(items).forEach(key => {newItems[key] = items[key];});

        this.setState({
          items: newItems
        });        
      }, 1000);
    });    
  }

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  }

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
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
    },
    workoutButtons:{
      flex: 1,
      padding: 5,
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0)'
    }
});