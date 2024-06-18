import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Linking,
  Text,
  Pressable,
  Animated,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ToochableIconDown from "../../ViewPatientSummaryHome Screen/Components/TouchableIconDown";
// Utility function to format date
const formatDate = (dateString, timeNeeded) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  if (timeNeeded) {
    return `${year}/${month}/${day} - ${time}`;
  } else {
    return `${year}/${month}/${day}`;
  }
};

const handleLinkPress = (url) => {
  Linking.openURL(url).catch((err) => console.error("An error occurred", err));
};

const truncateText = (text, maxLength) => {
  if (text && text.length > maxLength) {
    return `${text.substring(0, 30)}...`;
  }
  return text;
};

const incidentConfig = {
  testIncidents: {
    backgroundColor: "#FEFFE0",

    renderContent: (incident) => (
      // console.log("Test:", incident),
      <>
        <View style={styles.subcom}>
          <View style={[styles.innertile, { backgroundColor: "#FFEBA5" }]}>
            <Text style={styles.innertext}>Testing</Text>
          </View>
          <Text style={styles.subtext}>{incident.testType}</Text>
        </View>
        <Text style={styles.date}>{formatDate(incident.testDate)}</Text>
        <Text style={styles.provider}>Test Provider: {incident.provider}</Text>
        {incident.description && (
          <Text style={styles.other}>{incident.description}</Text>
        )}
        {incident.result && (
          <Text style={styles.other}>Result: {incident.result}</Text>
        )}
        {incident.resultLink && (
          <Text style={styles.other}>Result Links: {incident.resultLink}</Text>
        )}
      </>
    ),
  },
  symptomIncidents: {
    backgroundColor: "#FFE0E0",
    renderContent: (incident) => (
      <>
        <View style={styles.subcom}>
          <View style={[styles.innertile, { backgroundColor: "#FF9999" }]}>
            <Text style={styles.innertext}>Symptom</Text>
          </View>
          <Text style={[styles.subtext, { marginTop: "0%" }]}>
            {incident.symptomType}
          </Text>
        </View>
        <Text style={[styles.date, {}]}>Date:{formatDate(incident.date)}</Text>
        <Text style={[styles.other]}>Freq: {incident.symptomFrequency}</Text>
        <Text style={[styles.other]}>Severity: {incident.severity}/10</Text>
        <Text style={[styles.other]}>Duration: {incident.SymptomDuration}</Text>
        <Text style={[styles.other]}>Appetite: {incident.appetite}/10</Text>
        <Text style={[styles.other]}>Weight: {incident.weight}kg</Text>
      </>
    ),
  },
  appointmentIncidents: {
    backgroundColor: "#E0FFE0",
    renderContent: (incident) => (
      console.log("AppoinyIncident:", incident),
      (
        <View style={styles.incidentCard}>
          <View style={styles.subcom}>
            <View style={[styles.innertile, { backgroundColor: "#99FF99" }]}>
              <Text style={styles.innertext}>Appointment</Text>
            </View>
            <Text style={styles.subtext}>
              Dr.{truncateText(incident.doctorName, 30)}
            </Text>
          </View>
          <Text style={styles.date}>
            {formatDate(incident.appointmentDateTime)}
          </Text>
          <Text
            style={[
              styles.other,
              // { marginTop: "0%", marginLeft: "36%", width: "60%" },
            ]}
          >
            Type: {incident.appointmentType}
          </Text>
          <Text
            style={[
              styles.other,
              // { marginTop: "-20%", marginLeft: "36%", width: "60%" },
            ]}
          >
            Description: {truncateText(incident.description, 30)}
          </Text>
        </View>
      )
    ),
  },

  prescriptionIncidents: {
    backgroundColor: "#ebded4",
    renderContent: (incident) => (
      <>
        <View style={styles.subcom}>
          <View style={[styles.innertile, { backgroundColor: "#c4a092" }]}>
            <Text style={styles.innertext}>Prescription</Text>
          </View>
          <Text style={[styles.subtext, { width: "60%" }]}>
            {truncateText(incident.description, 30)}
          </Text>
        </View>
        <Text style={styles.date}>{formatDate(incident.PrescriptionDate)}</Text>
        <Text style={styles.other}>Doctor Name:{incident.doctorName}</Text>
        {incident.link && (
          <TouchableOpacity onPress={() => handleLinkPress(incident.link)}>
            <Text style={styles.provider}>
              Link: {truncateText(incident.link, 30)}{" "}
              {/* Adjust 30 to desired max length */}
            </Text>
          </TouchableOpacity>
        )}
      </>
    ),
  },

  medicationIncidents: {
    backgroundColor: "#E0E0FF",
    renderContent: (incident) => (
      <>
        <View style={styles.subcom}>
          <View style={[styles.innertile, { backgroundColor: "#9999FF" }]}>
            <Text style={styles.innertext}>Medication</Text>
          </View>
          <Text style={styles.subtext}>
            {truncateText(incident.medi_name, 30)}
          </Text>
        </View>
        <Text style={styles.date}>{formatDate(incident.date)}</Text>
        <Text
          style={[styles.provider, { marginTop: "-6%", marginLeft: "36%" }]}
        >
          Dosage: {incident.medi_dosage}
        </Text>
        <Text style={[styles.provider, { marginTop: "0", marginLeft: "35%" }]}>
          {" "}
          {incident.medi_Frequency}
        </Text>
      </>
    ),
  },
};

