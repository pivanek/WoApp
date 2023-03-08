import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Pressable, Text, View } from "./Themed";

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
        <Pressable style = {[styles.container]} lightColor="#F2F2EF" darkColor="#000" onPress = {props.onPress}>
            <View style = {[styles.radioButton, props.style]}>
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
        overflow: 'visible'
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
        width: '100%',
        height: '100%'
    },
    radioButtonChecked:{
        alignSelf: "center",
        borderRadius: 9,
        width: '55%',
        height: '55%',
        backgroundColor:'#00B6FF'
    },
});