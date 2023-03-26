import { HeaderBackButton } from "@react-navigation/elements";
import React, { useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import { Log } from "../../src/Log";



export default function ExerciseLog({ navigation, route } : any) {  
    const [log, setLog] = useState(new Log(route.params.workout));

    useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
            <HeaderBackButton onPress={() => {
                Alert.alert(
                  'Confirmation',
                  'Do you want to discard this log ?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        navigation.goBack();
                      },
                    },
                  ],
                );
            }}/>
        ), 
      });
    });

    
    return(
      log.renderLogForm(navigation, (log) => setLog(log))
    );
}