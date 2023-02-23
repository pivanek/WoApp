import { StyleSheet } from "react-native";
import { TextInput, View, Text } from "../../components/Themed";
import { IWorkout } from "../../src/Workout";
import { TabRouter } from "@react-navigation/native";
import { Button } from "../../components/Button";

export default function ExerciseLog({ navigation, route } : any, workout : IWorkout) {
    return(
        <View style={{flex: 1}}>
            <View style={styles.row}>
                <Text style={styles.header}>Reps</Text>
                <View style={{flex: 1}}/>
                <Text style={styles.header}>Weight</Text>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <TextInput style={styles.repsInput} keyboardType="numeric" darkColor='#313131' lightColor="#D4D4D3" placeholder='00'/>
                </View>
                <Text style={styles.setText}>Set 1</Text>
                <View style={styles.column}>
                    <TextInput style={styles.weightInput} keyboardType="numeric" darkColor='#313131' lightColor="#D4D4D3" placeholder='000'/>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <TextInput style={styles.repsInput} keyboardType="numeric" darkColor='#313131' lightColor="#D4D4D3" placeholder='00'/>
                </View>
                <Text style={styles.setText}>Set 2</Text>
                <View style={styles.column}>
                    <TextInput style={styles.weightInput} keyboardType="numeric" darkColor='#313131' lightColor="#D4D4D3" placeholder='000'/>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <TextInput style={styles.repsInput} keyboardType="numeric" darkColor='#313131' lightColor="#D4D4D3" placeholder='00'/>
                </View>
                <Text style={styles.setText}>Set 3</Text>
                <View style={styles.column}>
                    <TextInput style={styles.weightInput} keyboardType="numeric" darkColor='#313131' lightColor="#D4D4D3" placeholder='000'/>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <TextInput style={styles.repsInput} keyboardType="numeric" darkColor='#313131' lightColor="#D4D4D3" placeholder='00'/>
                </View>
                <Text style={styles.setText}>Set 4</Text>
                <View style={styles.column}>
                    <TextInput style={styles.weightInput} keyboardType="numeric" darkColor='#313131' lightColor="#D4D4D3" placeholder='000'/>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <TextInput style={styles.repsInput} keyboardType="numeric" darkColor='#313131' lightColor="#D4D4D3" placeholder='00'/>
                </View>
                <Text style={styles.setText}>Set 5</Text>
                <View style={styles.column}>
                    <TextInput style={styles.weightInput} keyboardType="numeric" darkColor='#313131' lightColor="#D4D4D3" placeholder='000'/>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <TextInput style={styles.repsInput} keyboardType="numeric" darkColor='#313131' lightColor="#D4D4D3" placeholder='00'/>
                </View>
                <Text style={styles.setText}>Set 6</Text>
                <View style={styles.column}>
                    <TextInput style={styles.weightInput} keyboardType="numeric" darkColor='#313131' lightColor="#D4D4D3" placeholder='000'/>
                </View>
            </View>
            <Button>Next</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 28,
        flex: 2,
        textAlign: 'center'
    },
    setText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center'
    },
    column: {
        flex: 2,
        alignItems: "center"
    },
    repsInput:{
        height: 50,
        width: 50,
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 15
    },
    weightInput:{
        height: 50,
        width: 60,
        fontSize: 20,
        textAlign: 'center',
        borderRadius: 15
    },
});