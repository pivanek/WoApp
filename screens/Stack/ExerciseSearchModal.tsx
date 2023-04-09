import { HeaderBackButton } from "@react-navigation/elements";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity, View, Text } from "../../components/Themed";
import { Exercise } from "../../src/Exercise";
import { PR } from "../../src/User";

export default function ExerciseSearchScreen({ navigation, route } : any) {
  const exercisesJSON: Object[] = require("../../src/exercises.json");
  const exercisesData: Exercise[] = parseJSON(exercisesJSON);
  console.log(exercisesJSON);
  
  const [exercises, setExercises] = useState<Exercise[]>(exercisesData);
  const [addedExercises, setAddedExercises] = useState<Exercise[] | PR[]>(route.params.exercises? route.params.exercises : []);  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            navigation.navigate(route.params.prevScreen, { exercises: addedExercises });
          }}
        />
      ),
    });
  });

  // useEffect(() => {
  //   fetch("../../src/exercises.json")
  //     .then(response => response.json())
  //     .then(json => setExercises(parseJSON(json)))
  //     .catch(err => console.log(err));
  // }, []);

  function parseJSON(exerciseData: Object[]): Exercise[] {
    const exercisesHelper: Exercise[] = [];

    exerciseData.forEach((element) => {
      exercisesHelper.push(Exercise.from(element as Exercise));
    });

    return exercisesHelper;
  }

  function addExercise(exercise: Exercise) {
    const isAdded = addedExercises.some(addedExercise => exercise.getName() == addedExercise.name);
    const addedExercisesHelper = [...addedExercises];

    if (route.params.prevScreen === 'SetUpWorkout') {
      if(isAdded) addedExercisesHelper.splice(addedExercises.indexOf(exercise));
      else addedExercisesHelper.push(exercise);
    }
    else if (route.params.prevScreen === 'Profile') {
      const pr : PR = {
        name: exercise.name,
        weight: 0
      }

      if(isAdded) addedExercisesHelper.splice((addedExercises as PR[]).indexOf(pr));
      else addedExercisesHelper.push(pr);
    }
      
    setAddedExercises(addedExercisesHelper);
  }

  function changeRegex(search: string): Exercise[] {
    if (search) {
      const regexSearch = new RegExp(search, "i");
      const exercisesHelper: Exercise[] = [];

      exercisesData.forEach((exercise) => {
        if (
          regexSearch.test(exercise.getName()) ||
          exercise
            .getMuscleGroups()
            ?.some((muscleGroup) => regexSearch.test(muscleGroup))
        )
          exercisesHelper.push(exercise);
      });

      return exercisesHelper;
    } else return exercisesData;
  }

  const RenderItem = memo((props : {item : Exercise}) =>{
    return props.item.renderExerciseAdd((exercise) => addExercise(exercise), addedExercises.some(addedExercise => props.item.getName() == addedExercise.name));
  });

  return (
    <View style={{ width: "90%", alignSelf: "center" }}>
      <TextInput
        style={styles.input}
        onChangeText={(search) => setExercises(changeRegex(search))}
        darkColor="#313131"
        lightColor="#D4D4D3"
        placeholder="Type name of exercise"
      />
      <FlatList
        data={exercises}
        renderItem={({ item }) => 
          <RenderItem
            item={ item }
          />
        }
        ItemSeparatorComponent={() => <View style = {{height: 2, backgroundColor: '#929494', marginTop: 6}}/>}
        ListFooterComponent={() => <View style = {{height: 2, backgroundColor: '#929494', marginTop: 6}}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
    width: "100%",
    height: 40,
    fontSize: 16,
    borderRadius: 10,
    padding: 10,
  },
});
