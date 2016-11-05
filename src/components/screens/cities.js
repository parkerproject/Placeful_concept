import React, { Component } from 'react';
import { View, StyleSheet, Modal, Picker } from 'react-native';

import ModalPicker from 'react-native-modal-picker';


class Cities extends Component {
  constructor() {
    super();
    this.state = {
      cities: [
        'Atlanta',
        'Boston',
        'Chicago',
        'Dallas',
        'Houston',
        'Los Angeles',
        'Las Vegas',
        'Miami',
        'New York',
        'Philadelphia',
        'San Diego',
        'San Francisco',
        'Seattle',
        'Washington DC',
        'Phoenix',
      ],
      modalVisible: true,
    };
  }

  setModalVisible(visible) {
    console.log(visible);
    this.setState({ modalVisible: visible });
  }

  render() {
    const pickerView = this.state.cities.map((city, key) =>
      <Picker.Item label={city} value={city} key={key} />);
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => { alert('Modal has been closed.'); }}
      >
        <View style={{ backgroundColor: 'white' }}>
        <Text>testing</Text>
          {/* <Picker onValueChange={(city) => console.log(city)} enabled={false}>
            {pickerView}
          </Picker> */}
        </View>
      </Modal>);
  }
}

export default Cities;
