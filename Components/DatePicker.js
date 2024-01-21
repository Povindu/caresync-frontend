// import DatePicker from "react-native-datepicker";
import { View, StyleSheet ,Text,TouchableOpacity,SafeAreaView} from "react-native";
import DatePicker from 'react-native-modern-datepicker';
import React, { useState } from 'react';

function DatePicker(){
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      setShowDatePicker(false);
    };
  
    const toggleDatePicker = () => {
      setShowDatePicker(!showDatePicker);
    };
  

    return(
      <SafeAreaView>
         <View>
        <Text style={styles.text2}>Date</Text>
        <TouchableOpacity onPress={toggleDatePicker} style={styles.calendarIcon}>
        <Text style={styles.calendarText}>🗓</Text>
        </TouchableOpacity>
        {showDatePicker && (
          
          <DatePicker
            mode="date"
            style={styles.datePicker}
            onSelectedChange={handleDateChange}
            selected={selectedDate}
            minimumDate={new Date()
            }
           
          />
         
        )}
        {selectedDate && (
          <Text style={styles.selectedDateText}>
            {/* Selected Date: {selectedDate.toDateString()} */}
          </Text>
        )}
        </View>
        </SafeAreaView>

    )


}export default DatePicker;

const styles = StyleSheet.create({

    selectedDateText:{},
  
    calendarIcon: {
      position: 'absolute',
      top: 270,
      right: 20,
      zIndex: 1, // Ensure the icon is above the DatePicker
    },
    
  
    calendarText: {
      fontSize: 25,
      color: '#00567D',
    },
  
    datePicker: {
      
      
     backgroundColor:'#1e1e1e',
     
      flex: 1,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#8e8e8e',
      
    }
    
  
}
   
  );
  
   
  
  
      
  