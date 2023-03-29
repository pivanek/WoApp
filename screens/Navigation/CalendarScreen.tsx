import React, { Component } from 'react';
import { FlatList, StyleSheet  } from 'react-native';
import { Agenda, AgendaEntry, AgendaSchedule, DateData } from 'react-native-calendars';
import { Log } from '../../src/Log';
import { PR } from '../../src/User';
import { View, Text } from '../../components/Themed';

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
        renderItem={(reservation, index) => this.renderEvent(reservation)}
        showClosingKnob={true}
        pagingEnabled
        theme={{ backgroundColor: '#010101', calendarBackground: '#010101', dayTextColor: 'white', selectedDotColor: '#2DC5FC', monthTextColor: 'white', agendaKnobColor: '#8F9492', todayDotColor: '#2DC5FC'}}
      />
    );
  }

  renderEvent(reservation : AgendaEntry) : JSX.Element{
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
    else
      return (
        <View key={reservation.name} style={{backgroundColor: '#313130', paddingVertical: 10, borderRadius: 15, marginRight: 20, marginTop: 10}}>
           <Text darkColor='#fff' lightColor='#000' style={{paddingHorizontal: 30, fontSize: 18}}>Your PRs</Text>
          <View style={styles.separatorHorizontal} />
          <FlatList data={reservation.PRs} renderItem={({item}) => <Text darkColor='#fff' lightColor='#000' style={{paddingHorizontal: 30, fontSize: 16}}>{item.name}: {item.weight}</Text>}/>
        </View>      
      );
  }

  loadItems = (day?: DateData) => {
    const items = this.state.items || {};
    const newItems: AgendaSchedule = {};

    Log.getLogs((data) => { 
      setTimeout(() => {
        const parsedData : AgendaSchedule = {};
      
        if(data)
          data.forEach((doc) => {
            parsedData[doc.id] =[]
            const docData  = doc.data();
  
            if (docData.PRs)
              parsedData[doc.id].push({ PRs: docData.PRs, name: 'PRs'});
            
            if (docData.log)
              parsedData[doc.id].push({ log: docData.log, name: docData.log.name });
  
            if (docData.weight)
              parsedData[doc.id].push({ weight: docData.weight, name: docData.weight});
          });

        for (let i = -15; i < 85; i++) {
          const time = day? day.timestamp + i * 24 * 60 * 60 * 1000 : Date.now();
          const strTime = this.timeToString(time);          

          if (!items[strTime]){
              items[strTime] = []
              if (parsedData[strTime])
                items[strTime] = parsedData[strTime];
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