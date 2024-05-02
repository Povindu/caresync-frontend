import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ToochableIconDown from "../../ViewPatientSummaryHome Screen/Components/TouchableIconDown";
import React, { useState, useRef } from "react";
// function MedicalRecordGrid({

//   recordName,
//   date,
//   recordDescription,
//   incidentType,
//   testType,

// })

// {
//   const [expanded, setExpanded] = useState(false);
//   const heightAnim = useRef(new Animated.Value(100)).current;
//   const handlePress = () => {
//     const newHeight = expanded ? 110 : 320; // Target height
//     Animated.timing(heightAnim, {
//       toValue: newHeight,
//       duration: 300, // Duration of the animation
//       useNativeDriver: false,
//     }).start();
//     setExpanded(!expanded);
//   };
//   const navigation = useNavigation();
//   const handleAddNew = () => {
//     navigation.navigate('MedicalIncidentHomeScreen',{
//       recordName,
//       recordDescription,
//     });

// }

//   return (

//     <Animated.View
//       style={[
//         styles.tile,
//         expanded && styles.expandedContainer,
//         { height: heightAnim },
//       ]}
//     >
//       <View style={styles.titleGrid}>
//         <Text style={styles.title}>{recordName}</Text>
//       </View>
//       <View style={styles.icon}>
//         <ToochableIconDown
//           onPress={handlePress}
//           iconName={expanded ? "up" : "down"}
//           iconSize={30}
//           iconColor="grey"
//         />
//       </View>
//       <View>
//         <Text style={styles.description}>{recordDescription}</Text>
//       </View>

//       {expanded && (
//         <View>
//           <View style={styles.subtile1}>
//             <View style={styles.subcom1}>
//               <View style={styles.innertile1}>

//               <Text style={styles.innertext1}>{incidentType}</Text>
//               </View>
//               <Text style={styles.innertext1}>Test Type</Text>
//               <Text style={styles.subtext1}>
//               {testType}</Text>
//             </View>
//             <Text style={styles.date1}>{date}</Text>
//             <View style={styles.btn}>
//             <Pressable style={styles.btn}
//             onPress={handleAddNew}>
//             <Text style={styles.btntext}>+ incident</Text>
//           </Pressable>

//         </View>

//           </View>

//         </View>
//       )}
//     </Animated.View>
//   );
// }
// export default MedicalRecordGrid;

function MedicalRecordGrid({
  recordName,
  date,
  recordDescription,
  incidents = [], // Array of incidents containing incidentType, date, testType, and testProvider
}) {
  const [expanded, setExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(100)).current;

  const handlePress = () => {
    const newHeight = expanded ? 110 : 320; // Target height
    Animated.timing(heightAnim, {
      toValue: newHeight,
      duration: 300, // Duration of the animation
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const navigation = useNavigation();

  const handleAddNew = () => {
    navigation.navigate("MedicalIncidentHomeScreen", {
      recordName,
      recordDescription,
    });
  };

  return (
    <Animated.View
      style={[
        styles.tile,
        expanded && styles.expandedContainer,
        { height: heightAnim },
      ]}
    >
      <View style={styles.titleGrid}>
        <Text style={styles.title}>{recordName}</Text>
      </View>
      <View style={styles.icon}>
        <ToochableIconDown
          onPress={handlePress}
          iconName={expanded ? "up" : "down"}
          iconSize={30}
          iconColor="grey"
        />
      </View>
      <View>
        <Text style={styles.description}>{recordDescription}</Text>
      </View>

      {expanded && (
        <View>
          {incidents.map((incident, index) => (
            <View key={index} style={styles.subtile1}>
              <View style={styles.subcom1}>
                <View style={styles.innertile1}>
                  <Text style={styles.innertext1}>{incident.incidentType}</Text>
                </View>
                <Text style={styles.innertext1}>Test Type</Text>
                <Text style={styles.subtext1}>{incident.testType}</Text>
              </View>
              <Text style={styles.date1}>{incident.date}</Text>
            </View>
          ))}
          <View style={styles.btn}>
            <Pressable style={styles.btn} onPress={handleAddNew}>
              <Text style={styles.btntext}>+ Incident</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Animated.View>
  );
}
export default MedicalRecordGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tile: {
    flex: 1,
    width: "90%",
    marginBottom: "2%",
    marginTop: "2%",
    marginLeft: "5%",
    marginRight: "5%",
    height: 110,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowRadius: 8,
  },
  button: {
    flex: 1,
  },
  btn: {
    backgroundColor: "#00567D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    maxWidth: "100%",
    padding: 2,
  },
  btntext: {
    color: "#FFF",
    padding: 8,
    fontSize: 16,
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 7,
    marginLeft: 25,
    color: "white",
  },
  description: {
    paddingLeft: 25,
    fontSize: 15,
    marginTop: 10,
  },

  id: {
    paddingLeft: 200,
    fontSize: 15,
    marginTop: -22,
  },
  icon: {
    paddingLeft: 320,
    marginTop: -30,
  },
  expandedContainer: {
    height: 220, // Increase the height when expanded
  },

  subtile1: {
    width: "90%",
    marginBottom: "2%",
    marginTop: "3%",
    marginLeft: "5%",
    marginRight: "5%",
    height: 60,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#FEFFE0",
    shadowColor: "black",
    shadowOpacity: 0.25,

    textShadowRadius: 8,
  },
  subtile2: {
    width: "90%",
    marginBottom: "2%",
    marginTop: "1%",
    marginLeft: "5%",
    marginRight: "5%",
    height: 60,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#E3FFFC",
    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowRadius: 8,
  },
  innertile1: {
    width: "35%",
    marginBottom: "2%",
    marginTop: "2%",
    marginLeft: "3%",
    marginRight: "3%",
    height: 22,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#FFEBA5",
    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowRadius: 8,
  },
  innertile2: {
    width: "35%",
    marginBottom: "2%",
    marginTop: "2%",
    marginLeft: "3%",
    marginRight: "3%",
    height: 22,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#A7F4FF",
    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowRadius: 8,
  },
  innertext1: {
    paddingLeft: 15,
    fontSize: 13,
    marginTop: 2,
    fontWeight: "bold",
  },
  innertext2: {
    fontSize: 13,
    marginTop: 2,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtext1: {
    paddingLeft: 10,
    marginRight: "3%",
    fontSize: 13,
    marginTop: "2%",
  },
  subcom1: {
    flexDirection: "row",
  },
  subtext2: {
    paddingLeft: 10,
    marginRight: "3%",
    fontSize: 13,
    marginTop: "3%",
  },
  subtile3: {
    width: "90%",
    marginBottom: "2%",
    marginTop: "1%",
    marginLeft: "5%",
    marginRight: "5%",
    height: 60,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#E3FFE9",
    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowRadius: 8,
  },
  innertile3: {
    width: "35%",
    marginBottom: "2%",
    marginTop: "2%",
    marginLeft: "3%",
    marginRight: "3%",
    height: 22,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#94FFC5",
    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowRadius: 8,
  },

  date1: {
    marginLeft: "8%",
    fontSize: 13,
    marginTop: "0.5%",
  },
  presId: {
    marginLeft: "14%",
    fontSize: 13,
  },
  titleGrid: {
    width: "70%",
    backgroundColor: "#5c074b",
    marginTop: "4%",
    marginLeft: "5%",
    paddingBottom: "2%",
    borderRadius: 10,
  },
});
