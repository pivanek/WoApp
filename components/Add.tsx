import { StyleSheet, Pressable} from 'react-native';
import { PlusIcon } from "./Icons";
import { Text} from "./Themed";


export function AddNew_Empty(props:{
    text : string
    onPress : any
}) {
    return(
        <Pressable style = { styles.container } onPress={ props.onPress }>
            <PlusIcon/>
            <Text style={styles.text} darkColor='#8F9492'>{ props.text }</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container:{
        width: 60,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize: 15,
        textAlign: 'center',
    }
});
