import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'; 
import Modal from "react-native-modal";

export default class BioModal extends Component {

  state = {
    isVisible: false,
  }

  _toggleModal = () =>
    this.setState({ isVisible: !this.state.isVisible });

  render() {
    return (
      <Modal 
        style={styles.modalContent}
        isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}
        supportedOrientations={['portrait', 'landscape']}
        onSwipe={() => this.setState({ isVisible: false })}
        swipeDirection="down"
        backdropOpacity={0.9}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={{ flex: 1 }}>
          <Text>Welcome</Text>
          <TouchableOpacity onPress={this._toggleModal}>
            <View style={styles.button}>
              <Text>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: "white",
    margin: 40,
    marginTop: 80,
    marginBottom: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});