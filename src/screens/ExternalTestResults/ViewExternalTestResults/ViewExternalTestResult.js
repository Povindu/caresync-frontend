import React from "react";

import {
    View,
    StyleSheet,
    Text,
    Pressable,
    ScrollView,
    FlatList,
    TextInput,
    SafeAreaView,
    Alert,
} from "react-native";

import TestLinkComp from "./Comp/TestLinkComp";
import Header from "../../../components/Header";
import api from "../../../Services/AuthService";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function ViewExternalTestResults({ navigation }) {
    const { user } = useAuthContext();
    console.log("User: ", user._id);

    const [links, setLinks] = React.useState("");

    React.useEffect(() => {
        const fetchLinks = async () => {
            api.get("/extTests/getLinks", { params: { patientID: user._id } })
                .then((res) => {
                    console.log("res", res.data);
                    setLinks(res.data);
                    return res.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchLinks();
    }, []);

    const renderItem = ({ item }) => (
        <TestLinkComp navigation={navigation} item={item} />
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header name={"VIew Test Results"} />
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.text}>Test result links</Text>
                    {links && (
                        <FlatList
                            data={links}
                            keyExtractor={(item) => item}
                            renderItem={renderItem}
                        ></FlatList>
                    )}
                    <Pressable
                        style={styles.inputBtn}
                        onPress={() =>
                            navigation.navigate("AddExternalTestResults")
                        }
                    >
                        <Text style={styles.buttonText}>Add Test Result</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7FEFF",
    },
    input: {
        height: 40,
        width: "80%",
        borderColor: "#00567D",
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    text: {
        fontSize: 20,
        marginBottom: 30,
        marginTop: 30,
    },
    inputBtn: {
        backgroundColor: "#30A8DE",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
