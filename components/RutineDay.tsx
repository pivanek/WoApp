import { View, Text } from "./Themed";
import SelectDropdown from "react-native-select-dropdown";
import { DaysOfWeek } from "../src/User";

export function RutineDay(props: {day : DaysOfWeek, onChange : (workoutName : string, day : DaysOfWeek) => void, workoutNames : string[], defaultValue : string}) {
    
    return(
      <View style={{ marginLeft: 12, marginVertical: 5, flexDirection: 'row', width: '100%'}}>
        <View style={{height: 40, width: '40%'}}>
          <Text style={{fontSize: 18, textAlignVertical: "center", height: 40}}>{props.day}</Text>
        </View>
        <SelectDropdown
          data={props.workoutNames}
          defaultButtonText={props.defaultValue}
          onSelect={workoutName => {
            props.onChange(workoutName, props.day)
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem
          }}
          dropdownStyle={{borderRadius: 15, marginTop: -50, borderColor: '#929494', borderWidth: 2}}
          buttonStyle={{backgroundColor: '#313130', borderRadius: 15, height: 40}}
          rowStyle={{backgroundColor: '#313130', height: 35}}
          rowTextStyle={{color: 'white'}}
          buttonTextStyle={{color: '#d5d5d5'}}
        />
      </View>
    );
  }