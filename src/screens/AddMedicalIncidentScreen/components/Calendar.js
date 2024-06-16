import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";

function Calendar({ selectedStartDate, setSelectedStartDate, onDateChange }) {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  // const [selectedStartDate, setSelectedStartDate] = useState('');
  const [startedDate, setStartedDate] = useState("");

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(), "YYYY/MM/DD");

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
    onDateChange(propDate); // Call onDateChange callback with selected date
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
        <Text
          style={{
            fontSize: 20,
            color: "#1e1e1e",
            marginLeft: 25,
            marginTop: -25,
          }}
        >
          Date
        </Text>

        <TouchableOpacity
          style={styles.inputBtn}
          onPress={handleOnPressStartDate}
        >
          <Text style={{ fontWeight: "bold" }}>{selectedStartDate}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={openStartDatePicker}
        >
          <View style={styles.modalView}>
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: "white",
                textHeaderColor: "#469ab6",
                textDefaultColor: "black",
                selectedTextColor: "black",
                mainColor: "#469ab6",
                textSecondaryColor: "black",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
            />

            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text
                style={{
                  color: "#00567D",
                  backgroundColor: "#DEFFFB",
                  fontWeight: "bold",
                  paddingVertical: 3,
                  paddingHorizontal: 12,
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputBtn: {
    borderColor: "#8e8e8e",
    borderWidth: 1,
    padding: 8,
    width: "88%",
    height: 38,
    marginTop: 10,
    marginLeft: 25,
    borderRadius: 10,
    fontSize: 16,
    zIndex: 0,
  },
  modalView: {
    marginTop: 200,
    margin: 20,
    marginVertical: "%10",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    position: "absolute",
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default Calendar;
