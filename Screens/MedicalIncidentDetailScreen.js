import { Text, StyleSheet, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import MedicalIncidentScreen from './MedicalIncidentScreen';


const MedicalIncidentDetailScreen = () => {
    return (
        <>
            <SafeAreaView>
                <Header text="Add Details" />
                <View style={styles.background}>
                    <View style={styles.container}>
                        <View style={styles.tile1}>
                            <TouchableOpacity style={{ backgroundColor: '#FFEBA5', height: 181, width: 171, marginLeft: 100, marginTop: 30, borderRadius: 10 }}>
                                <Image style={styles.img} source={require('../assets/img.png')} />
                                <Text style={styles.txt}>Add Symptoms</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.tile2}>
                            <TouchableOpacity style={{ backgroundColor: '#A7F4FF', height: 181, width: 171, marginLeft: 100, marginTop: 30, borderRadius: 10 }}>
                                <Image style={styles.img} source={require('../assets/img1.png')} />
                                <Text style={styles.txt}>Add Appointments</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.tile2}>
                            <TouchableOpacity style={{ backgroundColor: '#94FFC5', height: 181, width: 171, marginLeft: 100, marginTop: 30, borderRadius: 10 }}>
                                <Image style={styles.img} source={require('../assets/img2.png')} />
                                <Text style={styles.txt}>Add Prescriptions</Text>
                            </TouchableOpacity>
                        </View>



                    </View>
                </View>

            </SafeAreaView>



        </>
    );
};







export default MedicalIncidentDetailScreen;
const styles = StyleSheet.create({
    container: {
        width: 380,
        height: '80%',

        backgroundColor: '#FFFF',
        margin: 15,

    },

    background: {
        backgroundColor: '#DEFFFB',
        width: '100%',
        height: '100%',
    },
    img: {
        //    marginLeft:16,
        marginTop: 13,
        alignSelf: 'center',

    },
    txt: {
        fontSize: 16,
        alignSelf: 'center',
    },



})