import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import Header2 from '../AddMedicalIncidentScreen/components/Header2';
// import MedicalIncidentScreen from './MedicalIncidentScreen';
const { width, height } = Dimensions.get('window');


const MedicalIncidentDetailScreen = () => {
    return (
        <>
                <Header2 text="Add Details" />
                <View style={styles.background}>
                   
                        <View style={styles.coloumn}>
                        {/* <View style={styles.tile1}> */}
                            
                            <TouchableOpacity style={[{ backgroundColor: '#FFEBA5' }, styles.tiles]}>

                                {/* <Image style={styles.img} source={require('../assets/img.png')} /> */}
                                <Text style={styles.txt}>Add Symptoms</Text>
                            </TouchableOpacity>
                        {/* </View> */}

                        {/* <View style={styles.tile2}> */}
                            
                             <TouchableOpacity style={[{ backgroundColor: '#A7F4FF' }, styles.tiles]}>
                            {/* <Image style={styles.img} source={require('../assets/img1.png')} /> */}
                                <Text style={styles.txt}>Add Appointments</Text>
                            </TouchableOpacity>
                        {/* </View> */}

                        {/* <View style={styles.tile2}> */}
                            
                            <TouchableOpacity style={[{ backgroundColor: '#94FFC5' }, styles.tiles]}>
                                {/* <Image style={styles.img} source={require('../assets/img2.png')} /> */}
                                <Text style={styles.txt}>Add Prescriptions</Text>
                            </TouchableOpacity>
                        {/* </View> */}
                        </View>



                    </View>
                



        </>
    );
};







export default MedicalIncidentDetailScreen;
const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
    },
    tiles:{
        
        height: height * 0.20,
        width: width* 0.40,
        marginLeft: width * 0.05,
        marginTop: height * 0.04,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

    // container: {
    //     // flex:1,
    //     // maxWidth: '100%',
        
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#FFFF',
    //   width: '100%',
    //   height: '8%',

    

    // },

    background: {
        backgroundColor: '#e3ffff',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        

       
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
    coloumn:{
        flexDirection:'column',
        flex:1,
        

    },


})