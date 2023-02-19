import { StyleProp, ViewStyle, StyleSheet, PressableProps, ButtonProps } from "react-native";
import { Text, Pressable } from "./Themed";
import { TextProps } from "react-native";


export function Button(props : PressableProps & TextProps) {
    const { style, children, ...otherProps } = props;

    return (
        <Pressable darkColor="#313131" lightColor="#D4D4D3" style= {[props.style , styles.button]} {...otherProps}>
            <Text style={styles.text}>{children}</Text>
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
        fontWeight: '500',
        fontSize: 16
    }
});