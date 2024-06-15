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
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}/${month}/${day}`;
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
  TEST: {
    backgroundColor: "#FEFFE0",

    renderContent: (incident) => (
      <>
        <View style={styles.subcom}>
          <View style={[styles.innertile, { backgroundColor: "#FFEBA5" }]}>
            <Text style={styles.innertext}>{incident.incidentType}</Text>
          </View>
          <Text style={styles.subtext}>{incident.testType}</Text>
        </View>
        <Text style={styles.date}>{formatDate(incident.date)}</Text>
        <Text style={styles.provider}>
          Test Provider: {incident.testProvider}
        </Text>
      </>
    ),
  },
  SYMPTOM: {
    backgroundColor: "#FFE0E0",
    renderContent: (incident) => (
      <>
        <View style={styles.subcom}>
          <View style={[styles.innertile, { backgroundColor: "#FF9999" }]}>
            <Text style={styles.innertext}>{incident.incidentType}</Text>
          </View>
          <Text style={[styles.subtext, { marginTop: "0%" }]}>
            {incident.symptomType}
          </Text>
        </View>
        <Text style={[styles.date, {}]}>{formatDate(incident.date)}</Text>
        <Text style={[styles.provider, { marginTop: "-18%" }]}>
          Freq: {incident.symptomFrequency}
        </Text>
        <Text style={[styles.provider, { marginTop: "-1.3%" }]}>
          Severity: {incident.severity}/10
        </Text>
        <Text style={[styles.provider, { marginTop: "-1.5%" }]}>
          Duration: {incident.SymptomDuration}
        </Text>
        <Text style={[styles.provider, { marginTop: "-1.3%" }]}>
          Appetite: {incident.appetite}/10
        </Text>
        <Text style={[styles.provider, { marginTop: "-1%" }]}>
          Weight: {incident.weight}kg
        </Text>
      </>
    ),
  },
  APPOINTMENT: {
    backgroundColor: "#E0FFE0",
    renderContent: (incident) => (
      <>
        <View style={styles.subcom}>
          <View style={[styles.innertile, { backgroundColor: "#99FF99" }]}>
            <Text style={styles.innertext}>{incident.incidentType}</Text>
          </View>
          <Text style={styles.subtext}>
            Dr.{truncateText(incident.health_pro_name, 30)}
          </Text>
        </View>
        <Text style={styles.date}>{formatDate(incident.date)}</Text>
        <Text
          style={[
            styles.subtext,
            { marginTop: "0%", marginLeft: "36%", width: "60%" },
          ]}
        >
          {truncateText(incident.health_pro_contact, 30)}
        </Text>
        <Text
          style={[
            styles.subtext,
            { marginTop: "-20%", marginLeft: "36%", width: "60%" },
          ]}
        >
          {truncateText(incident.appointmentPurpose, 30)}
        </Text>
      </>
    ),
  },

  PRESCRIPTION: {
    backgroundColor: "#ebded4",
    renderContent: (incident) => (
      <>
        <View style={styles.subcom}>
          <View style={[styles.innertile, { backgroundColor: "#c4a092" }]}>
            <Text style={styles.innertext}>{incident.incidentType}</Text>
          </View>
          <Text style={[styles.subtext, { width: "60%" }]}>
            {truncateText(incident.pres_note, 30)}
          </Text>
        </View>
        <Text style={styles.date}>{formatDate(incident.date)}</Text>
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

  MEDICATION: {
    backgroundColor: "#E0E0FF",
    renderContent: (incident) => (
      <>
        <View style={styles.subcom}>
          <View style={[styles.innertile, { backgroundColor: "#9999FF" }]}>
            <Text style={styles.innertext}>{incident.incidentType}</Text>
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
  date,
  recordDescription,
  incidents = [],
}) {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(100); // Initial height
  const heightAnim = useRef(new Animated.Value(100)).current;

  const calculateContentHeight = () => {
    const baseHeight = 120; // Base height without incidents
    const incidentHeight = incidents.length * 120;
    return baseHeight + incidentHeight;
  };

  useEffect(() => {
    if (expanded && incidents.length > 0) {
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
          iconSize={20}
          iconColor="white"
        />
      </View>
      <View>
        <Text style={styles.description}>{recordDescription}</Text>
      </View>
      {incidents.length > 0 && expanded && (
        <View style={styles.incidentContainer}>
          {incidents.map((incident, index) => {
            const config = incidentConfig[incident.incidentType] || {};
            return (
              <View
                key={index}
                style={[
                  styles.subtile,
                  { backgroundColor: config.backgroundColor },
                ]}
              >
                {config.renderContent ? (
                  config.renderContent(incident)
                ) : (
                  <Text>Unknown Incident Type</Text>
                )}
              </View>
            );
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
    height: 97,
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
});
