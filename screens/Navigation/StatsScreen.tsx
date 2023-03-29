import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { LineChart } from 'react-native-chart-kit';
import { vw } from '../../src';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { Component } from 'react';
import auth, { database } from '../../src/auth';
import { collection, getDocs, query } from 'firebase/firestore';

type StatData {
  [name : string]: LineChartData
}

const logHelper : StatData = {};

interface State {
  stats?: StatData;
}

export default class CalendarScreen extends Component<State> {
  state: State = {
    items: undefined
  };

  public static async getLogs(callback: (logs : any) => void){
    const email = auth.currentUser?.email;
    if(email){
      const q = query(collection(database, "users", email, 'events'));

      const data = await getDocs(q);
      const logHelper : AgendaSchedule = {};
      

      if(data)
        data.forEach((doc) => {
          logHelper[doc.id] =[]
          const docData  = doc.data();

          if (docData.PRs)
            logHelper[doc.id].push({ PRs: docData.PRs, name: 'PRs'});
          
          if (docData.log)
            logHelper[doc.id].push({ log: docData.log, name: docData.log.name });

          if (docData.weight)
            logHelper[doc.id].push({ weight: docData.weight, name: docData.weight});
        });
      callback(logHelper);
    }
  }

  chartConfig : AbstractChartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(45, 197, 252, ${opacity})`,
    barPercentage: 0.5,
    labelColor: (opacity = 1) => `rgba(240, 240, 240, ${opacity})`
  };
  
  data : LineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      }
    ],
    legend: ["Rainy Days"],
  }
  render() {
    return (
      <View style={styles.container}>
        <LineChart
          data={this.data}
          width={vw(95)}
          height={220}
          chartConfig={this.chartConfig}
          style={{ backgroundColor: "#313130", borderRadius: 15}}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});
