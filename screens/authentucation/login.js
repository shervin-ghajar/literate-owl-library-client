import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")} >
                    <Text> Signup </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
