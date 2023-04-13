import { Auth, signOut } from "firebase/auth";
import { UserProfileIcon } from "./Icons";
import { View, Text, TouchableOpacity } from "./Themed";
import { Alert, StyleSheet } from "react-native";
import { Button } from "./Button";

export function Profile(props: {auth : Auth}){
    return (
        <View
          style={{
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          darkColor="#111111"
        >
          <UserProfileIcon color="#313131" style={{ flex: 1 }} />
          <View style={{ flex: 1 }} darkColor="#111111">
            <Text
              style={{
                margin: 5,
                textAlign: "center",
                textAlignVertical: "center",
                fontSize: 16,
              }}
            >
              {props.auth.currentUser?.email}
            </Text>
            <Button
              onPress={() =>
                Alert.alert("Singout", "Are you sure you want to sing out", [
                  { text: "Cancel" },
                  {
                    text: "Yes",
                    onPress: () => signOut(props.auth),
                  },
                ])
              }
              darkColor="#252525"
              lightColor="#D4D4D3"
              style={[styles.button]}
            >
              Log Out
            </Button>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color: "#00C5FF",
        fontWeight: "500",
        fontSize: 16,
        height: 32,
        textAlignVertical: "center",
        textAlign: "center",
      },
      button: {
        borderRadius: 10,
        alignSelf: "center",
        margin: 5,
      },
});