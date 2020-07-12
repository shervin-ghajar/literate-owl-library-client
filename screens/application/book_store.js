import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class BookStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                    <Text> BookStore </Text>

                </TouchableOpacity>
            </View>
        );
    }
}
