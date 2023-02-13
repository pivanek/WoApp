import { StyleSheet } from "react-native";
import { View, Text, TextInput } from "./Themed";

export default function TimeSetter(){
    return(
        <View style={styles.timerContainer}>
            <View style={styles.timerRow}>
                <Text style={[styles.header, styles.timerItem]}>Break time</Text>
                <Text style={[styles.header, styles.timerItem]}>Workout time</Text>
            </View>
            <View style={styles.timerRow}>
            <View style={[styles.timer, styles.timerItem]}>
                <TextInput placeholder='00' keyboardType='numeric' lightColor="#D4D4D3" darkColor="#313131" maxLength={2} style={styles.timerInput}/>
                <Text style={styles.timerText}>:</Text>
                <TextInput placeholder='00' keyboardType='numeric' lightColor="#D4D4D3" darkColor="#313131" maxLength={2} style={styles.timerInput}></TextInput>
            </View>
            <View style={[styles.timer, styles.timerItem]}>
                <TextInput placeholder='00' keyboardType='numeric' lightColor="#D4D4D3" darkColor="#313131" maxLength={2} style={styles.timerInput}/>
                <Text style={styles.timerText}>:</Text>
                <TextInput placeholder='00' keyboardType='numeric' lightColor="#D4D4D3" darkColor="#313131" maxLength={2} style={styles.timerInput}></TextInput>
            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        alignSelf:'center',
        fontSize: 20,
      },
    timerHeader:{
        flex: 1,
      },
      timerContainer:{
        marginTop: 50
      },
      timerRow:{
        margin: 10,
        flexDirection: 'row',
        justifyContent:  'center'
      },
      timer:{ 
        flexDirection: 'row',
      },
      timerInput:{
        color: '#949494',
        width: 55,
        height: 55,
        textAlign: 'center',
        borderRadius: 20,
        fontSize: 20
      },
      timerText:{
        color: '#949494',
        fontSize: 25,
        lineHeight: 50
      },
      timerItem: {
        marginHorizontal: 20
      },
});