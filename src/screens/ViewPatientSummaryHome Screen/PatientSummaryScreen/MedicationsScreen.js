import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button,StyleSheet} from 'react-native';
import { Agenda } from 'react-native-calendars';
import Header from '../../../components/Header';
import Header2 from '../../AddMedicalIncidentScreen/components/Header2';
import styles from '../../homeStyles';

const MedicationsScreen = () => {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Example of items data structure
  const initialItems = {
    '2024-03-01': [{ name: 'Item 1 - Any Description' }],
    '2024-03-02': [{ name: 'Item 2 - Any Description' }],
    '2024-03-03': [],
    '2024-03-04': [{ name: 'Item 3 - Any Description' }, { name: 'Item 4 - Any Description' }],
  };

  // Function to load items for a specific day
  const loadItems = (day) => {
    setTimeout(() => {
      setItems(initialItems);
    }, 100);
  };

  // Function to handle date press
  const handleDatePress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  // Function to add event
  const addEvent = () => {
    if (selectedDate) {
      const newItems = {
        ...items,
        [selectedDate]: [...(items[selectedDate] || []), { name: eventText }],
      };
      setItems(newItems);
    }
    setEventText('');
    setModalVisible(false);
  };

  // Function to render an item
  const renderItem = (item, firstItemInDay) => {
    return (
      <View style={{ marginVertical: 5 }}>
        {firstItemInDay && (
          <Text style={{ fontWeight: 'bold', marginVertical:5 }}>
            {item.timestamp} {/* Display date */}
          </Text>
        )}
        <View style={styles1.tile}>
        <Text>{item.name}</Text> 
        </View>
      
      </View>
    );
  };

  // Function to render empty date
  const renderEmptyDate = () => {
    return (
      <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No items for this day</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
        <Header2 text="Medications"  />
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2024-03-01'}
        onDayPress={handleDatePress}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
            <Text>Add Event for {selectedDate}</Text>
            <TextInput
              placeholder="Enter event text"
              value={eventText}
              onChangeText={setEventText}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <Button title="Add Event" onPress={addEvent} />
          </View>
        </View>
      </Modal>
    </View>
    </View>
  );
};

export default MedicationsScreen;
const styles1 = StyleSheet.create({
    tile:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:'auto',
        marginRight:'3%',
        padding:'5%',
        borderRadius:10,
        backgroundColor:'#fff',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5
    },
    }

)