function MedicalRecordGrid({
  recordName,
  recordID,
  recordDescription,
  incidents,
}) {
  // console.log("Incidents:", incidents);

  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(100); // Initial height
  const [tileHeight, setTileHeight] = useState(100); // Initial height
  const heightAnim = useRef(new Animated.Value(100)).current;
  const [incidentArray, setIncidentArray] = useState([]);

  const calculateContentHeight = () => {
    const baseHeight = 120; // Base height without incidents
    let incidentCount = 0;
    for (let i = 0; i < 5; i++) {
      if (incidentArray[i]) {
        // console.log("Incident:", incidentArray[i][1]);
        if (incidentArray[i][1].length === 0) {
          // return baseHeight;
        } else {
          // console.log("Object", Object.entries(incidentArray[i][1]).length);
          incidentCount += Object.entries(incidentArray[i][1]).length;
        }
      }
    }

    setTileHeight(tileHeight + incidentCount * 120);

    console.log("Tile: ", recordName + tileHeight);
    console.log("Incident Count:", incidentCount);
    const incidentHeight = incidentCount * 120;
    return baseHeight + incidentHeight;
  };

  useEffect(() => {
    setIncidentArray(Object.entries(incidents));
    if (expanded && incidentArray.length > 0) {
      const newHeight = calculateContentHeight();
      setContentHeight(newHeight);
      Animated.timing(heightAnim, {
        toValue: newHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      setContentHeight(100); // Reset to initial height
      Animated.timing(heightAnim, {
        toValue: 95,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [expanded, incidents]);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const navigation = useNavigation();

  const handleAddNew = () => {
    navigation.navigate("MedicalIncidentHomeScreen", {
      recordName,
      recordDescription,
      date,
      recordID,
    });
  };

  return (
    <Animated.View
      style={[
        styles.tile,
        expanded && styles.expandedContainer,
        { height: heightAnim },
        // { height: 500 },
      ]}
    >
      <View style={styles.titleGrid}>
        <Text style={styles.title}>{recordName}</Text>
      </View>
      <View style={styles.icon}>
        <ToochableIconDown
          onPress={handlePress}
          iconName={expanded ? "up" : "down"}
          iconSize={20}
          iconColor="white"
        />
      </View>
      <View>
        <Text style={styles.description}>{recordDescription}</Text>
      </View>

      {incidents && expanded && (
        <View style={styles.incidentContainer}>
          {console.log("fefd----------------------------")}

          {incidentArray.map((incident, index) => {
            // console.log("Incident:", incident);
            if (incident[1].length === 0) {
              return null;
            } else {
              const config = incidentConfig[incident[0]] || {};
              return (
                <View
                  key={index}
                  style={[
                    styles.subtile,
                    { backgroundColor: config.backgroundColor },
                  ]}
                >
                  {Object.entries(incident[1]).map((item, index) => {
                    return (
                      <View key={index}>
                        {config.renderContent ? (
                          config.renderContent(item[1])
                        ) : (
                          <Text>Unknown Incident Type</Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              );
            }
          })}
          <Pressable style={styles.btn} onPress={handleAddNew}>
            <Text style={styles.btntext}>+ New Incident</Text>
          </Pressable>
        </View>
      )}
    </Animated.View>
  );
}

export default MedicalRecordGrid;

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    width: "90%",
    marginBottom: "2%",
    marginTop: "2%",
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 20,
    elevation: 2,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowRadius: 8,
  },
  btn: {
    backgroundColor: "#DEFFFB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "30%",
    alignSelf: "center",
    marginTop: "1%",
  },
  btntext: {
    color: "#00567D",
    fontSize: 14,
    margin: 2,
    fontWeight: "bold",
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
    fontWeight: "600",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 20,
  },
  subtile: {
    width: "90%",
    marginBottom: "2%",
    marginTop: "3%",
    marginLeft: "5%",
    marginRight: "5%",
    height: 500, // TODO: automate this
    borderRadius: 10,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowRadius: 8,
  },
  innertile: {
    width: "33%",
    marginBottom: "2%",
    marginTop: "2%",
    marginLeft: "1%",
    marginRight: "3%",
    height: 22,
    borderRadius: 10,
    elevation: 2,

    shadowColor: "black",
    shadowOpacity: 0.25,
    textShadowRadius: 8,
  },
  innertext: {
    fontSize: 14,
    marginTop: 2,
    fontWeight: "bold",
    alignSelf: "center",
  },
  subtext: {
    paddingLeft: 2,
    marginRight: "3%",
    fontSize: 13,
    marginTop: "2%",
    fontWeight: "800",
    maxWidth: "77%",
  },
  subcom: {
    flexDirection: "row",
  },
  date: {
    marginLeft: "5%",
    fontSize: 14,
    marginTop: "5%",
    fontWeight: "700",
  },
  titleGrid: {
    width: "100%",
    backgroundColor: "#575757",
    marginTop: "4%",
    paddingBottom: "2%",
    borderRadius: 10,
  },
  incidentContainer: {
    marginTop: 10, // Adjust as needed
  },
  provider: {
    marginLeft: "36.5%",
    fontWeight: "600",
    marginTop: "-6%",
    width: "70%",
  },
  other: {
    marginLeft: "36.5%",
    fontWeight: "600",
    width: "70%",
  },
  incidentCard: {
    marginBottom: "2%",
  },
});
