import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const BirthdayCalendar = ({ onselect }) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Function to generate years array (adjust as needed)
  const generateYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i.toString());
    }
    return years;
  };

  // Function to generate days array based on selected month and year (adjust as needed)
  const generateDays = () => {
    if (!selectedYear || !selectedMonth) return [];
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i.toString());
    }
    return days;
  };

  const handleUpdateProfile = () => {
    // Update profile with selected birthday
    const selectedBirthday = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    console.log("Selected birthday:", selectedBirthday);
    // Add your logic for updating the profile with the selected birthday
    onselect(selectedBirthday);
  };

  return (
    <View style={styles.modalContent}>
      <Text style={styles.title}>Select Birthday</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          {generateYears().map((year) => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          <Picker.Item label="January" value="01" />
          <Picker.Item label="February" value="02" />
          <Picker.Item label="March" value="03" />
          <Picker.Item label="April" value="04" />
          <Picker.Item label="May" value="05" />
          <Picker.Item label="June" value="06" />
          <Picker.Item label="July" value="07" />
          <Picker.Item label="August" value="08" />
          <Picker.Item label="September" value="09" />
          <Picker.Item label="October" value="10" />
          <Picker.Item label="November" value="11" />
          <Picker.Item label="December" value="12" />
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={selectedDay}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
        >
          {generateDays().map((day) => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
});

export default BirthdayCalendar;
