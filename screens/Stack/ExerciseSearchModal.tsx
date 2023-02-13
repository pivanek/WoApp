import { StyleSheet } from "react-native";
import { TextInput, View } from "../../components/Themed";

export default function ExerciseSearchScreen(){
    return(
        <View>
            <TextInput style={styles.input} darkColor='#313131' lightColor="#D4D4D3" placeholder='Type name of exercise'/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      flexDirection: 'column'
    },
    input: {
        marginBottom:20,
        alignSelf: 'center',
        width: '80%',
        height: 50,
        fontSize: 20,
        color: '#000',
        marginTop: 15,
        borderRadius: 5,
        padding: 10,
    }
});