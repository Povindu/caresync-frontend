import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Screen2 = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, Screen 2!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Screen2;
