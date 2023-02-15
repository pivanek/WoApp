import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Text, Pressable } from "./Themed";

export function Button(props: {
    style? : StyleProp<ViewStyle>
    children? : string
    label?: string
    onPress? : any
}) {
    var text = (props.label === undefined)? '' : props.label;
    text += (props.children === undefined)? '' : props.children;

    return (
    <Pressable darkColor="#313131" lightColor="#D4D4D3" onPress={props.onPress} style= {[props.style , styles.button]}>
        <Text style={styles.text}>{text}</Text>
    </Pressable>
    );
}

const styles = StyleSheet.create({
    button:{
        alignItems: "center",
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 15,
    },
    text:{
        color: '#00C5FF',
        fontSize: 16
    }
});