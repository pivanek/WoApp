import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Pressable, Text, View } from "./Themed";
import { useState } from "react";

export default function RadioButton(props:{
    value? : any,
    label? : string,
    color? : string,
    textColor? : string,
    children? : string,
    checked? : boolean,
    onPress? : any,
    style? : StyleProp<ViewStyle>
},){
    var text = (props.label === undefined)? '' : props.label;
    text += (props.children === undefined)? '' : props.children;
    styles.container

    return(
        <Pressable style = {[props.style, styles.container]} lightColor="#F2F2EF" darkColor="#000" onPress = {props.onPress}>
            <View style = {styles.radioButton}>
                <View style= {(props.checked)? styles.radioButtonChecked : {}}/>
            </View>
            <Text style={styles.text}>{ text  }</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent: "flex-start",
    },
    text:{
        textAlign: "center",
        marginLeft: 10,
        textAlignVertical: "center",
    },
    radioButton:{
        borderColor: '#00B6FF',
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
        width: 17,
        height: 17
    },
    radioButtonChecked:{
        alignSelf: "center",
        borderRadius: 9,
        width: 9,
        height: 9,
        backgroundColor:'#00B6FF'
    },
});