import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { primaryBackground } from '../assets/colors';

export default class StackHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.hasFilter = (this.props.scene.route.name == "Tabs") ? true : false
    }

    renderTexts() {
        let title = null
        console.warn(this.props.scene.route.params)
        if ("state" in this.props.scene.route) {
            switch (this.props.scene.route.state.routeNames[this.props.scene.route.state.index]) { //Tabs
                case "Book Store":
                    title = "Book Store"
                    this.hasFilter = true
                    break;
                case "Search":
                    title = "Search"
                    this.hasFilter = false
                    break;
                case "Account":
                    title = "Account"
                    this.hasFilter = false
                    break;
            }
        }
        if ('params' in this.props.scene.route && this.props.scene.route.params) {
            if ('queryType' in this.props.scene.route.params)
                switch (this.props.scene.route.params.queryType) { //Stack
                    case "new":
                        title = "New Releases"
                        break;
                    case "free":
                        title = "Free"
                        break;
                    case "popular":
                        title = "You Must Read"
                        break;
                    case "genres":
                        title = this.props.scene.route.params.genreTitle
                        break;
                }
        }
        if (this.props.scene.descriptor.options.title) {
            return (
                <View style={styles.headerTextContainer}>
                    <Text style={[styles.text, { fontSize: 20 }]}>{title || this.props.scene.descriptor.options.title}</Text>
                </View>
            )
        }
        return null
    }

    renderBack() {
        if (this.props.previous && this.props.scene.descriptor.options.headerBack == null) {
            return (
                <TouchableOpacity style={styles.headerBackContainer} hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} onPress={() => this.props.navigation.pop()} >
                    <Image source={require("../assets/icons/back.png")} style={styles.headerBackStyle} />
                </TouchableOpacity>
            )
        }
        return null
    }
    renderFilter() {
        return (
            this.hasFilter ?
                <TouchableOpacity style={styles.headerFilterContainer} hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} onPress={() => this.props.navigation.navigate("Genres")} >
                    <Image source={require("../assets/icons/genres/all-genres.png")} style={styles.headerFilterStyle} />
                </TouchableOpacity>
                : null
        )
    }
    render() {
        // console.warn(this.props.scene.route.name)
        return (
            <View style={[styles.headerContainer, this.props.scene.descriptor.options.headerStyle]}>
                {this.renderTexts()}
                {this.renderBack()}
                {this.renderFilter()}
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
    headerFilterContainer: {
        position: 'absolute',
        height: 28,
        width: 28,
        alignItems: "center",
        justifyContent: 'center',
        right: 15
    },
    headerFilterStyle: {
        height: "100%",
        width: "100%",
    },
    text: {
        fontFamily: "NewYorkLarge-Bold"
    }
})
