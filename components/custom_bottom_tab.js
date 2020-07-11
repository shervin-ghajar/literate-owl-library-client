import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class CustomBottomTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderBookStore() {
        return (
            <TouchableOpacity onPress={() => { }}>

            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.tabContainer}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        height: 51,
        backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
})
