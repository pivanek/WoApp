import { useState } from "react";
import { StyleSheet } from "react-native";
import { View, TextInput, Text } from "./Themed";



export enum ValueType {
    'Reps',
    'Weight'
}
  
export function StrengthRow(params: {repsValue : number, weightValue : number, rowNumber : number, editable : boolean, handleChange(value : number, rowNumber : number, valueType : ValueType) : any}) {
    const [weightIsEditable, setWeightEdidtable] = useState<boolean>(false);    

    return (
      <View style={styles.row}>
        <View style={styles.column}>
          <TextInput
            editable={params.editable}
            onChangeText={(value) => {
                const valueNumber : number = Number.parseInt(value)

                params.handleChange(valueNumber, params.rowNumber, ValueType.Reps);
                setWeightEdidtable(!isNaN(valueNumber) && valueNumber != 0);
            }}
            style={styles.repsInput}
            keyboardType="numeric"
            darkColor={params.editable ? "#313131" : "#232323"}
            lightColor="#D4D4D3"
            placeholder={params.editable ? "00" : ""}
            value = {params.repsValue != 0? params.repsValue.toString() : ''}
          />
        </View>
        <Text style={styles.setText}>Set {params.rowNumber + 1}</Text>
        <View style={styles.column}>
          <TextInput
            editable={weightIsEditable}
            onChangeText={(value) => params.handleChange(Number.parseInt(value), params.rowNumber, ValueType.Weight)}
            style={styles.weightInput}
            keyboardType="numeric"
            darkColor={weightIsEditable ? "#313131" : "#232323"}
            lightColor="#D4D4D3"
            placeholder={weightIsEditable ? "00" : ""}
            value = {params.weightValue != 0? params.weightValue.toString() : ''}
          />
        </View>
      </View>
    );
}

export function HoldRow(params: {timeValue : Date, rowNumber : number, editable : boolean, handleChange(value : number, rowNumber : number, valueType : ValueType) : any}) {
  const [weightIsEditable, setWeightEdidtable] = useState<boolean>(false);

  return (
    <View style={styles.row}>
      <View style={styles.column}>
        <TextInput
          editable={params.editable}
          onChangeText={(value) => {
              const valueNumber : number = Number.parseInt(value)

              params.handleChange(valueNumber, params.rowNumber, ValueType.Reps);
              setWeightEdidtable(!isNaN(valueNumber) && valueNumber != 0);
          }}
          style={styles.repsInput}
          keyboardType="numeric"
          darkColor={params.editable ? "#313131" : "#232323"}
          lightColor="#D4D4D3"
          placeholder={params.editable ? "00" : ""}
        />
      </View>
      <Text style={styles.setText}>Set {params.rowNumber + 1}</Text>
      <View style={styles.column}>
        <TextInput
          editable={weightIsEditable}
          onChangeText={(value) => params.handleChange(Number.parseInt(value), params.rowNumber, ValueType.Weight)}
          style={styles.weightInput}
          keyboardType="numeric"
          darkColor={weightIsEditable ? "#313131" : "#232323"}
          lightColor="#D4D4D3"
          placeholder={weightIsEditable ? "00" : ""}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    column: {
        flex: 2,
        alignItems: "center"
    },
    repsInput:{
        height: 55,
        width: 55,
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 15,
        paddingHorizontal: 15
    },
    weightInput:{
        height: 55,
        width: 65,
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 15,
        paddingHorizontal: 15
    },
    setText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center'
    },
});