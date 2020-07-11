import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { primaryBackground } from '../assets/colors';

export default class StackHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderTexts() {
        if (this.props.scene.descriptor.options.title) {
            return (
                <View style={styles.headerTextContainer}>
                    <Text style={[styles.text, { fontSize: 18 }]}>{this.props.scene.descriptor.options.title}</Text>
                </View>
            )
        }
        return null
    }

    renderBack() {
        if (this.props.previous && this.props.scene.descriptor.options.headerBack == null) {
            return (
                <TouchableOpacity style={styles.headerBackContainer} hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} onPress={() => this.props.navigation.pop()} >
                    <Image source={require("../assets/icons/Back.png")} style={styles.headerBackStyle} />
                </TouchableOpacity>
            )
        }
        return null
    }

    render() {
        return (
            <View style={[styles.headerContainer, this.props.scene.descriptor.options.headerStyle]}>
                {this.renderTexts()}
                {this.renderBack()}
                {/* {this.renderFilter()} */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        height: 58,
        elevation: 3,
        backgroundColor: primaryBackground,
        alignItems: "center",
        justifyContent: 'center',
        flexDirection: "row"
    },
    headerBackContainer: {
        position: 'absolute',
        height: 30,
        width: 45,
        alignItems: "center",
        justifyContent: 'center',
        left: 0
    },
    headerBackStyle: {
        height: 15,
        width: 9,
    },
    text: {
        fontFamily: "NewYorkLarge-Bold"
    }
})
