import { StyleSheet } from 'react-native';
import {  View } from '../../components/Themed';
import { AddNew_Empty } from '../../components/Add';

export default function WorkoutsScreen({ navigation } : any) {
  return (
    <View style={styles.container}>
      <AddNew_Empty text="Add new workout" onPress={() => navigation.navigate('NewWorkout')}/>
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
