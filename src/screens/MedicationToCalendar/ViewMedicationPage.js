import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../MedicalTestHomeScreen/components/Header";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ViewMedication = () => {
  return (
    <View>
      <Header name="View Medication" />

      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={()=>{}}>
        <AntDesign
          name="left"
          size={24}
          color="gray"
          style={{ marginTop: 10, padding: 20 }}
        />
        </TouchableOpacity>
        <View style={styles.dateCircle}>
          <Text style={styles.dateDay}>15</Text>
          <Text style={styles.dateWeekDay}>tue</Text>
        </View>
        <TouchableOpacity onPress={()=>{}}>
        <AntDesign
          name="right"
          size={24}
          color="gray"
          style={{ marginTop: 10, padding: 20 }}
        />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.docNameContainer}>
            <Text style={styles.docName}>Dr. Chathura</Text>
        </View>
        <View style={{margin:10,marginLeft:30}}>
            <Text style={{fontWeight:"bold"}}>Panadol</Text>
            <Text style={{marginLeft:20}}>Morning</Text>
            <Text style={{marginLeft:20}}>After Meal</Text>
        </View>
        <View style={{margin:10,marginLeft:30}}>
            <Text style={{fontWeight:"bold"}}>Vitamin</Text>
            <Text style={{marginLeft:20}}>Night</Text>
            <Text style={{marginLeft:20}}>After Meal</Text>
        </View>
        <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",padding:10}}>
            <MaterialIcons name="edit-off" size={24} color="gray" style={{marginRight:10}}/>
            <TouchableOpacity onPress={()=>{}}>
                <MaterialCommunityIcons name="delete-outline" size={24} color="red" />
            </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={{padding:10}}>
            <Text>Bood Test</Text>
        </View>
        <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",padding:10}}>
            <TouchableOpacity onPress={()=>{}}>
                <MaterialIcons name="mode-edit" size={24} color="black" style={{marginRight:10}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}}>
                <MaterialCommunityIcons name="delete-outline" size={24} color="red" />
            </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  dateCircle: {
    marginTop: 10,
    height: 60,
    width: 60,
    backgroundColor: "#3498db",
    borderRadius: 200,
    elevation: 4,
    alignItems: "center",
    marginBottom:10
  },
  dateDay: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 5,
    color:"white"
  },
  dateWeekDay: {
    color:"white",
    fontSize: 15,
    margin: -5,
  },
  detailsContainer:{
    width:"90%",
    alignSelf:"center",
    backgroundColor:"#D9F8FF",
    elevation:4,
    borderRadius:10,
    marginBottom:10
  },
  docNameContainer:{
    backgroundColor:"gray",
    borderRadius:10,
  },
  docName:{
    color:"white",
    padding:10
  }
});
export default ViewMedication;
