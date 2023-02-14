import { StyleSheet } from 'react-native';
import {  View } from '../../components/Themed';
import { AddNew_Empty } from '../../components/Add';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function WorkoutsEditor({ navigation, route } : any) {
  navigation.setOptions({
    title: route.params.headerName
  });

  return (
    <View style={styles.container}>
      <AddNew_Empty text="Add Exercise" onPress={() => navigation.navigate('ExerciseSearch')}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
