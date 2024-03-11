import react from "react";

import { View, Text, StyleSheet } from "react-native";

const MedicalIdFalseScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Medical ID Verification Failed</Text>
        <Text style={styles.text}>
            Your Medical ID is still pending verification. Please wait for
            confirmation from the admin.
        </Text>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7FEFF",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        textAlign: "center",
        marginHorizontal: 20,
    },
});

export default MedicalIdFalseScreen;