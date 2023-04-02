import { Alert, FlatList, RefreshControl, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { LineChart } from 'react-native-chart-kit';
import { vw } from '../../src';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { useEffect, useState } from 'react';
import auth from '../../src/auth';
import { PR } from '../../src/User';
import { Log } from '../../src/Log';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';

type StatData = {
  [name : string] : LineChartData
}

export default function CalendarScreen() {
  const [stats, setStats] = useState<StatData>({});
  const [refreshing, setRefreshing] = useState<boolean>(true);

  const chartConfig : AbstractChartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(45, 197, 252, ${opacity})`,
    barPercentage: 0.5,
    labelColor: (opacity = 1) => `rgba(240, 240, 240, ${opacity})`
  };

  async function getStats(){
    const email = auth.currentUser?.email;

    if(email){
      Log.getLogs((data) =>{
        const items = stats || {};
        const newStats : StatData = {};

        data.forEach((doc) => {
          const docData = doc.data();

          if (docData.PRs){
            docData.PRs.forEach((element : PR) => {
              if(!newStats[element.name])
                newStats[element.name] = {
                  labels: [],
                  datasets: [{ data: [] }],
                  legend: [ element.name ],
                };
              if (element.weight) {
                newStats[element.name].labels.push(doc.id);
                newStats[element.name].datasets[0].data.push(element.weight);
              }
            });
          } 

          if (docData.weight){
            if(!newStats['weight'])
              newStats['weight'] = {
                labels: [],
                datasets: [{ data: [] }],
                legend: ['Weight'],
              };

              newStats['weight'].labels.push(doc.id);
              newStats['weight'].datasets[0].data.push(docData.weight);
          }
        });

        Object.keys(items).forEach(key => {newStats[key] = items[key]});
        
        setStats(newStats)
      }).then().catch(err => Alert.alert('Error', err.message));
    }

    setRefreshing(false);
  }

  useEffect(() => {
    if(refreshing)
      setTimeout(() => {
        getStats();
      }, 1000);
  }, [refreshing])
  
  return (
    <FlatList style={{ alignSelf: 'center', marginVertical: 20 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)}/>} data={Object.values(stats)} renderItem={({ item }) =>
      <LineChart
        data={item}
        width={vw(95)}
        height={220}
        chartConfig={chartConfig}
        style={{backgroundColor: "#313130", borderRadius: 15, marginTop: 10}}
        withVerticalLabels
      />
    }/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});
