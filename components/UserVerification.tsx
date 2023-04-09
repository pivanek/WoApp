import { sendEmailVerification } from "firebase/auth";
import { View, Text, TouchableOpacity } from "./Themed";
import auth from "../src/auth";

export default function UserVerification(){
    return (
        <View style={{backgroundColor: 'red', flexDirection: "row", padding: 5, paddingHorizontal: 10}}>
            <Text style={{fontSize: 14}}>
                You account is not verified. 
            </Text>
            <TouchableOpacity style={{backgroundColor: 'transparent', marginHorizontal: 5}} onPress={() => auth.currentUser? sendEmailVerification(auth.currentUser) : null}>
                <Text style={{textDecorationLine: 'underline', textDecorationStyle: 'dotted', fontSize: 14}}>Send verification e-mail</Text>
            </TouchableOpacity>    
        </View>
    );
}