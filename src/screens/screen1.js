import React from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';


const Screen1 = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, Screen 1!</Text>
            <Pressable onPress={() => navigation.navigate('Menu')}> 
                <Text style={styles.buttonText}>View Menu</Text> 
            </Pressable> 
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

export default Screen1;
